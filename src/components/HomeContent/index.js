import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Styles from '@components/HomeContent/styles';
import DeckCard from '@components/DeckCard';
import CarouselCard from '@components/CarouselCard';
import QuizContent from '@components/QuizContent';
import { getAll as getDecks } from '@store/modules/decks';
import { getAll as getQuizzes } from '@store/modules/quizzes';

const imageSrc = require('../../../assets/images/background.png');

class HomeContent extends PureComponent {
  /* state = {
    activeDeck: 1,
  };
  */
  renderItem = ({ item, index }) => {
    return <DeckCard key={index} deck={item} />;
  };

  selectedItem = (index) => {
    this.setState(() => ({ activeDeck: index }));
  };

  render() {
    const { theme, decks = [], quizzes = [] } = this.props;
    return (
      <Styles.HomeContentStyledView>
        <Styles.BackgroundStyledView>
          <Styles.BackgroundStyledImage source={imageSrc} />
        </Styles.BackgroundStyledView>
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.first} weight={theme.font.weight.first}>
            Welcome,
          </Styles.MessageStyledText>
          <Styles.MessageStyledText size={theme.font.size.second} weight={theme.font.weight.second}>
            Udacitizens
          </Styles.MessageStyledText>
          <CarouselCard
            data={decks}
            renderItem={this.renderItem}
            selectedItem={this.selectedItem}
          />
        </Styles.MessageStyledView>
        <Styles.ContentStyledView>
          <Styles.QuizTitleStyledText>Quizzes Point(s)</Styles.QuizTitleStyledText>
          <QuizContent quizzes={quizzes} />
        </Styles.ContentStyledView>
      </Styles.HomeContentStyledView>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: getDecks()(state),
    quizzes: getQuizzes()(state),
  };
}

HomeContent.propTypes = {
  theme: PropTypes.object.isRequired,
  decks: PropTypes.array,
  quizzes: PropTypes.array,
};

export default connect(
  mapStateToProps,
  null,
)(withTheme(HomeContent));
