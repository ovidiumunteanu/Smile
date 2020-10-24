// Main.js
import React from 'react'
import { StyleSheet, Platform, Dimensions, Image, TouchableOpacity, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("screen");

export default class Main extends React.Component {
  state = { currentUser: null }
  componentDidMount() {
    const { currentUser } = auth()
    this.setState({ currentUser })
  }
  _logout = () => {
    auth()
    .signOut()
    .then(() => {
        console.log('User signed out!');
        this.props.navigation.navigate("AuthStack");
      })
    .catch(error => {
        
    });
  }
  render() {
      const { currentUser } = this.state      
      return (
        <View style={styles.container}>
          <Text>
            Hi {currentUser && currentUser.email}!
          </Text>
          <TouchableOpacity style={styles.submit} onPress={this._logout} activeOpacity={1}>
              <Text style={{color : "white", fontSize : 20}}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit : {
    width :wp("80%"), 
    height :wp("14%"), 
    backgroundColor :"red", 
    marginTop : 25,
    // borderBottomLeftRadius :70,
    borderRadius: 30, 
    justifyContent:"center", 
    alignItems :"center"
  },
})