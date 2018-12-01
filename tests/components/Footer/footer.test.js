import React from 'react';
import Styles from '@components/Footer/styles';
import theme from '@styles/settings/themes';
import { ThemeProvider } from 'styled-components/native';
import ReactTestRenderer from 'react-test-renderer';

describe('COMPONENTS - FOOTER', () => {
  const tree = ReactTestRenderer.create(
    <ThemeProvider theme={theme.dark}>
      <Styles.FooterStyledView />
    </ThemeProvider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
