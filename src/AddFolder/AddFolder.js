import React from 'react';
import { withRouter } from 'react-router-dom';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';
import config from '../config';
import './AddFolder.css';

class AddFolder extends React.Component {
  static contextType = NotesContext;

  state = {
    folderName: {
      value: '',
      touched: false
    }
  };

  updateFolderName(name) {
    this.setState({ folderName: {value: name, touched: true }});
  }

  validateFolderName() {
    const name = this.state.folderName.value.trim();
    if (name.length === 0) {
      return 'Enter a folder name';
    }
  }

  submitForm = (event, callback) => {
    event.preventDefault();

    const { folderName } = this.state;

    fetch(`${config.API_ENDPOINT}/api/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: folderName.value })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        callback(data);
        this.props.history.push(`/folder/${data.id}`);
        this.props.cancelAddFolder();
      });
  }
  
  render() {
    return (
      <>
        <div className='Folder add-folder-form'>
          <form id='form' className='add-folder' onSubmit={e => this.submitForm(e, this.context.addFolder)}>
            <input
              className='folder-name'
              type='text'
              placeholder='Folder Name'
              onChange={e => this.updateFolderName(e.target.value)}
              autoFocus
            />
          </form>
          {/* <div className='add-folder-validation'>
            
          </div> */}
        </div>
        {this.state.folderName.touched && (
          <ValidationError message={this.validateFolderName()} />
        )}
        <button
          type='submit'
          form='form'
          className='btn btn-add-folder'
          disabled={this.validateFolderName()}
        >
          Add Folder
        </button>
        <button onClick={this.props.cancelAddFolder} className='btn btn-cancel'>Cancel</button>
      </>
    );
  }
}

export default withRouter(AddFolder);