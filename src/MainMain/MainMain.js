import React from 'react';
import NotesContext from '../NotesContext';

import Note from '../Note/Note';

class MainMain extends React.Component {
  static contextType = NotesContext;
  
  render() {
    let notes = [];
    if (!this.props.match.params.folderId) {
      notes = this.context.notes;
    } else {
      notes = this.context.notes.filter(note =>
        note.folderId === this.props.match.params.folderId
      )
    }

    const noteList = notes.map(note => (
      <Note key={note.id} details={note} />
    ));

    return (
      <>
        {noteList}
        <button className='btn btn-add-note'>Add Note</button>
      </>
    );
  }
}

export default MainMain;