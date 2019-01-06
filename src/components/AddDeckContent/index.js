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
  INITIAL_STATE = {
    title: '',
    submited: false,
    error: true,
  };

  state = this.INITIAL_STATE;

  componentDidMount() {
    const { getAllDecks } = this.props;
    getAllDecks();
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return <DeckCard key={index} deck={item} navigation={navigation} />;
  };

  selectedItem = () => {};

  handleInputChange = (title) => {
    const error = title.length < 3;
    this.setState({ title, error, submited: true });
  };

  onPress = () => {
    const { addDeck } = this.props;
    const { title } = this.state;
    addDeck(title);
    this.setState(this.INITIAL_STATE);
  };

  render() {
    const { theme, app, decks = [] } = this.props;
    const { title, error, submited } = this.state;
    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.second} weight={theme.font.weight.second}>
            Decks
          </Styles.MessageStyledText>
        </Styles.MessageStyledView>
        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && decks && (
          <Styles.MainStyledView>
            <CarouselCard
              data={decks}
              renderItem={this.renderItem}
              selectedItem={this.selectedItem}
              itemWidth={300}
              itemHeight={150}
            />
            <Styles.MainContentStyledView>
              <Styles.TitleTextStyledView>
                <Styles.TitleStyledText>What is the title of your new deck?</Styles.TitleStyledText>
              </Styles.TitleTextStyledView>
              <Styles.DeckSubjectStyledView>
                <Styles.DeckSubjectStyledText
                  placeholderTextColor={theme.input.color.first}
                  placeholder="Type here the subject!"
                  name="title"
                  onChangeText={this.handleInputChange}
                  value={title}
                  size={100}
                />
                {error && submited && (
                  <Styles.DeckSubjectErrorStyledText>
                    Invalid Title: 3 digits at least
                  </Styles.DeckSubjectErrorStyledText>
                )}
              </Styles.DeckSubjectStyledView>
              <Styles.AddButtonStyledView>
                <Styles.AddButtonStyled onPress={() => !error && this.onPress()}>
                  <Styles.AddButtonStyledText>Add</Styles.AddButtonStyledText>
                </Styles.AddButtonStyled>
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
    addDeck: (title) => dispatch(DeckCreators.add(title, Date.now())),
  };
}

AddDeckContent.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  decks: PropTypes.array,
  getAllDecks: PropTypes.func.isRequired,
  addDeck: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(AddDeckContent));
