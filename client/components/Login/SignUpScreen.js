import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createNewUser } from '../Redux/Actions';

import { Text, View, ImageBackground, TextInput, TouchableHighlight } from 'react-native';

import Background from '../../assets/Background3.jpg';
import { Ionicons } from '@expo/vector-icons';

import SignUpStyle from '../Styles/SignUp';

class SignUp extends Component {
  state = {
    email: '',
    username: '',
    name: '',
    password: '',
    confirm: '',
    badEntry: false,
    showAlert: false,
    showBadAlert: false
  }

  SignUpCheck = () => {
    if (this.state.password == this.state.confirm) {
      this.props.createNewUser({ "id": this.state.username, "name": this.state.name, "username": this.state.username, "email": this.state.email, "password": this.state.password, "token": this.state.username + this.state.name })
      this.props.navigation.navigate('Login')
    } else {
      this.setState({
        badEntry: true
      })
    }
  }

  showAlert = () => {
    Alert.alert(
      'Sign Up',
      'Successful!',
      [
        { text: 'OK', onPress: () => this.setState({ showAlert: false }) },
      ]
    )
  }

  showBadAlert = () => {
    Alert.alert(
      'Account could not',
      'be created, Try again',
      [
        { text: 'OK', onPress: () => this.setState({ showBadAlert: false }) },
      ]
    )
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
    } = SignUpStyle;

    let isConfirmed = this.state.badEntry && { borderColor: 'red', borderBottomColor: 'red', borderWidth: 1 }

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
          <View style={inputContainer}>
            
            <Ionicons style={inputIcon} name="ios-person"></Ionicons>
            <TextInput style={inputs}
              placeholder="Name"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({ name })} />
          </View>
          <View style={inputContainer}>
            
            <Ionicons style={inputIcon} name="md-mail"></Ionicons>
            <TextInput style={inputs}
              placeholder="Email"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>
          <View style={[inputContainer, isConfirmed]}>
            
            <Ionicons style={inputIcon} name="md-key"></Ionicons>
            <TextInput style={inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <View style={[inputContainer, isConfirmed]}>
            
            <Ionicons style={inputIcon} name="md-key"></Ionicons>
            <TextInput style={inputs}
              placeholder="Confirm Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(confirm) => this.setState({ confirm })} />
          </View>
          {this.state.badEntry && <Text style={{ color: 'red', marginBottom: 10 }}>Passwords Do Not Match</Text>}


          <TouchableHighlight style={[buttonContainer, loginButton]} onPress={() => this.SignUpCheck()}>
            <Text style={loginText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
     
    );
  }
}


const mapDispatchToProps = dispatch => ({
  createNewUser: (newUser) => dispatch(createNewUser(newUser)),
})


export default connect(null, mapDispatchToProps)(SignUp);