import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Err } from './style';

export default function RadioField(props) {
  const {
    error, onChange, options, onBlur,
  } = props;
  return (
    <>
      { options && options.length && options.map(({ value, label }) => (
        <Fragment key={label}>
          <Input type="radio" name="sport" value={value} onChange={onChange} error={error} onBlur={onBlur} />
          { label }
          <br />
        </Fragment>
      ))}
      <Err>{error}</Err>
    </>
  );
}
RadioField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  onBlur: PropTypes.string.isRequired,
};
RadioField.defaultProps = {
  error: '',
  options: [],
};
