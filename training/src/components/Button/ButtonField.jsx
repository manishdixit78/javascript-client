import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './style';

export default function ButtonField(props) {
  const {
    color, style, value, disabled, onClick,
  } = props;
  return (
    <>
      <Button
        type={value}
        color={color}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {value}
      </Button>
    </>
  );
}
ButtonField.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
ButtonField.defaultProps = {
  color: '',
  disabled: false,
  style: {},
};
