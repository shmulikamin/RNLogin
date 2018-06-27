
import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
const { FBLoginManager } = require('react-native-facebook-login');

import { Styles, SignOut, LoginButton } from './'
import { Facebook } from '../../services';

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
     user: undefined,
     userUriPhoto: undefined,
     connectedWith: undefined,
   };
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    if (this.state.connectedWith === "google"){
      GoogleSignin.signOut()
      .then(() => {
         this.setState({
           user: undefined,
           userUriPhoto: undefined,
           connectedWith: undefined,
          });
       })
       .catch((err) => {
         console.log('WRONG SIGNOUT', err);
       });
       return;
    }
     FBLoginManager.logout((error, data) => {
       if (!error) {
         this.setState({
           user: undefined,
           userUriPhoto: undefined,
           connectedWith: undefined
          });
       } else {
         console.log(error, data);
       }
     });
  }

  loginWithGoogle() {
   GoogleSignin.signIn()
   .then((user) => {
     this.setState({
       user: user.givenName,
       userUriPhoto: user.photo,
       connectedWith: "google",
     });
   })
   .catch((err) => {
     console.log('WRONG SIGNIN', err);
   })
 }

 loginWithFacebook() {
   let _this = this;
   FBLoginManager.loginWithPermissions(["email","user_friends"], (error, data) => {
     if (!error) {
      Facebook.getUserName(data.credentials.userId, data.credentials.token )
       .then((response) => response.json())
       .then( (responseData) => {
         _this.setState({
          user: responseData.name,
          userUriPhoto: `https://graph.facebook.com/${data.credentials.userId}/picture?type=large`,
          connectedWith: "facebook",
        });
      })
     .done();
     } else {
       console.log("Error: ", error);
     }
   })
 }

  render() {
    const { user, userUriPhoto, connectedWith } = this.state;
      if (connectedWith) {
        return(
          <View style={Styles.container}>
            { SignOut(user, userUriPhoto, connectedWith, this.logout) }
          </View>
        )
      }
      return(
        <View style={Styles.container}>
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
           </View>
          <View style={Styles.buttons}>
            { LoginButton("facebook", this.loginWithFacebook, "Login with Facebook") }
            { LoginButton("google", this.loginWithGoogle, "Or with Google") }
          </View>
        </View>
      )
    }
  }
