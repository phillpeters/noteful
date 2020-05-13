import React from 'react';
import NotesContext from '../NotesContext';

import Folder from '../Folder/Folder';

class MainSidebar extends React.Component {
  static contextType = NotesContext;

  render() {
    const folderList = this.context.folders.map(folder => (
      <Folder
        key={folder.id}
        name={folder.name}
        id={folder.id}
      />
    ));
    
    return (
      <>
        {folderList}
        <button className='btn btn-add-folder'>Add Folder</button>
      </>
    );
  }
}

export default MainSidebar;