/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
const { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import { Styles, Login } from './components/login';



export default class App extends Component{
  render() {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); 
    GoogleSignin.configure({
      iosClientId: "481979213525-k9q0sa06ifsclva26cl95c3m4qeei7l3.apps.googleusercontent.com", // only for iOS
    })
    return (
      <View style={Styles.container}>
        <Login />
      </View>
    );
  }
}
