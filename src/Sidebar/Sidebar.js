import React from 'react';

import './Sidebar.css';
import Folder from '../Folder/Folder';

class Sidebar extends React.Component {
  render() {
    const { folders } = this.props;
    const folderList = folders.map(folder => (
      <Folder
        key={folder.id}
        name={folder.name}
        id={folder.id}
      />
    ));
    
    return (
      <nav className='Sidebar'>
        {folderList}
        {folderList.length > 1
          ? <button className='btn btn-add-folder'>Add Folder</button>
          : <button onClick={this.props.goBack} className='btn btn-back'>Go back</button>}
      </nav>
    );
  }
}

export default Sidebar;