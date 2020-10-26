import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContent, DrawerItemList } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/main/delivery/HomeScreen";
import DeliveryStack from "./DeliveryStack";
import SupplierStack from "./SupplierStack";
import SocialStack from "./SocialStack";
import KingdomStack from "./KingdomStack";
import DrawerContainer from "../components/DrawerContainer";
// import NotificationStack from "./NotificationStack";
// import ChatStack from "./ChatStack";
// import ProfileStack from "./ProfileStack";
import { useIsFocused } from "@react-navigation/native";
import {Text, View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView} from "react-native";
import FastImage from "react-native-fast-image";
import { isIphoneX } from 'react-native-iphone-x-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("screen");

const TabStack = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function BottomTabNav({ navigation }) {
    return (
        <TabStack.Navigator
            lazy={false}
            tabBarOptions={{
                style: {
                    backgroundColor: "transparent",
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
        </TabStack.Navigator>
    )
}

function WrapperStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            gestureEnabled :false,
            headerStyle: {
                backgroundColor: "transparent",
                borderBottomWidth: 3,
                height: wp("25%"),
                borderBottomColor: '#00000020'

            },
            headerTintColor: "black",
            headerTitleStyle: {
                fontFamily: "DMSans-Medium",
                fontSize: 20, 
            },
            headerTitleAlign : "center", 
            // headerLeft: (props) => <HeaderBackButton tintColor="black" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.pop()} />
            headerLeft: () => {
                return (
                    <View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.openDrawer();
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
            headerRight: () => {
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
                            onPress={() => {
                                //navigation.openDrawer();
                            }}
                        >
                            <FastImage
                                style={styles.userPhoto}
                                resizeMode={FastImage.resizeMode.cover}
                                source={require("../../assets/icons/ic_user.png")}
                                />
                        </TouchableOpacity>
                    </View>
                );
            },
            headerTitle : () => (
                <TouchableOpacity 
                    style={{paddingLeft: 20}}
                    onPress={() => {
                        navigation.navigate('HomeScreen');
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
            <Stack.Screen name="TabStack" component={BottomTabNav} options={{
                headerShown: true
                // headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Start")} />
            }}/>
        </Stack.Navigator> 
    )
}

const MainStack = () => {
//     const { user, setUser } = useContext(AppContext);
    return (
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            // <SafeAreaView style={{ flex: 1 }}>
            //   <View
            //     style={{
            //       height: 100,
            //       alignItems: "center",
            //       justifyContent: "center",
            //     }}
            //   >
            //     <FastImage
            //         style={styles.logo}
            //         resizeMode={FastImage.resizeMode.stretch}
            //         source={require("../../assets/images/Logo.png")}                  
            //     />
            //   </View>
            //   <DrawerItemList {...props} />
            // </SafeAreaView>
            <DrawerContainer />
          );
        }}
      >
        {<Drawer.Screen name="Home" component={WrapperStack} />}
      </Drawer.Navigator>
    );
};

// const DrawerStack = DrawerNavigator(
// {
//     Tab: TabNavigator
// },
// {
//     drawerPosition: "left",
//     initialRouteName: "Tab",
//     drawerWidth: 200,
//     contentComponent: DrawerContainer
// }
// );

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
    },
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
  
  })

export default MainStack;


