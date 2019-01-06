import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

import Styles from '@components/HomeContent/styles';
import DeckCard from '@components/DeckCard';
import CarouselCard from '@components/CarouselCard';
import QuizContent from '@components/QuizContent';
import Loading from '@components/Loading';
import MainBackground from '@components/MainBackground';

import { Creators as DeckCreators, Selectors as DeckSelectors } from '@store/modules/decks';
import { Selectors as QuizSelectors } from '@store/modules/quizzes';

const imageSrc = require('../../../assets/images/background.png');

class HomeContent extends PureComponent {
  state = {
    activeDeck: 0,
  };

  componentDidMount() {
    const { getAllDecks } = this.props;
    getAllDecks();
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return <DeckCard key={index} deck={item} navigation={navigation} />;
  };

  selectedItem = (index) => {
    this.setState(() => ({ activeDeck: index }));
  };

  render() {
    const { theme, app, decks = [] } = this.props;
    const { activeDeck } = this.state;

    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.first} weight={theme.font.weight.first}>
            Welcome,
          </Styles.MessageStyledText>
          <Styles.MessageStyledText size={theme.font.size.second} weight={theme.font.weight.second}>
            Udacitizens
          </Styles.MessageStyledText>
        </Styles.MessageStyledView>
        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && (
          <Styles.MainStyledView>
            <CarouselCard
              data={decks}
              renderItem={this.renderItem}
              selectedItem={this.selectedItem}
            />
            {decks[activeDeck] && (
              <Styles.MainContentStyledView>
                <Styles.QuizTitleStyledText>Quizzes Point(s)</Styles.QuizTitleStyledText>
                <QuizContent quizzes={decks[activeDeck].quizzes} />
              </Styles.MainContentStyledView>
            )}
          </Styles.MainStyledView>
        )}
      </Styles.ContentStyledView>
    );
  }
}

function mapStateToProps(state) {
  const { app } = state;
  return {
    app,
    decks: DeckSelectors.getAll(state).map((d) => {
      return {
        ...d,
        quizzes: QuizSelectors.getByIds(d.quizzes)(state),
      };
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllDecks: () => dispatch(DeckCreators.fetch()),
  };
}

HomeContent.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  decks: PropTypes.array,
  quizzes: PropTypes.array,
  getAllDecks: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(HomeContent));
