import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      id: ''
    }
  }

  componentDidMount = () => {
    this.setState(() => {
      return {
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      }
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState(() => {
        return {
          text: this.props.selectedNote.body,
          title: this.props.selectedNote.title,
          id: this.props.selectedNote.id
        }
      });
    }
  }

  updateBody = async (val) => {
    await this.setState(() => ({ text: val }));
    this.update();
  }

  update = debounce(() => {
    // console.log('UPDATING DATABASE...');
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
    // Come back later
  }, 1500);

  updateTitle = async (txt) => {
    await this.setState(() => {
      return {
        title: txt
      }
    });
    this.update();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="Note Title..."
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}
        />
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditorComponent);