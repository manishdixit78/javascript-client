import React, { Component } from 'react';
import { Error, Input } from './style';
import PropTypes from 'prop-types';
class TextField extends Component {
    render() {
        const { value, disabled, error } = this.props;
        if (error) {
            return (
                <>
                    <Input type="text" value={value} error />
                    <Error>{error}</Error>
                </>
            )
        }
        return (
            <Input type="text" value={value} disabled={disabled} />
        )
    }
}
export default TextField;

TextField.propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
  };
TextField.defaultProps = {
    value: '',
    disabled: false,
    error: '',
  };