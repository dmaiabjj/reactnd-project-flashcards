import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Home from '@screens/Home';
import AddDeck from '@screens/AddDeck';
import AddCard from '@screens/AddCard';
import DeckDetail from '@screens/DeckDetail';
import Setting from '@screens/Setting';
import DrawerContent from '@components/DrawerContent';

const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: Home, navigationOptions: { drawerLabel: 'Quizzes Statistics ' } },
    Add: { screen: AddDeck, navigationOptions: { drawerLabel: 'Add Decks' } },
    Settings: { screen: Setting, navigationOptions: { drawerLabel: 'Settings' } },
  },
  {
    contentComponent: DrawerContent,
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {
      screen: DrawerNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    DeckDetail: {
      screen: DeckDetail,
    },
    Card: {
      screen: AddCard,
      navigationOptions: {
        title: 'Add Card',
      },
    },
  },
  { headerMode: 'screen' },
);

export default AppNavigator;
