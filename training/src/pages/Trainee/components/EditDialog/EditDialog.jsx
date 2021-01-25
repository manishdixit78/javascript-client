/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { MyContext } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = () => ({
  button_color: {
    backgroundColor: 'blue',
    color: 'black',
  },
  button_error: {
    backgroundColor: '#bbb9b9',
  },
});

class EditDialog extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3),
    email: yup.string().email().required('Email is required'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      error: {
        name: '',
        email: '',
      },
    };
  }

  handleSet = () => {
    const { data } = this.props;
    this.setState({
      name: data.name,
      email: data.email,
    });
  };

  handleOnChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  // eslint-disable-next-line consistent-return
  getError = (field) => {
    const { error } = this.state;
    this.schema
      .validateAt(field, this.state)
      .then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      })
      .catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    return error[field];
  };

  hasErrors = () => {
    const { error } = this.state;
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== '');
    return !!iserror.length;
  };

  onClickHandler = async (Data, openSnackBar) => {
    console.log('data inside edit :', Data)
    const { onSubmit } = this.props;
    this.setState({
      loading: true,
    });
    const response = await callApi(Data, 'put', '/trainee');
    console.log('Response :', response);
    this.setState({ loading: false });
    if (response !== 'undefined') {
      this.setState({
        message: 'Trainee Updated Successfully',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error while submitting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }
  render() {
    const {
      Editopen, handleEditClose, handleEdit, data, classes,
    } = this.props;
    const { name, email, error, loading } = this.state;
    const { originalId: id } = data;
    console.log('id in edit: ', id);
    return (
      <div>
        <Dialog
          open={Editopen}
          onClose={handleEditClose}
          onMouseEnter={this.handleSet}
          variant="outlined"
          color="primary"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit your trainee details</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  error={!!error.name}
                  id="name"
                  type="text"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={data.name}
                  helperText={this.getError('name')}
                  onChange={this.handleOnChange('name')}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12}>
                <TextField
                  error={!!error.email}
                  id="email"
                  type="email"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={data.email}
                  helperText={this.getError('email')}
                  onChange={this.handleOnChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
          {({ openSnackBar }) => (
            <Button
              onClick={() => {
                this.onClickHandler({ name, email, id }, openSnackBar);
              }}
              className={
                (name === data.name && email === data.email) || this.hasErrors()
                  ? classes.button_error
                  : classes.button_color
              }
              color="primary"
              disabled={
                !!((name === data.name && email === data.email) || this.hasErrors())
              }
            >
               {loading && (
                    <CircularProgress size={15} />
                  )}
                  {loading && <span>Submitting</span>}
                  {!loading && <span>Submit</span>}
            </Button>
                 )}
                 </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
EditDialog.propTypes = {
  Editopen: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);