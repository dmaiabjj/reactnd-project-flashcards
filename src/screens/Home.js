import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import HomeContent from '@components/HomeContent';

const HomeStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class Home extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <HomeStyled>
        <StatusBar />
        <Header navigation={navigation} />
        <HomeContent navigation={navigation} />
      </HomeStyled>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
