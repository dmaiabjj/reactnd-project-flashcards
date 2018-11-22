import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

import Styles from '@components/HomeContent/styles';
import DeckCard from '@components/DeckCard';
import CarouselCard from '@components/CarouselCard';
import QuizContent from '@components/QuizContent';
import Loading from '@components/Loading';

import { Creators as DeckCreators, Selectors as DeckSelectors } from '@store/modules/decks';

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
    return <DeckCard key={index} deck={item} />;
  };

  selectedItem = (index) => {
    this.setState(() => ({ activeDeck: index }));
  };

  render() {
    const { theme, app, decks = [] } = this.props;
    const { activeDeck } = this.state;
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
        </Styles.MessageStyledView>
        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && (
          <Styles.MainStyledView>
            <CarouselCard
              data={decks}
              renderItem={this.renderItem}
              selectedItem={this.selectedItem}
            />
            <Styles.ContentStyledView>
              <Styles.QuizTitleStyledText>Quizzes Point(s)</Styles.QuizTitleStyledText>
              <QuizContent quizzes={decks[activeDeck].quizzes} />
            </Styles.ContentStyledView>
          </Styles.MainStyledView>
        )}
      </Styles.HomeContentStyledView>
    );
  }
}

function mapStateToProps(state) {
  const { app } = state;
  return {
    app,
    decks: DeckSelectors.getAll(state),
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
  decks: PropTypes.array,
  quizzes: PropTypes.array,
  getAllDecks: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(HomeContent));
