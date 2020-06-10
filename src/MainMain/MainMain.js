import React from 'react';
import NotesContext from '../NotesContext';

import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';

class MainMain extends React.Component {
  static contextType = NotesContext;
  
  state = {
    addNote: false
  }

  showAddNoteForm() {
    this.setState({
      addNote: true
    });
  }
  
  cancelAddNote() {
    this.setState({
      addNote: false
    });
  }

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
        {(!this.state.addNote)
          ? <>
              {noteList}
              <button className='btn btn-add-note' onClick={() => this.showAddNoteForm()}>Add Note</button>
            </>
          : <AddNote cancelAddNote={() => this.cancelAddNote()} />}
      </>
    );
  }
}

export default MainMain;