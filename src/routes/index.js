import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Home from '@screens/Home';
import AddDeck from '@screens/AddDeck';
import AddCard from '@screens/AddCard';
import DeckDetail from '@screens/DeckDetail';
import Setting from '@screens/Setting';

const DrawerNavigator = createDrawerNavigator({
  Home: { screen: Home, navigationOptions: { drawerLabel: 'Quizzes Statistics ' } },
  Add: { screen: AddDeck, navigationOptions: { drawerLabel: 'Add Decks' } },
  Settings: { screen: Setting, navigationOptions: { drawerLabel: 'Settings' } },
});

const AppNavigator = createStackNavigator({
  Drawer: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck Detail',
    },
  },
  Card: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
    },
  },
});

export default AppNavigator;
