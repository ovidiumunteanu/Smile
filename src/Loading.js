// Loading.js
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth'

const { width, height } = Dimensions.get("window");

export default class Loading extends React.Component {

  componentDidMount() {
    const that = this;
    setTimeout(() =>{
      auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Main' : 'Login')
      })
    }, 4000)
    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageBackground style={style.container} source={require("../assets/images/Logo.png")}>
            <View style={style.overlay}></View>
        </ImageBackground>
      </View>
      
    );
  }
}

const style = StyleSheet.create({

  container : {
      width : 300, 
      height : 200,
      resizeMode: "center"
  },
  overlay : {
      width : width,
      height : height,
      position: "absolute",
      backgroundColor: "transparent"
  }

})