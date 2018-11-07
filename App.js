import React from 'react';
import styled from 'styled-components/native';
import { Font } from 'expo';
import Route from '@routes/index';
import Roboto from './assets/fonts/Roboto-Regular.ttf';

const AppStyled = styled.View`
  flex: 1;
`;

export default class App extends React.Component {
  state = { isReady: false };

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        Roboto,
      });

      this.setState({ isReady: true });
    })();
  }

  render() {
    const { isReady } = this.state;
    return <AppStyled>{isReady && <Route />}</AppStyled>;
  }
}
