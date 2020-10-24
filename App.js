import React, { Component} from 'react';
import { View } from "react-native";
import { StatusBar } from 'react-native';
import { Provider } from "react-redux";
import configureStore from  "./src/store/configureStore"; 
import root from "./src/sagas";
import { navigationRef } from './src/navigations/navHelper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// // import the different screens 
import SplashScreen from './src/screens/SplashScreen'
import AuthStack from "./src/navigations/AuthStack";
import MainStack from "./src/navigations/MainStack";
import Text from "./src/components/Text";
import FastImage from "react-native-fast-image";


// create our app's navigation stack
const store = configureStore();
store.runSaga(root);

const Stack = createStackNavigator();

function App() {
	return (
		// <View style={{ flex: 1, backgroundColor: "blue" ,justifyContent: 'center', alignContent: 'center',}}><Text style={{flex: 1,  color: 'red'}}>Hi THere?</Text></View>
		<Provider store={store}>
			<StatusBar hidden={true} />
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator screenOptions={{gestureEnabled : false}}>
					<Stack.Screen name="Splash" component={SplashScreen} options={{headerShown : false}}/>
					<Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown : false}} />
					<Stack.Screen name="MainStack" component={MainStack} options={{headerShown : false}} />
					{/* <Stack.Screen name="UserDetails" component={UserDetails}
						options={(props) => ({
							title : props.route.params.user.fullname,
							headerStyle: {
								backgroundColor:  "black",
							},
							headerTintColor: "white",
							headerTitleStyle: {
								fontFamily: "DMSans-Medium",
								fontSize: 20, 
							},
							headerBackTitleVisible : false,
						})}
					/> */}
					{/* <Stack.Screen name="ChatScreen" component={ChatScreen}
						options={(props) => ({
							title : props.route.params.user.fullname,
							headerStyle: {
								backgroundColor:  "black",
							},
							headerTintColor: "white",
							headerTitleStyle: {
								fontFamily: "DMSans-Medium",
								fontSize: 20, 
							},
							headerBackTitleVisible : false,
							headerRight : () => (<></>),
							headerTitle : () => (
								<View style={{flexDirection :"row", marginLeft : Platform.OS == "ios"?40:10, justifyContent:"center", alignItems:"center"}}>
									<FastImage 
										source={{uri : props.route.params.user.photos[0]}}
										style={{width : 40, height:40, borderRadius : 20}}
									/>
									<Text style={{width : "100%", fontSize : 18, marginLeft : 10,}}>
										{props.route.params.user.fullname}
									</Text>
								</View>)
						})
					}
					/> */}
					
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

export default App;