import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

import Styles from '@components/AddDeckContent/styles';
import Loading from '@components/Loading';
import MainBackground from '@components/MainBackground';

const imageSrc = require('../../../assets/images/background.png');

class DeckDetailContent extends PureComponent {
  render() {
    const { theme, app } = this.props;
    return (
      <Styles.ContentStyledView>
        <MainBackground imageSrc={imageSrc} />
        <Styles.MessageStyledView>
          <Styles.MessageStyledText size={theme.font.size.second} weight={theme.font.weight.second}>
            Deck
          </Styles.MessageStyledText>
        </Styles.MessageStyledView>
        {!app.fetched && <Loading color={theme.font.color.first} />}
        {app.fetched && (
          <Styles.MainStyledView>
            <Styles.MainContentStyledView />
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
  };
}

function mapDispatchToProps() {
  return {};
}

DeckDetailContent.propTypes = {
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(DeckDetailContent));
