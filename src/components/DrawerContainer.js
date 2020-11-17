import React from "react";
import { StyleSheet, View } from "react-native";
import MenuButton from "../components/MenuButton";
import { AppIcon } from "../constants/AppStyles";
import auth from "@react-native-firebase/auth";
import { logout } from "../actions/AuthActions";
import { connect } from "react-redux";

class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={AppIcon.images.home}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
        <View style={{...styles.container, paddingHorizontal: 70, paddingTop: 20}}>
          <MenuButton
            title="LOG OUT"
            source={AppIcon.images.logout}
            onPress={() => {
              navigation.closeDrawer();
              auth()
                  .signOut()
                  .then(() => {  
                      const { logout } = this.props;
                      console.log(this.props.user);
                      logout();                     
                      navigation.navigate('AuthStack');
                  })
                  .catch(e => {
                      console.warn(e);
                  })
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // flexDirection: "row",
    alignContent: "flex-start",
    justifyContent:"flex-start"
  },
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 20
  }
});
const mapStateToProps = state => {
  return {
      user : state.UserReducer
  }
}
const mapDispatchToProps = dispatch => ({
  logout : () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
