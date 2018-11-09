import React from 'react';
import Icon from '@components/Icon';
import colors from '@styles/settings/colors';
import Styles from '@components/Header/styles';

const Title = () => {
  return (
    <Styles.TitleView>
      <Icon
        font={{ name: 'book', size: 24, style: { color: colors.zero } }}
        container={{
          flexGrow: 1,
          justifyContent: 'center',
          height: '100%',
          alignItems: 'flex-end',
          marginRight: '5%',
        }}
      />
      <Styles.TitleText>FLASHCARDS</Styles.TitleText>
    </Styles.TitleView>
  );
};

export default Title;
