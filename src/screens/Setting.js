import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import SettingContent from '@components/SettingContent';
import Footer from '@components/Footer';

const SettingStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class Setting extends PureComponent {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { navigation } = this.props;
    return (
      <SettingStyled>
        <StatusBar />
        <Header navigation={navigation} />
        <SettingContent />
        <Footer />
      </SettingStyled>
    );
  }
}

Setting.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Setting;
