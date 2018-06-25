
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
const { FBLoginManager } = require('react-native-facebook-login');

import Styles from './Styles';
import LoginButton from './LoginButton';
import { Facebook } from '../../services';

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
     user: undefined,
   };
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
  }

  loginWithGoogle() {
    if(this.state.user) {
      GoogleSignin.signOut()
      .then(() => {
         this.setState({ user: undefined });
       })
       .catch((err) => {
         console.log('WRONG SIGNOUT', err);
       });
       return;
    }
   GoogleSignin.signIn()
   .then((user) => {
     this.setState({
       user: user.givenName,
     });
   })
   .catch((err) => {
     console.log('WRONG SIGNIN', err);
   })
   .done();
 }

 loginWithFacebook() {
   let _this = this;
   if(this.state.user) {
     FBLoginManager.logout((error, data) => {
       if (!error) {
         _this.setState({
           user: undefined,
          });
       } else {
         console.log(error, data);
       }
     });
    return;
    }
   FBLoginManager.loginWithPermissions(["email","user_friends"], (error, data) => {
     if (!error) {
       Facebook.getUserName(data.credentials.userId, data.credentials.token )
       .then((response) => response.json())
       .then( (responseData) => {
         _this.setState({
          user: responseData.name,
        });
      })
     .done();
     } else {
       console.log("Error: ", error);
     }
   })
 }

  render() {
    const { user } = this.state;
    const displayUser = user ?
    <View style={Styles.content}>
      <Text style={Styles.header}>
        Welcome {user}!
      </Text>
      <View style={Styles.avatar}>
        <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
      </View>
    </View>
    :
    <View style={Styles.content}>
      <Text style={Styles.header}>
        Welcome Stranger!
      </Text>
      <View style={Styles.avatar}>
        <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
      </View>
      <Text style={Styles.text}>
        Please log in to continue {'\n'}
        to the App
       </Text>
     </View>;
      const googleText = user ? "sign Out": "Or with Google";
      const facebookText = user ? "sign Out": "Login with Facebook";

      return(
        <View style={Styles.container}>
          {displayUser}
          <View style={Styles.buttons}>
            { LoginButton("facebook", "#3b5998", this.loginWithFacebook, facebookText) }
            { LoginButton("google", "#DD4B39", this.loginWithGoogle, googleText) }
          </View>
        </View>
      )
    }
  }
