import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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

Folder.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Folder;