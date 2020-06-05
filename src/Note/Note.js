import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import NotesContext from '../NotesContext';

import './Note.css'



class Note extends React.Component {
  static contextType = NotesContext;

  deleteNote = (noteId, callback) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
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
            this.deleteNote(details.id, this.context.deleteNote)
          }}
        >
          Delete Note
        </button>
      </div>
    );
  }
}

export default withRouter(Note);