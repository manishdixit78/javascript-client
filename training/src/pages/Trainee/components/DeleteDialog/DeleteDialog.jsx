/* eslint-disable no-console */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { MyContext } from '../../../../contexts/index';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

handleChange = (prop) => (event) => {
  this.setState({ [prop]: event.target.value }, () => console.log(this.state));
};

handleClose = () => {
  this.setState({ open: false });
};

handleSnackBarMessage = (data, openSnackBar) => {
  const date = '2019-02-14T18:15:11.778Z';
  const isAfter = (moment(data.createdAt).isAfter(date));
  if (isAfter) {
    this.setState({
      message: 'Deleted Trainee Successfully ',
    }, () => {
      const { message } = this.state;
      openSnackBar(message, 'success');
    });
  } else {
    this.setState({
      message: 'Error While Deleting Trainee',
    }, () => {
      const { message } = this.state;
      openSnackBar(message, 'error');
    });
  }
}

render() {
  const {
    open, onClose, onSubmit, data,
  } = this.props;

  return (
    <Dialog
      open={open}
      onClose={() => this.handleClose()}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
      <DialogContentText style={{ marginLeft: 25 }}>
        Do you really want to remove the trainee?
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <MyContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onSubmit({ data });
                  this.handleSnackBarMessage(data, openSnackBar);
                }}
              >
                Delete
              </Button>
            )}
          </MyContext.Consumer>
        </DialogActions>
      </DialogContentText>
    </Dialog>
  );
}
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default DeleteDialog;
