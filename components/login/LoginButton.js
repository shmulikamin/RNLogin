
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = (name, onClick, text ) => {
  const color =  name === "google" ? "#DD4B39" : "#3b5998";
  return(
    <Icon.Button
      name={name}
      backgroundColor={color}
      onPress={onClick}
    >
      {text}
    </Icon.Button>
  )
}
export default Button;
