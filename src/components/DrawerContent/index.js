import React from 'react';
import { DrawerItems } from 'react-navigation';
import { Constants } from 'expo';

import Styles from '@components/DrawerContent/styles';

const DrawerContent = (props) => {
  return (
    <Styles.ContentStyledView topSize={Constants.statusBarHeight}>
      <DrawerItems
        {...props}
        getLabel={(scene) => (
          <Styles.DrawerItemStyledView>
            <Styles.DrawerItemStyledText>{props.getLabel(scene)}</Styles.DrawerItemStyledText>
          </Styles.DrawerItemStyledView>
        )}
      />
    </Styles.ContentStyledView>
  );
};

export default DrawerContent;
