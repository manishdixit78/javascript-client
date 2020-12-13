import styled, { css } from 'styled-components';

const Select = styled.select`
width: 100%;
padding: 1%;
${(props) => props.error
  && css`
  border: 1px solid red;
  `};
`;
const Err = styled.p`
color: red;
`;
export { Select, Err };
