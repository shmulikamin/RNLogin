
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = (name, backgroundColor, onClick, text ) => {
  return(
    <Icon.Button
      name={name}
      backgroundColor={backgroundColor}
      onPress={onClick}
    >
      {text}
    </Icon.Button>
  )
}
export default Button;
