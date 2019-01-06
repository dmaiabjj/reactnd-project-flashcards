import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import AddDeckContent from '@components/AddDeckContent';

const AddDeckStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class AddDeck extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        enableOnAndroid
        enableAutomaticScroll={false}
        contentContainerStyle={{ flex: 1 }}
        innerRef={(ref) => {
          this.scroll = ref;
        }}
        onKeyboardWillShow={() => {
          this.scroll.props.scrollToPosition(0, 300);
        }}
      >
        <AddDeckStyled>
          <StatusBar />
          <Header navigation={navigation} />
          <AddDeckContent navigation={navigation} />
        </AddDeckStyled>
      </KeyboardAwareScrollView>
    );
  }
}

AddDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeck;
