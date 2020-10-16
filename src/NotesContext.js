import React from 'react';
import STORE from './store';

const NotesContext = React.createContext({
  notes: STORE.notes,
  folders: STORE.folders,
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {}
});

export default NotesContext;