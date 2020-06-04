import React from 'react';

class AddFolder extends React.Component {
  render() {
    return (
      <form className='add-folder'>
        <input type='text' placeholder='Folder Name' />
        <button type='submit' className='btn btn-add-folder'>Add Folder</button>
        <button onClick={this.props.cancelAddFolder} className='btn btn-cancel'>Cancel</button>
      </form>
    );
  }
}

export default AddFolder;