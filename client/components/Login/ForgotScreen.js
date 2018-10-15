import React, { Component } from 'react';
import { Text, View, ImageBackground, TextInput, TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Background from '../../assets/Background3.jpg';

import ForgotStyle from '../Styles/Forgot';

class ForgotCredentials extends Component {
  state = {
    email: '',
    username: '',
    showAlert: false
  }

  showAlert = () => {
    Alert.alert(
      'Check Email',
      'for Verification',
      [
        { text: 'OK', onPress: () => this.setState({ showAlert: false }) },
      ]
    )
  }

  render() {

    const {
      container,
      inputs,
      inputContainer,
      inputIcon,
      buttonContainer,
      loginButton,
      loginText
    } = ForgotStyle;
    
    return (
      <ImageBackground source={Background} style={{ width: '100%', height: '100%' }}>
        {this.state.showAlert && this.showAlert()}
        <View style={container}>
          <View style={inputContainer}>

            <Ionicons style={inputIcon} name="ios-person"></Ionicons>
            <TextInput style={inputs}
              placeholder="Username"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username })} />
          </View>
          <Text style={{ marginBottom: 20, justifyContent: 'center', fontWeight: 'bold', color: 'white' }}> OR </Text>
          <View style={inputContainer}>

            <Ionicons style={inputIcon} name="md-mail"></Ionicons>
            <TextInput style={inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>

          {this.state.badEntry && <Text style={{ color: 'red', marginBottom: 10 }}>Username or Password Does Not Exist</Text>}

          <TouchableHighlight style={[buttonContainer, loginButton]} onPress={() => this.setState({ showAlert: true })}>
            <Text style={loginText}>Get Verification</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}


export default ForgotCredentials;