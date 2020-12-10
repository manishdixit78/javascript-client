import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';

export default function RadioField(props) {
  const {
    error, onChange, options,
  } = props;
  return (
    <>
      { options && options.length && options.map(({ value, label }) => (
        <Fragment key={label}>
          <Input type="radio" name="sport" value={value} onChange={onChange} error={error} />
          { label }
          <br />
        </Fragment>
      ))}
    </>
  );
}
RadioField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};
RadioField.defaultProps = {
  error: '',
  options: [],
};
