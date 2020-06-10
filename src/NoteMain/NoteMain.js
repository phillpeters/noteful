import React from 'react';
import NotesContext from '../NotesContext';

import Note from '../Note/Note';

class NoteMain extends React.Component {
  static contextType = NotesContext;
  
  render() {
    const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
    if (!note) {
      return null;
    }
    
    return (
      <>
        <Note key={note.id} details={note} />
        <p>{note.content}</p>
      </>
    );
  }
}

export default NoteMain;