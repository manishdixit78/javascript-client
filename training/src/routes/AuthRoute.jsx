/* eslint-disable */ 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if(!(localStorage.getItem('token'))){
        return(
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
        )}
      return(
        <Route>
          <Redirect to='/trainee'></Redirect>
        </Route>
      )
      }}
  />
);
AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default AuthRoute;
