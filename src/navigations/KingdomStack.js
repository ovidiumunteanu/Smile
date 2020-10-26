import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Dimensions} from 'react-native';
import FastImage from "react-native-fast-image";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import KingdomHomeScreen from "../screens/main/kingdom/KingdomHomeScreen";
// import ForgotPassword from "../screens/auth/ForgotPassword";
// import UploadPhoto from "../screens/auth/UploadPhoto";
// import SelectGender from "../screens/auth/SelectGender";
// import UpdateProfile from "../screens/auth/UpdateProfile";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("screen");

const Stack = createStackNavigator();

function KingdomStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="KingdomHomeScreen" component={KingdomHomeScreen} options={{
                headerShown: false
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
    )
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
        marginBottom: 15
    }
});

export default KingdomStack;