import Head from 'next/head';
import styled from 'styled-components';
import Layout, { Root, getHeader, getContent, getInsetContainer, getInsetFooter } from '@mui-treasury/layout';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../sections/Footer.js';
import MenuBar from '../sections/MenuBar.js';

const Header = getHeader(styled);
const InsetContainer = getInsetContainer(styled);
const InsetFooter = getInsetFooter(styled);

const scheme = Layout();

scheme.configureHeader((builder) => {
  builder
    .create('appHeader')
    .registerConfig('xs', {
      position: 'sticky',
      initialHeight: 56,
    })
    .registerConfig('md', {
      position: 'relative', // won't stick to top when scroll down
      initialHeight: 64,
    });
});
const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  margin: 4rem 10rem;
`;

// Main Layout that contains the Header & Footer sections being used by all the pages
export default function MainLayout(props) {
  return (
    <Root scheme={scheme}>
      {() => (
        <>
          <CssBaseline />
          <Main>
            <Header>
              <Toolbar>
                <MenuBar />
              </Toolbar>
            </Header>

            <Content>{props.children}</Content>
            <Footer />
          </Main>
        </>
      )}
    </Root>
  );
}
