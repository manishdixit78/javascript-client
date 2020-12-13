import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './style';

function SelectField(props) {
  const {
    error, onChange, options, defaultText,
  } = props;
  return (
    <>
      <Select onChange={onChange} error={error}>
        { defaultText && <option>{defaultText}</option>}
        {
          options && options.length
          && options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
    </>
  );
}
export default SelectField;
SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};
SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};
