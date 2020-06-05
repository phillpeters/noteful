import React from 'react';
import { withRouter } from 'react-router-dom';
import './AddFolder.css';

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: ''
    };
  }

  updateFolderName(name) {
    this.setState({ folderName: name });
  }
  
  submitForm(event) {
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
        this.props.cancelAddFolder();
        this.props.history.push(`/folder/${data.id}`);
        // this.setState({
        //   folders: data
        // });
      });

  }
  
  render() {
    return (
      <>
        <div className='Folder add-folder-form active'>
          <form id='form' className='add-folder' onSubmit={e => this.submitForm(e)}>
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