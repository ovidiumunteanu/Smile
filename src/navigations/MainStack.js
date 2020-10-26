import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/main/delivery/HomeScreen";
import DeliveryStack from "./DeliveryStack";
import SupplierStack from "./SupplierStack";
import SocialStack from "./SocialStack";
import KingdomStack from "./KingdomStack";
// import NotificationStack from "./NotificationStack";
// import ChatStack from "./ChatStack";
// import ProfileStack from "./ProfileStack";
import { useIsFocused } from "@react-navigation/native";
import {Text, View, StyleSheet} from "react-native";
import FastImage from "react-native-fast-image";
import { isIphoneX } from 'react-native-iphone-x-helper';

const TabStack = createBottomTabNavigator();

function MainStack({ navigation }) {
    return (
        <TabStack.Navigator
            lazy={false}
            tabBarOptions={{
                style: {
                    // backgroundColor: "#1F1F21",
                    minHeight: isIphoneX()?75 : 55,
                    paddingTop : 0,
                    marginBottom: 0
                },
                showLabel: false,
                labelStyle: {
                    fontSize: 14,
                    fontFamily: "DMSans-Medium",
                    marginBottom: 0
                },
                activeTintColor: "#DA1DA2"
            }}
        >
            <TabStack.Screen
                name="Delivery"
                component={DeliveryStack}
                options={{
                    title: "Delivery",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return (
                                <View style={{...styles.tabView, backgroundColor: '#3938'}}>
                                    <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_truck.png")} />
                                    <Text>Delivery</Text>
                                </View>
                            )
                        } else {
                            return <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_truck.png")} />
                        }
                    }
                }}
            />
            <TabStack.Screen
                name="Supplier"
                component={SupplierStack}
                options={{
                    title: "Supplier",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return (
                                <View style={{...styles.tabView, backgroundColor: '#9398'}}>
                                    <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_supplier.png")} />
                                    <Text>Supplier</Text>
                                </View>
                            )
                        } else {
                            return <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_supplier.png")} />
                        }
                    }
                }}
            />
            <TabStack.Screen
                name="Social"
                component={SocialStack}
                options={{
                    title: "Social",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return (
                                <View style={{...styles.tabView, backgroundColor: '#e009'}}>
                                    <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_smile_like.png")} />
                                    <Text>Red Social</Text>
                                </View>
                            )
                        } else {
                            return <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_smile_like.png")} />
                        }
                    }
                }}
            />
            <TabStack.Screen
                name="kingdom"
                component={KingdomStack}
                options={{
                    title: "KINGDOM",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return (
                                <View style={{...styles.tabView, backgroundColor: '#00e7'}}>
                                    <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_crown.png")} />
                                    <Text>KINGDOM</Text>
                                </View>
                            )
                        } else {
                            return <FastImage style={styles.tabImage} source={require("../../assets/icons/ic_crown.png")} />
                        }
                    }
                }}
            />
            {/* <TabStack.Screen name="Chat" component={ChatStack}
                options={{
                    title: "Chat",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return <Image source={require("../assets/images/chat-icon-active.png")} />
                        } else {
                            return <Image source={require("../assets/images/chat-icon-inactive.png")} />
                        }
                    }
                }}
            />
            <TabStack.Screen name="Notification" component={NotificationStack}
                options={{
                    title: "Notifications",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return <Image source={require("../assets/images/noti-icon-active.png")} />
                        } else {
                            return <Image source={require("../assets/images/noti-icon-inactive.png")} />
                        }
                    }
                }}
            />
            <TabStack.Screen name="Profile" component={ProfileStack}
                options={{
                    title: "Profile",
                    tabBarIcon: () => {
                        const isFocused = useIsFocused();
                        if (isFocused) {
                            return <Image source={require("../assets/images/profile-icon-active.png")} />
                        } else {
                            return <Image source={require("../assets/images/profile-icon-inactive.png")} />
                        }
                    }
                }}
            /> */}

        </TabStack.Navigator>
    )
}

const styles = StyleSheet.create({

    tabView : {
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"center", 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 30
    },
    tabText : {        
        position: "absolute",
        backgroundColor: "transparent"
    },
    tabImage: {
        width: 30, 
        height: 30, 
        resizeMode: 'stretch'
    }
  
  })

export default MainStack;


