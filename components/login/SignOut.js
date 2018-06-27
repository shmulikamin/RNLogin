import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import Styles from './Styles';
import LoginButton from './LoginButton';

const SignOut = (user, userUriPhoto, connectedWith, logout ) => {
  return(
    <View style={Styles.container}>
      <View style={Styles.content}>
        <Text style={Styles.header}>
          Welcome {user}!
        </Text>
        <View style={Styles.avatar}>
          <Image source={{ uri: userUriPhoto }} style={Styles.avatarImage} />
        </View>
      </View>
      <View style={Styles.button}>
        { LoginButton( connectedWith, logout, "sign Out") }
      </View>
    </View>
  )
}
export default SignOut;
