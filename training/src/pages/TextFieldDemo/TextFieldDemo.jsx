import React, { Component } from 'react'
import { TextField } from '../../components'
import { Div } from '../../components/TextField/style';
import { Slider } from '../../components/';
import { banners, DEFAULT_BANNER_IMAGE } from '../../config/constants';

class TextFieldDemo extends Component {
  render() {
    return (
      <>
        <Div>
          <div>
            <Slider altText="No Image" duration="1000" height="300" random={true} banner={banners} defaultbanner={DEFAULT_BANNER_IMAGE} />
          </div>
          <p><b>This is a Disabled Input</b></p>
          < TextField disabled value="Disabled Input"
          />
          <p><b>A valid Input</b></p>
          < TextField value="Accessible" />

          <p><b>An Input With Errors</b></p>
          < TextField value="101" error="Cloud not be greater than" />
        </Div>
      </>
    )
  }
}
export default TextFieldDemo;