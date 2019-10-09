import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNote: false,
      title: ''
    }
  }

  newNoteBtnClick = () => {
    this.setState((prevState) => {
      return {
        addingNote: !prevState.addingNote,
        title: ''
      }
    });
  }

  updateTitle = (txt) => {
    this.setState(() => {
      return {
        title: txt
      }
    });
  }

  newNote = (e) => {
    e.preventDefault();
    this.props.newNote(this.state.title);
    this.setState(() => {
      return {
        title: '',
        addingNote: false
      }
    });
  }

  handleTitleChange = (e) => {
    const newTitle = e.target.value;
    this.setState(() => {
      return {
        title: newTitle
      }
    });
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  }

  deleteNote = (note) => {
    this.props.deleteNote(note)
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}
          >
            {this.state.addingNote ? 'Cancel' : 'New Note'}
          </Button>
          {
            this.state.addingNote ?
              <div>
                <form onSubmit={this.newNote}>
                  <input
                    type="text"
                    name="title"
                    className={classes.newNoteInput}
                    placeholder="Enter Note Title..."
                    /*onKeyUp={(e) => this.updateTitle(e.target.value)}*/
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                  />
                  <Button
                    type="submit"
                    className={classes.newNoteSubmitBtn}
                  >
                    Submit Note
                  </Button>
                </form>
              </div>
              : null
          }
          <List>
            {
              notes.map((_note, _index) => {
                return (
                  <div key={_index}>
                    <SidebarItemComponent
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}
                    >
                    </SidebarItemComponent>
                    <Divider />
                  </div>
                )
              })
            }
          </List>
        </div>
      );
    } else {
      return (
        <div>
          Add a note!
        </div>
      )
    }
  }
}

export default withStyles(styles)(SidebarComponent);