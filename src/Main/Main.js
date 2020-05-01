import React from 'react';

import './Main.css';
import Note from '../Note/Note';

class Main extends React.Component {
  render() {
    const { notes } = this.props;
    const noteList = notes.map(note => (
      <Note key={note.id} details={note} />
    ));

    return (
      <main className='Main'>
        {noteList}
        {(this.props.match && this.props.match.path === '/note/:noteId')
          ? <p>{notes[0].content}</p>
          : <button className='btn btn-add-note'>Add Note</button>}
        
      </main>
    );
  }
}

export default Main;