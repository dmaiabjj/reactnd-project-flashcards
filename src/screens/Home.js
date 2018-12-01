import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import HomeContent from '@components/HomeContent';
import Footer from '@components/Footer';

const HomeStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class Home extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {
    const { navigation } = this.props;
    return (
      <HomeStyled>
        <StatusBar />
        <Header navigation={navigation} />
        <HomeContent navigation={navigation} />
        <Footer />
      </HomeStyled>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
