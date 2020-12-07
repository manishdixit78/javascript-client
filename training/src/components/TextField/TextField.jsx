import React, { Component } from 'react';
import { Error, Input } from './style'
class TextField extends Component {
    render() {
        const { value, disabled, error }= this.props;
        if(error){
           return(
               <>
            <Input type="text" value={ value } error/>
            <Error>{error}</Error>
            </>
           )     
        }
        return(
            <Input type="text" value={ value } disabled={ disabled } />
        ) 
    }
}
export  default TextField;