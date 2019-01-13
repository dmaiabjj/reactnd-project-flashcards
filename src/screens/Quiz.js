import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

import QuizExecution from '@components/QuizExecution';

const QuizStyled = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background.color.first};
`;

class Quiz extends PureComponent {
  static navigationOptions = ({ screenProps: { theme } }) => {
    return {
      title: 'Deck Details',
      headerStyle: {
        backgroundColor: theme.background.color.first,
      },
      headerTintColor: theme.font.color.first,
    };
  };

  render() {
    const {
      navigation,
      navigation: {
        state: {
          params: { deck },
        },
      },
    } = this.props;
    return (
      <QuizStyled>
        <QuizExecution deck={deck} navigation={navigation} />
      </QuizStyled>
    );
  }
}

Quiz.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withTheme(Quiz);
