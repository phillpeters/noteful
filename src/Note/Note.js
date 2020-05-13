import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NotesContext from '../NotesContext';

import './Note.css'

function deleteNote(noteId, callback) {
  fetch(`http://localhost:9000/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json()
    })
    .then(data => {
      callback(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}

class Note extends React.Component {
  static contextType = NotesContext;

  render() {
    const { details } = this.props;
     
    // format note modified date
    let date = moment(details.modified).format('lll');
    
    return (
      <div className='Note'>
        <Link to={`/note/${details.id}`} className='note-link'><h2>{details.name}</h2></Link>
        <p>Date Modified: {date}</p>
        <button
          className='btn btn-delete-note'
          onClick={() => {
            deleteNote(details.id, this.context.deleteNote)
          }}
        >Delete Note</button>
      </div>
    );
  }
}

export default Note;