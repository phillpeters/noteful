import React from 'react';
import { Link, Route } from 'react-router-dom';
import NotesContext from './NotesContext';

import './App.css';
import MainSidebar from './MainSidebar/MainSidebar';
import MainMain from './MainMain/MainMain';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import NoteMain from './NoteMain/NoteMain';
import STORE from './store';

class App extends React.Component {
  state = {
    notes: STORE.notes,
    folders: STORE.folders
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    );
    this.setState({
      notes: newNotes
    });
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          folders: data
        })
      });

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          notes: data
        })
      });
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    };
    
    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <header>
            <Link className='header-link' to={'/'}><h1>Noteful</h1></Link>
          </header>
          <nav className='Sidebar'>
            <Route exact path='/' component={MainSidebar} />
            <Route path='/folder/:folderId' component={MainSidebar} />
            <Route path='/note/:noteId' component={NoteSidebar} />
          </nav>
          <main className='Main'>
            <Route exact path='/' component={MainMain} />
            <Route path='/folder/:folderId' component={MainMain} />
            <Route path='/note/:noteId' component={NoteMain} />
          </main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;
