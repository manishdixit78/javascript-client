import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, CssBaseline, Button, withStyles,
} from '@material-ui/core';

const style = () => ({
  title: {
    flexGrow: 1,
  },
  logout: {
    flexGrow: 0.05,
  },
});

function NavBar(props) {
  const { classes } = props;
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button color="inherit">TRAINEE</Button>
          <Button color="inherit">TEXTFIELD DEMO</Button>
          <Button color="inherit">INPUT DEMO</Button>
          <Button color="inherit">CHILDREN DEMO</Button>
          <Button color="inherit" className={classes.logout}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(style)(NavBar);
