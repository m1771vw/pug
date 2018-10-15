import React from 'react'

import { createStackNavigator } from 'react-navigation'

import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import ForgotScreen from './ForgotScreen'

export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  },
  Forgot: {
    screen: ForgotScreen,
    navigationOptions: {
      title: "Forgot Password",
      headerTitleStyle: {
        fontweight: "bold"
      }
    }
  }
})