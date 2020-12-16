import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Text from '../../components/Math/Math';
import Theme from '../../theme';

export default class CalculatorDemo extends React.Component {
  Result() {
    let { result } = this.state;
    result = '';
    this.setState({ result });
  }

  render() {
    return (
      <>
        <ThemeProvider theme={Theme}>
          <Text first={7} second={4} operator="+" />
          <Text first={7} second={3} operator="-" />
          <Text first={7} second={20} operator="*" />
          <Text first={7} second={0} operator="/" />
          <Text first={7} second={4} operator="+">
            {
              (first, second, result) => (
                <p>
                  Sum of
                  {' '}
                  {first}
                  {' '}
                  and
                  {' '}
                  {second}
                  {' '}
                  is equal to
                  {' '}
                  {result}
                  {' '}
                </p>
              )
            }
          </Text>
          <Text first={3} second={4} operator="+">
            {
              (first, second, result) => (
                <p>
                  When We add
                  {' '}
                  {first}
                  {' '}
                  with
                  {' '}
                  {second}
                  {' '}
                  than we will get
                  {' '}
                  {result}
                  {' '}
                  as result
                </p>
              )
            }
          </Text>
        </ThemeProvider>
      </>
    );
  }
}
