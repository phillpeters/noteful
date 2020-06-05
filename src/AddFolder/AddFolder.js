import React from 'react';
import { withRouter } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './AddFolder.css';

class AddFolder extends React.Component {
  static contextType = NotesContext;

  state = {
    folderName: ''
  };

  submitForm = (event, callback) => {
    event.preventDefault();

    const { folderName } = this.state;

    fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: folderName })
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

  updateFolderName(name) {
    this.setState({ folderName: name });
  }
  
  render() {
    return (
      <>
        <div className='Folder add-folder-form'>
          <form id='form' className='add-folder' onSubmit={e => this.submitForm(e, this.context.addFolder)}>
            <input
              type='text'
              placeholder='Folder Name'
              onChange={e => this.updateFolderName(e.target.value)}
              autoFocus
            />
          </form>
        </div>
        <button type='submit' form='form' className='btn btn-add-folder'>Add Folder</button>
        <button onClick={this.props.cancelAddFolder} className='btn btn-cancel'>Cancel</button>
      </>
    );
  }
}

export default withRouter(AddFolder);