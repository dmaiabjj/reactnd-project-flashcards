import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Styles from '@components/QuestionCard/styles';
import Icon from '@components/Icon';
import { Alert } from 'react-native';

class QuestionCard extends PureComponent {
  onHandleDelete = (deck, card) => {
    const { onDeleteHandler } = this.props;
    Alert.alert(
      `Delete ${card.question}`,
      'Are you sure?',
      [
        {
          text: 'Confirm',
          onPress: () => {
            onDeleteHandler(deck, card);
          },
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  render() {
    const { question, deck, theme } = this.props;
    return (
      <Styles.CardStyledView>
        <Styles.CardTitleStyledView>
          <Styles.CardTitleStyledText>{question.question}</Styles.CardTitleStyledText>
          <Styles.RemoveButtonStyled onPress={() => this.onHandleDelete(deck, question)}>
            <Icon font={{ name: 'trash', size: theme.icon.size.first, color: 'red' }} />
          </Styles.RemoveButtonStyled>
        </Styles.CardTitleStyledView>
        <Styles.CardDescriptionStyledText>{question.answer}</Styles.CardDescriptionStyledText>
      </Styles.CardStyledView>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  deck: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
};

export default QuestionCard;
