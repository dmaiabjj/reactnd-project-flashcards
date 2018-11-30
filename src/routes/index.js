import { createDrawerNavigator } from 'react-navigation';
import Home from '@screens/Home';
import AddDeck from '@screens/AddDeck';
import themes from '@styles/settings/themes';

const DrawerComponent = createDrawerNavigator(
  {
    Add: { screen: AddDeck },
    Decks: { screen: Home },
  },
  {
    navigationOptions: {
      header: null,
    },
    drawerOptions: {
      activeTintColor: themes.light.background.color.primary,
      style: {
        height: 56,
        backgroundColor: themes.light.background.color.primary,
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
