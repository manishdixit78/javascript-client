import React, { Component } from 'react'
import { TextField } from '../../components'
import { Div } from '../../components/TextField/style';

class TextFieldDemo extends Component {
    render() {
      return(
          <>
          <Div>
          <p><b>This is a Disabled Input</b></p>
          < TextField disabled value="Disabled Input"
          />
          <p><b>A valid Input</b></p>
          < TextField value="Accessible"/>

          <p><b>An Input With Errors</b></p>
          < TextField value="101" error="Cloud not be greater than"/>
          </Div>
          </>
      )
    }
}
 export default TextFieldDemo;