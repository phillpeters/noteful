import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';

class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: {
        value: '',
        touched: false
      },
      note: '',
      folder: {
        value: '',
        touched: false
      },
      folderId: ''
    };
  }

  static contextType = NotesContext;

  updateTitle(title) {
    this.setState({
      title: {
        value: title,
        touched: true
      }
    });
  }

  updateNote(note) {
    this.setState({
      note: note
    });
  }

  updateFolder(folder) {
    this.setState({
      folder: {
        value: folder,
        touched: true
      }
    });
  }

  validateNoteTitle() {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return 'Enter a title';
    }
  }

  validateNoteFolder() {
    const folder = this.state.folder.value;
    if (folder === '' || folder === 'None') {
      return 'Please select a folder';
    }
  }

  submitForm(event, callback) {
    event.preventDefault();

    const { title, note, folderId } = this.state;

    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ 
        name: title.value,
        content: note,
        folderId: folderId,
        modified: moment().format()
      })
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
      this.props.history.push(`/folder/${data.folderId}`);
      this.props.cancelAddNote();
    });
  }

  UNSAFE_componentWillMount() {
    const currentFolder = this.context.folders
      .find(folder => folder.id === this.props.match.params.folderId);

    if (currentFolder) {
      this.setState({
        folder: {
          value: currentFolder.name
        },
        folderId: currentFolder.id
      });
    }
  }

  render() {
    const selectOptions = this.context.folders
      .map((folder, index) => (
        <option key={index} value={folder.name}>{folder.name}</option>
      ));
    
    return (
      <>
        <div className='add-note-form'>
          <form id='form' className='add-note' onSubmit={e => this.submitForm(e, this.context.addNote)}>
            <h2>New Note</h2>
            <div className='add-note__hint'>* required field</div>
            <div className='form-group'>
              <label htmlFor='title'>Title *</label>
              <input
                type='text'
                name='title'
                id='title'
                onChange={e => this.updateTitle(e.target.value)}
              />
              {this.state.title.touched && (
                <ValidationError message={this.validateNoteTitle()} />
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='note'>Note</label>
              <textarea
                name='note'
                id='note'
                onChange={e => this.updateNote(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='folder'>Folder</label>
              <select
                defaultValue={this.state.folder.value}
                name='folder' id='folder'
                onChange={e => this.updateFolder(e.target.value)}
              >
                <option value='None'>Select a folder</option>
                {selectOptions}
              </select>
              {this.state.folder.touched && (
                <ValidationError message={this.validateNoteFolder()} />
              )}
            </div>
          </form>
        </div>
        <button
          type='submit'
          form='form'
          className='btn btn-add-folder'
          disabled={
            this.validateNoteTitle() ||
            this.validateNoteFolder()
          }
        >
          Add Note
        </button>
        <button onClick={this.props.cancelAddNote} className='btn btn-cancel'>Cancel</button>
      </>
    );
  }
}

export default withRouter(AddNote);