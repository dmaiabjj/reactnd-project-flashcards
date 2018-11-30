import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

import Styles from '@components/AddDeckContent/styles';
import DeckCard from '@components/DeckCard';
import CarouselCard from '@components/CarouselCard';
import Loading from '@components/Loading';
import MainBackground from '@components/MainBackground';

import { Creators as DeckCreators, Selectors as DeckSelectors } from '@store/modules/decks';

const imageSrc = require('../../../assets/images/background.png');

class AddDeckContent extends PureComponent {
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

    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.second} weight={theme.font.weight.second}>
            Decks
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
            <Styles.MainContentStyledView>
              <Styles.TitleStyledText>Deck Infos</Styles.TitleStyledText>
            </Styles.MainContentStyledView>
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
      };
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllDecks: () => dispatch(DeckCreators.fetch()),
  };
}

AddDeckContent.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  decks: PropTypes.array,
  getAllDecks: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(AddDeckContent));
