import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { Font } from 'expo';
import Route from '@routes/index';
import colors from '@styles/settings/colors';
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

      this.setState({ isReady: true });
    })();
  }

  render() {
    const { isReady, theme } = this.state;
    return (
      <ThemeProvider theme={colors[theme]}>
        <AppSection>{isReady && <Route />}</AppSection>
      </ThemeProvider>
    );
  }
}
