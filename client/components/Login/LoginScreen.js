import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, ImageBackground, TextInput, TouchableHighlight, Image, AsyncStorage } from 'react-native';

import { SERVER_URL } from '../../config/info';

import Background from '../../assets/Background1.jpg';
import Logo from '../../assets/puglogohead.png';
import { Ionicons } from '@expo/vector-icons';
import LoginStyle from '../Styles/Login';


class LoginScreen extends Component {
  state = {
    userId: '',
    password: '',
    invalid: false,
    pending: false
  }

  _loginAsync = async () => {
    const { userId, password } = this.state;

    try {
      let { data } = await axios.post(`${SERVER_URL}/login`, { userId, password });

      console.log("HERE!");

      if (data.valid) {
        await AsyncStorage.multiSet([
          ["userToken", data.token],
          ["userId", userId]
        ]);
        this.props.navigation.navigate('Home');
      } else {
        this.setState({
          invalid: true,
          pending: false
        })
      }
    } catch (err) {
      console.error(err);
    }
  }

  _sendLogin = () => {
    this.setState({
      pending: true
    }, this._loginAsync)
  }

  render() {

    const {
      container,
      inputContainer,
      inputIcon,
      inputs,
      buttonContainer,
      loginButton,
      loginText
    } = LoginStyle;

    return (
      <ImageBackground source={Background} style={{ width: '100%', height: '100%' }}>
        <View style={container}>
          <Image source={Logo} style={{ flex: 0.45, marginBottom: 30 }} resizeMode="contain" />
          <View style={inputContainer}>
            <Ionicons style={inputIcon} name="ios-person" />
            <TextInput style={inputs}
              placeholder="User ID"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(userId) => this.setState({ userId })} />
          </View>

          <View style={inputContainer}>
            <Ionicons style={inputIcon} name="ios-key" />
            <TextInput style={inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <TouchableHighlight style={[buttonContainer, loginButton]} onPress={this._sendLogin}>
            <Text style={loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[buttonContainer, { height: 20, width: 150 }]} onPress={() => { this.props.navigation.navigate('Forgot') }}>
            <Text>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[buttonContainer, { height: 20, width: 150 }]} onPress={() => { this.props.navigation.navigate('SignUp') }}>
            <Text>Register</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}


export default LoginScreen;