import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Styles from '@components/HomeContent/styles';

const imageSrc = require('../../../assets/images/background.png');

class HomeContent extends PureComponent {
  FIRST_SLIDE_INDEX = 1;

  state = {
    activeSlide: this.FIRST_SLIDE_INDEX,
  };

  data = [
    { name: 'Pokemon', cards: 10 },
    { name: 'Digimon', cards: 5 },
    { name: 'Cavaleiros do Zodiaco', cards: 2 },
    { name: 'Bleach', cards: 23 },
    { name: 'Death Note', cards: 23 },
  ];

  // eslint-disable-next-line class-methods-use-this
  renderItem({ item, index }) {
    return (
      <Styles.CardStyledView key={index}>
        <Styles.CardTitleStyledText>{item.name}</Styles.CardTitleStyledText>
        <Styles.CardDescriptionStyledText>{item.cards} cards</Styles.CardDescriptionStyledText>
      </Styles.CardStyledView>
    );
  }

  render() {
    const { theme } = this.props;
    const { activeSlide } = this.state;
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
            sliderWidth={430}
            itemWidth={150}
            showSpinner
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.9}
            loop
            firstItem={this.FIRST_SLIDE_INDEX}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            activeAnimationType="spring"
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
            }}
          />
          <Pagination
            activeDotIndex={activeSlide}
            dotsLength={this.data.length}
            dotColor={theme.font.color.first}
            inactiveDotColor={theme.font.color.second}
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
