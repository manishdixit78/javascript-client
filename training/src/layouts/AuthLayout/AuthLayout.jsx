import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components/index';
const AuthLayout = ({ children, ...rest }) => (
  <div>
    <div>{children}</div>
    &nbsp;
    &nbsp;
   <Footer />
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthLayout;