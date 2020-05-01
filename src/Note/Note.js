import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './Note.css'

class Note extends React.Component {
  render() {
    const { details } = this.props;
     
    // format note modified date
    let date = moment(details.modified).format('lll');
    
    return (
      <div className='Note'>
        <Link to={`/note/${details.id}`} className='note-link'><h2>{details.name}</h2></Link>
        <p>Date Modified: {date}</p>
        <button className='btn btn-delete-note'>Delete Note</button>
      </div>
    );
  }
}

export default Note;