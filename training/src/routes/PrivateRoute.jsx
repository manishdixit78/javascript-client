/* eslint-disable */ 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if((localStorage.getItem('token'))){
        return(
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
        )}
        return(
          <Route>
            <Redirect to='/login'></Redirect>
          </Route>
        )
      }}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default PrivateRoute;