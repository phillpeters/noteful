import React from 'react';
import NotesContext from '../NotesContext';

import Folder from '../Folder/Folder';

class NoteSidebar extends React.Component {
  static contextType = NotesContext;
  
  render() {
    const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
    const folder = this.context.folders.find(folder => folder.id === note.folderId);
    return (
      <>
        <Folder
          key={folder.id}
          name={folder.name}
          id={folder.id}
        />
        <button onClick={this.props.history.goBack} className='btn btn-back'>Go Back</button>
      </>
    );
  }
}

export default NoteSidebar;