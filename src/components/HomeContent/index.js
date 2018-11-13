import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import Styles from '@components/HomeContent/styles';
import DeckCard from '@components/DeckCard';

const imageSrc = require('../../../assets/images/background.png');

class HomeContent extends PureComponent {
  FIRST_SLIDE_INDEX = 1;

  state = {
    activeSlide: this.FIRST_SLIDE_INDEX,
  };

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
    const { activeSlide } = this.state;
    const { width } = Dimensions.get('window');
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
          <Carousel
            ref={(c) => {
              this.carousel = c;
            }}
            data={this.data}
            renderItem={this.renderItem}
            sliderWidth={width}
            sliderHeight={200}
            itemWidth={150}
            itemHeight={120}
            showSpinner
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.6}
            firstItem={this.FIRST_SLIDE_INDEX}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            activeAnimationType="spring"
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
            }}
            callbackOffsetMargin={1}
          />
          <Pagination
            activeDotIndex={activeSlide}
            dotsLength={this.data.length}
            dotColor={theme.font.color.first}
            inactiveDotColor={theme.font.color.fifth}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.5}
            carouselRef={this.carousel}
            tappableDots={!!this.carousel}
          />
        </Styles.MessageStyledView>
      </Styles.HomeContentStyledView>
    );
  }
}

HomeContent.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(HomeContent);
