import React from 'react';
import styled from 'styled-components/native';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import store from '@store';
// import * as ServerAPI from '@api/ServerAPI';
import AppContent from '@components/AppContent';
import Roboto from './assets/fonts/Roboto-Regular.ttf';

const AppSection = styled.View`
  flex: 1;
`;

class App extends React.Component {
  state = { isReady: false };

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        Roboto,
      });
      /* await ServerAPI.saveCard('React', {
        id: 1,
        question: 'React',
        answer: 'React',
      });

      await ServerAPI.saveCard('React', {
        id: 2,
        question: 'React',
        answer: 'React',
      });

      await ServerAPI.saveCard('Redux', {
        id: 3,
        question: 'Redux',
        answer: 'Redux',
      });
*/
      this.setState({ isReady: true });
    })();
  }

  render() {
    const { isReady } = this.state;
    return (
      <Provider store={store}>
        <AppSection>{isReady && <AppContent />}</AppSection>
      </Provider>
    );
  }
}

export default App;
