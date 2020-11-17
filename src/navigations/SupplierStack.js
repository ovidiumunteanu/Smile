import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Dimensions} from 'react-native';
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import {AppIcon} from "../constants/AppStyles";
import { isIphoneX } from 'react-native-iphone-x-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AllSupplierScreen from "../screens/main/supplier/AllSupplierScreen";
// import ForgotPassword from "../screens/auth/ForgotPassword";
// import UploadPhoto from "../screens/auth/UploadPhoto";
// import SelectGender from "../screens/auth/SelectGender";
// import UpdateProfile from "../screens/auth/UpdateProfile";
const { width, height } = Dimensions.get("screen");

const Stack = createStackNavigator();
class SupplierStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            menuIcon: this.props.user.profileURL
        });
    }

    render() {
        return (
            <Stack.Navigator screenOptions={{
                gestureEnabled :false,
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomWidth: 3,
                    height: isIphoneX()?100 : 80,
                    borderBottomColor: '#00000020'
    
                },
                headerTintColor: "black",
                headerTitleStyle: {
                    fontFamily: "DMSans-Medium",
                    fontSize: 20, 
                },
                headerTitleAlign : "center", 
                // headerLeft: (props) => <HeaderBackButton tintColor="black" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.pop()} />
                headerLeft: (props) => {
                    return (
                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.openDrawer();
                                }}
                            >
                                <FastImage
                                    style={styles.userPhoto}
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={require("../../assets/icons/ic_menu.png")}
                                    />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    //navigation.openDrawer();
                                }}
                            >
                                <FastImage
                                    style={styles.userPhoto}
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={require("../../assets/icons/ic_notification.png")}
                                    />
                            </TouchableOpacity>
                        </View>
                        
                    );
                },
                headerRight: (props) => {
                    return (
                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    // navigation.openDrawer();
                                }}
                            >
                                <FastImage
                                    style={styles.shopping}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    source={require("../../assets/icons/ic_shopping.png")}
                                    />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={(props) => {
                                    //navigation.openDrawer();
                                    console.log(this.props.user.photos[0]);
                                }}
                            >
                                { this.props.user.photos[0] != '' ? (
                                        <FastImage
                                            style={styles.userPhoto}
                                            resizeMode={FastImage.resizeMode.cover}
                                            //source={AppIcon.images.defaultUser}
                                            source = {{uri: this.props.user.photos[0]}}
                                        />
                                    ):(
                                        <FastImage
                                            style={styles.userPhoto}
                                            resizeMode={FastImage.resizeMode.cover}
                                            source={AppIcon.images.defaultUser}
                                            // source = {{uri: this.props.user.photos[0]}}
                                        />
                                    )
                                }
                                
                            </TouchableOpacity>
                        </View>
                    );
                },
                headerTitle : () => (
                    <TouchableOpacity 
                        style={{paddingLeft: 20}}
                        onPress={() => {
                            this.props.navigation.navigate('HomeScreen');
                        }}
                    >
                        <FastImage
                            style={styles.logo}
                            resizeMode={FastImage.resizeMode.stretch}
                            source={require("../../assets/images/Logo.png")}
                            />
                    </TouchableOpacity>
                    
                )
            }}>
                <Stack.Screen name="AllSupplierScreen" component={AllSupplierScreen} options={{
                    headerShown: true
                    // headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Start")} />
                }}/>
                {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                    title : "Forgot Password",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Start")} />
                }} />
                <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{
                    title : "Upload your Photo",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Register")} />
                }} />
                <Stack.Screen name="SelectGender" component={SelectGender} options={{
                    title : "Select Gender",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("UploadPhoto")} />
                }}/>
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("SelectGender")} />
                }}/> */}
                {/* <Stack.Screen name="Ethnicity" component={Ethnicity} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("UpdateProfile")} />
                }} /> */}
                {/* <Stack.Screen name="Interests" component={Interests} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Ethnicity")} />
                }} />
                <Stack.Screen name="LookingFor" component={LookingFor} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Interests")} />
                }} /> */}
                {/* <Stack.Screen name="Relationship" component={Relationship} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("UpdateProfile")} />
                }} />
                <Stack.Screen name="ReligiousAffiliation" component={ReligiousAffiliation} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Relationship")} />
                }} />
                <Stack.Screen name="Occupation" component={Occupation} options={{
                    title : "Update Profile",
                    headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("ReligiousAffiliation")} />
                }} />
                
                <Stack.Screen name="CompleteScreen" component={CompleteScreen} options={{
                    headerShown : false
                }} /> */}
            </Stack.Navigator> 
        );
    }
}

const styles = StyleSheet.create({    
    userPhoto: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderColor: "grey",
        marginLeft: 5,
        marginRight: 5,
    },
    shopping: {
        width: 30,
        height: 30,
        borderRadius: 0,
        marginLeft: 5,
        marginRight: 5
    },
    logo: {
        width :wp("40%"), 
        height: wp("15%"),
    }
});

const mapStateToProps = state => {
    return {
        user : state.UserReducer
    }
}
const mapDispatchToProps = dispatch => ({
    registerSuccess : data => dispatch(registerSuccess(data)),
    loginSuccess : data => dispatch(loginSuccess(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SupplierStack);