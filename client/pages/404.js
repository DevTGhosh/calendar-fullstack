import styled, { keyframes } from 'styled-components';

const StyledMain = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
  color: #888;
`;
const shadow = keyframes`
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
`;

const StyledHeading = styled.h1`
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: ${shadow} 0.5s alternate infinite;
`;

export default function Custom404() {
  return (
    <StyledMain>
      <StyledHeading>Error 404</StyledHeading>
    </StyledMain>
  );
}
