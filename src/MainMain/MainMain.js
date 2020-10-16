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
    if (!this.props.match.params.folderid) {
      notes = this.context.notes;
    } else {
      notes = this.context.notes.filter(note =>
        note.folderid === Number(this.props.match.params.folderid)
      )
    }

    const noteList = notes.map(note => (
      <Note key={note.id} details={note} />
    ));

    const currentFolder = this.context.folders
      .filter(folder => folder.id === Number(this.props.match.params.folderid))
      .map(folder => folder.name)[0];

    return (
      <>
        {(!this.state.addNote)
          ? <>
              {noteList}
              <button className='btn btn-add-note' onClick={() => this.showAddNoteForm()}>Add Note</button>
            </>
          : <AddNote
              cancelAddNote={() => this.cancelAddNote()}
              currentFolder={currentFolder || ''}
            />}
      </>
    );
  }
}

export default MainMain;