import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import Styles from '@components/Header/styles';

class Title extends PureComponent {
  render() {
    const { theme } = this.props;
    return (
      <Styles.TitleStyledView>
        <Icon
          font={{ name: 'book', size: theme.icon.size.first, color: theme.font.color.first }}
          container={{ marginRight: '5%' }}
        />
        <Styles.TitleStyledText>FLASHCARDS</Styles.TitleStyledText>
      </Styles.TitleStyledView>
    );
  }
}

Title.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(Title);
