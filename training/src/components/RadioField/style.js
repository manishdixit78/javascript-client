import styled, { css } from 'styled-components';

const Input = styled.input`
display: inline;
${(props) => props.error
  && css`
  border: 1px solid red;
  `};`;
export { Input };
