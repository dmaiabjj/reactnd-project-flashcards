import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { Font } from 'expo';
import Route from '@routes/index';
import themes from '@styles/settings/themes';
import { Provider } from 'react-redux';
import store from '@store';
// import * as ServerAPI from '@api/ServerAPI';
import Roboto from './assets/fonts/Roboto-Regular.ttf';

const AppSection = styled.View`
  flex: 1;
`;

export default class App extends React.Component {
  state = { isReady: false, theme: 'light' };

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        Roboto,
      });
      /* await ServerAPI.saveDeck('React');
      await ServerAPI.saveDeck('Redux');
      await ServerAPI.saveDeck('Styled Components');
      await ServerAPI.saveDeck('GraphQL');
*/
      this.setState({ isReady: true });
    })();
  }

  render() {
    const { isReady, theme } = this.state;
    return (
      <Provider store={store}>
        <ThemeProvider theme={themes[theme]}>
          <AppSection>{isReady && <Route />}</AppSection>
        </ThemeProvider>
      </Provider>
    );
  }
}
