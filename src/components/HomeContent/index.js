import React from 'react';
import Styles from '@components/HomeContent/styles';
import sizes from '@styles/settings/sizes';

const imageSrc = require('../../../assets/images/background.png');

const HomeContent = () => {
  return (
    <Styles.HomeContentStyledView>
      <Styles.BackgroundStyledView>
        <Styles.BackgroundStyledImage source={imageSrc} />
      </Styles.BackgroundStyledView>
      <Styles.MessageStyledView>
        <Styles.MessageStyledText size={sizes.font.min} weight={300}>
          Welcome,
        </Styles.MessageStyledText>
        <Styles.MessageStyledText size={sizes.font.medium} weight={600}>
          Udacitizens
        </Styles.MessageStyledText>
      </Styles.MessageStyledView>
    </Styles.HomeContentStyledView>
  );
};

HomeContent.propTypes = {};

export default HomeContent;
