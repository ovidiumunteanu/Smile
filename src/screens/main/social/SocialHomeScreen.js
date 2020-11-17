// Main.js
import React from 'react'
import { StyleSheet, Platform, Dimensions, Image, ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth'
import FastImage from 'react-native-fast-image';
import AntIcon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppIcon } from "../../../constants/AppStyles"
const { width, height } = Dimensions.get("screen");

class SocialHomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null
		};
	}
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
				<ScrollView>
					<View style={styles.newPost}>
						{this.props.user.photos[0] != '' ? (
							<FastImage
								style={styles.userPhoto}
								resizeMode={FastImage.resizeMode.cover}
								//source={AppIcon.images.defaultUser}
								source={{ uri: this.props.user.photos[0] }}
							/>
						) : (
								<FastImage
									style={styles.userPhoto}
									resizeMode={FastImage.resizeMode.cover}
									source={AppIcon.images.defaultUser}
								/>
							)
						}
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate("AddPostScreen");
							}}
						>
							<Text>Que recomiendas hoy?</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {

							}}
						>
							<AntIcon style={styles.providerPhoto} name="picture" size={20} color={"#00000033"} />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	userPhoto: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderColor: "grey",
		marginLeft: 5,
		marginRight: 5,
	},
	newPost: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: "#99995501",
		padding: 10,
		borderRadius: 10,
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5
	}
})

const mapStateToProps = state => {
	return {
		user: state.UserReducer
	}
}
const mapDispatchToProps = dispatch => ({
	registerSuccess: data => dispatch(registerSuccess(data)),
	loginSuccess: data => dispatch(loginSuccess(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialHomeScreen);