import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    value, disabled, error, onChange,
  } = props;
  if (error) {
    return (
      <>
        <Input type="text" value={value} error onChange={onChange} />
        <Error>{error}</Error>
      </>
    );
  }
  return (
    <Input type="text" value={value} disabled={disabled} onChange={onChange} />
  );
};
export default TextField;

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
TextField.defaultProps = {
  disabled: false,
  error: '',
  onChange: '',
};
