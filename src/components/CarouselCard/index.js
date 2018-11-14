import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

import Icon from '@components/Icon';
import Styles from '@components/CarouselCard/styles';

class CarouselCard extends PureComponent {
  FIRST_SLIDE_INDEX = 1;

  state = {
    activeSlide: this.FIRST_SLIDE_INDEX,
  };

  renderEmptyCard = (theme) => {
    return (
      <Styles.CardStyledView>
        <Styles.CardTitleStyledText>Sorry! No items found</Styles.CardTitleStyledText>
        <Icon
          font={{ name: 'frown-o', size: theme.icon.size.first, color: theme.font.color.first }}
        />
      </Styles.CardStyledView>
    );
  };

  render() {
    const { theme, data, renderItem } = this.props;
    const { activeSlide } = this.state;
    const { width } = Dimensions.get('window');
    return (
      <Styles.CaroseulStyledView width={width}>
        {data.length <= 0 && this.renderEmptyCard(theme)}
        <Carousel
          ref={(c) => {
            this.carousel = c;
          }}
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          sliderHeight={200}
          itemWidth={160}
          itemHeight={120}
          showSpinner
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.6}
          firstItem={this.FIRST_SLIDE_INDEX}
          onSnapToItem={(index) => {
            this.setState({ activeSlide: index });
          }}
          activeAnimationType="spring"
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
        />
        <Pagination
          activeDotIndex={activeSlide}
          dotsLength={data.length}
          dotColor={theme.font.color.first}
          inactiveDotColor={theme.font.color.fifth}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.5}
          carouselRef={this.carousel}
          tappableDots={!!this.carousel}
        />
      </Styles.CaroseulStyledView>
    );
  }
}

CarouselCard.propTypes = {
  theme: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default withTheme(CarouselCard);
