import { createDrawerNavigator } from 'react-navigation';
import Home from '@screens/Home';
import colors from '@styles/settings/colors';

const DrawerComponent = createDrawerNavigator(
  {
    Decks: { screen: Home },
  },
  {
    navigationOptions: {
      header: null,
    },
    drawerOptions: {
      activeTintColor: colors.primary,
      style: {
        height: 56,
        backgroundColor: colors.primary,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  },
);

export default DrawerComponent;
