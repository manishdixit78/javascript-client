/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import schema from './DialogSchema';
import Handler from './Handler';

const passwordStyle = () => ({
  passfield: {
    display: 'flex',
    flexdirection: 'row',
  },
  pass: {
    flex: 1,
  },
});

const constant = {
  name: Person,
  email: Email,
  password: VisibilityOff,
  'Confirm Password': VisibilityOff,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      hasError: false,
      message: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

    hasErrors = () => {
      try {
        schema.validateSync(this.state);
      } catch (err) {
        return true;
      }
      return false;
    }

    // eslint-disable-next-line consistent-return
    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          schema.validateSyncAt(field, this.state);
          return '';
        } catch (err) {
          return err.message;
        }
      }
    };

    isTouched = (field) => {
      const { touched } = this.state;
      this.setState({
        touched: {
          ...touched,
          [field]: true,
        },
      });
    }

    passwordType = (key) => {
      if (key === 'password' || key === 'Confirm Password') {
        return 'password';
      }
      return '';
    }

    formReset = () => {
      this.setState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        touched: {},
      });
    }

    render() {
      const {
        open, onClose, classes, onSubmit,
      } = this.props;
      const {
        name, email, password, loading,
      } = this.state;
      const ans = [];
      Object.keys(constant).forEach((key) => {
        ans.push(<Handler
          label={key}
          onChange={this.handleChange(key)}
          onBlur={() => this.isTouched(key)}
          helperText={this.getError(key)}
          error={!!this.getError(key)}
          icons={constant[key]}
          type={this.passwordType(key)}
        />);
      });

      return (
        <>
          <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your trainee details
              </DialogContentText>
              <div>
                {ans[0]}
              </div>
              &nbsp;
              <div>
                {ans[1]}
              </div>
              &nbsp;
              <div className={classes.passfield}>
                <div className={classes.pass}>
                  {ans[2]}
                </div>
                &nbsp;
                &nbsp;
                <div className={classes.pass}>
                  {ans[3]}
                </div>
              </div>
          &nbsp;
              <div align="right">
                <Button onClick={onClose} color="primary">CANCEL</Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.hasErrors()}
                  onClick={() => {
                    onSubmit({
                      name, email, password,
                    });
                    this.formReset();
                  }}
                >
                  {loading && (
                    <CircularProgress size={15} />
                  )}
                  {loading && <span>Submitting</span>}
                  {!loading && <span>Submit</span>}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    }
}
export default withStyles(passwordStyle)(AddDialog);
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
