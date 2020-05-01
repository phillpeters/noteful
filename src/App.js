import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import STORE from './store';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: STORE
    };
  }

  render() {
    const { store } = this.state;
    return (
      <div className='App'>
        <header>
          <Link className='header-link' to={'/'}><h1>Noteful</h1></Link>
        </header>
        <Route
          exact
          path='/'
          render={() => 
            <>
              <Sidebar
                folders={store.folders}
              />
              <Main
                notes={store.notes} 
              />
            </>
          }
        />
        <Route
          path='/folder/:folderId'
          render={(routeProps) =>
            <>
              <Sidebar
                folders={store.folders}
              />
              <Main
                notes={store.notes.filter(note => 
                  note.folderId === routeProps.match.params.folderId
                )}
              />
            </>
          }
        />
        <Route
          path='/note/:noteId'
          render={(routeProps) => {
            const note = store.notes.find(note => note.id === routeProps.match.params.noteId);
            const folder = store.folders.filter(folder => folder.id === note.folderId);
            return (
              <>
                <Sidebar
                  folders={folder}
                  goBack={() => routeProps.history.goBack()}
                />
                <Main
                  {...routeProps}
                  notes={store.notes.filter(note =>
                    note.id === routeProps.match.params.noteId
                  )}
                />
              </>
            )
          }}
        />
      </div>
    );
  }
}

export default App;
