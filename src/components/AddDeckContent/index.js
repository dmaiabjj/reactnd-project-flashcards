import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

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
              <Styles.TitleTextStyledView>
                <Styles.TitleStyledText>Deck Infos</Styles.TitleStyledText>
              </Styles.TitleTextStyledView>
              <Styles.DeckSubjectStyledView>
                <Styles.DeckSubjectStyledText placeholder="Type here the subject!" />
              </Styles.DeckSubjectStyledView>
              <Styles.AddButtonStyledView>
                <LinearGradient
                  colors={['#1283f6', '#8811d3', 'transparent']}
                  style={{
                    borderRadius: 5,
                  }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Styles.AddButtonStyled>
                    <Styles.AddButtonStyledText>Add</Styles.AddButtonStyledText>
                  </Styles.AddButtonStyled>
                </LinearGradient>
              </Styles.AddButtonStyledView>
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
