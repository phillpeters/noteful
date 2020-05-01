import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css'

class Folder extends React.Component {
  render() {
    return (
      <NavLink to={`/folder/${this.props.id}`} className='Folder'>
        {this.props.name}
      </NavLink>
    );
  }
}

export default Folder;