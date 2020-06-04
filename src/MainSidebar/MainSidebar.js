import React from 'react';
import NotesContext from '../NotesContext';

import Folder from '../Folder/Folder';
import AddFolder from '../AddFolder/AddFolder';

class MainSidebar extends React.Component {
  static contextType = NotesContext;

  state = {
    addFolder: false
  };

  showAddFolderForm() {
    this.setState({
      addFolder: true
    });
  }

  cancelAddFolder() {
    // this.setState({
    //   addFolder: false
    // });
    console.log('setting addFolder to false');
  }

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
        {(!this.state.addFolder)
          ? <button onClick={() => this.showAddFolderForm()} className='btn btn-add-folder'>Add Folder</button>
          : <AddFolder cancelAddFolder={this.cancelAddFolder} />}
      </>
    );
  }
}

export default MainSidebar;