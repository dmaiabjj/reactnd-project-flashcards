import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Styles from '@components/HomeContent/styles';
import DeckCard from '@components/DeckCard';
import CarouselCard from '@components/CarouselCard';

const imageSrc = require('../../../assets/images/background.png');

class HomeContent extends PureComponent {
  data = this.getData();

  getData() {
    const { theme } = this.props;
    const data = [
      {
        name: 'Pokemon',
        cards: 10,
        score: 100,
        color: [theme.font.color.fourth, '#ff0000'],
        background: theme.shadow.color.first,
      },
      {
        name: 'Digimon',
        cards: 5,
        score: 70,
        color: [theme.font.color.fourth, '#ff0000'],
        background: theme.shadow.color.first,
      },
      {
        name: 'Cavaleiros do Zodiaco',
        cards: 2,
        score: 50,
        color: [theme.font.color.fourth, '#ff0000'],
        background: theme.shadow.color.first,
      },
      {
        name: 'Bleach',
        cards: 23,
        score: 30,
        color: [theme.font.color.fourth, '#ff0000'],
        background: theme.shadow.color.first,
      },
      {
        name: 'Death Note',
        cards: 23,
        score: 67,
        color: [theme.font.color.fourth, '#ff0000'],
        background: theme.shadow.color.first,
      },
    ];

    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem({ item, index }) {
    return <DeckCard key={index} deck={item} />;
  }

  render() {
    const { theme } = this.props;
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
          <CarouselCard data={this.data} renderItem={this.renderItem} />
        </Styles.MessageStyledView>
      </Styles.HomeContentStyledView>
    );
  }
}

HomeContent.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(HomeContent);
