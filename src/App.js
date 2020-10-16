import React from 'react';
import { Link, Route } from 'react-router-dom';
import NotesContext from './NotesContext';
import ErrorBoundary from './ErrorBoundary';

import './App.css';
import MainSidebar from './MainSidebar/MainSidebar';
import MainMain from './MainMain/MainMain';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import NoteMain from './NoteMain/NoteMain';
import STORE from './store';
import config from './config';

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

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/folders`, {
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

    fetch(`${config.API_ENDPOINT}/api/notes`, {
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
        });
      });
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };
    
    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <header>
            <Link className='header-link' to={'/'}><h1>Noteful</h1></Link>
          </header>
          <nav className='Sidebar'>
            <ErrorBoundary>
              <Route exact path='/' component={MainSidebar} />
              <Route path='/folder/:folderid' component={MainSidebar} />
              <Route path='/note/:noteId' component={NoteSidebar} />
            </ErrorBoundary>
          </nav>
          <main className='Main'>
            <ErrorBoundary>
              <Route exact path='/' component={MainMain} />
              <Route path='/folder/:folderid' component={MainMain} />
              <Route path='/note/:noteId' component={NoteMain} />
            </ErrorBoundary>
          </main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;
