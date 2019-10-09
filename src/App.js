import React from 'react';
import Editor from "./editor/editor";
import Sidebar from "./sidebar/sidebar";
import './App.css';
const firebase = require('firebase');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes') // tables
      .onSnapshot(serverUpdate => { // snapshot gets called every time firebase collection is updated
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState(() => ({ notes }));
      });
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState(() => {
      return {
        notes: [note, ...this.state.notes]
      }
    });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState(() => {
      return {
        selectedNote: this.state.notes[newNoteIndex],
        selectedNoteIndex: newNoteIndex
      }
    })
  }
  selectNote = (note, index) => {
    this.setState(() => {
      return {
        selectedNoteIndex: index,
        selectedNote: note
      }
    });
  }
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState(() => {
      return {
        notes: this.state.notes.filter(_note => _note !== note)
      }
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState(() => {
        return {
          selectedNote: null,
          selectedNoteIndex: null
        }
      });
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState(() => {
          return {
            selectedNote: null,
            selectedNoteIndex: null
          }
        });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
  noteUpdate = (id, noteObj) => {
    // console.log(`${id}, ${noteObj}`);
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ?
            <Editor
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}
            /> : null
        }
      </div>
    );
  }
}

export default App;
