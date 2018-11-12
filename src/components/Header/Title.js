import React from 'react';
import Icon from '@components/Icon';
import sizes from '@styles/settings/sizes';
import Styles from '@components/Header/styles';
import colors from '@styles/settings/colors';

const Title = () => {
  return (
    <Styles.TitleStyledView>
      <Icon
        font={{ name: 'book', size: sizes.icon.min, color: colors.light.fonts.zero }}
        container={{ marginRight: '5%' }}
      />
      <Styles.TitleStyledText>FLASHCARDS</Styles.TitleStyledText>
    </Styles.TitleStyledView>
  );
};

export default Title;
