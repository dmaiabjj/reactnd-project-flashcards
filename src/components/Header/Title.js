import React from 'react';
import Icon from '@components/Icon';
import colors from '@styles/settings/colors';
import Styles from '@components/Header/styles';

const Title = () => {
  return (
    <Styles.TitleView>
      <Icon
        font={{ name: 'book', size: 24, style: { color: colors.zero } }}
        container={{ marginRight: '5%' }}
      />
      <Styles.TitleText>FLASHCARDS</Styles.TitleText>
    </Styles.TitleView>
  );
};

export default Title;
