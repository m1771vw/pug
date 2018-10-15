import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import GroupStack from '../Group/GroupStack';
import ProfileStack from '../Profile/ProfileStack';
import SettingsStack from '../Settings/SettingsStack';

import LoginStack from '../Login/LoginStack';
import AuthLoadingScreen from './AuthLoadingScreen';

const AppNavigator = createBottomTabNavigator(
  {
    Home: GroupStack,
    Profile: ProfileStack,
    Settings: SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-cog${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


export default createSwitchNavigator(
  {
    Auth: AuthLoadingScreen,
    App: AppNavigator,
    LoginStack
  },
  {
    initialRouteName: "Auth"
  }
);