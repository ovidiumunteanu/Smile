// Main.js
import React from 'react'
import { StyleSheet, Platform, Dimensions, Image, ScrollView, TouchableOpacity, Text, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore";
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import AntIcon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { AppIcon } from "../../../constants/AppStyles"
import { isIphoneX } from 'react-native-iphone-x-helper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("screen");

class AddPostScreen extends React.Component {
	constructor(props) {
		super(props);
		props.navigation.setOptions({
			title: "Home",
			headerStyle: {
				backgroundColor: "#884488",
				color: 'white',
				height: isIphoneX() ? 70 : 60,
				borderBottomWidth: 0,
			},
			headerRight: (props) => {
				return (
					<View style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-start', alignItems: 'center', marginRight: 10 }}>
						<TouchableOpacity
							onPress={(props) => {
								var newpost = {
									User: {
										Name: this.props.user.fullname,
										Id: this.props.user.uid,
										Photo: this.props.user.photos[0]
									},
									Creation_On: firestore.FieldValue.serverTimestamp(),
									Images: this.state.images,
									Provider: this.state.provider,
									Message: this.state.message
								};
								console.log(this.props.user);
								if (this.state.images.length == 0) {
									alert("Select Images to suggest!");
									return;
								}
								if (this.state.message == "") {
									alert("Enter message of the post!");
									return;
								}
								firestore().collection('Posts').add(newpost);
							}}
						>
							<Text style={{ color: 'white', fontFamily: "DMSans-Medium" }}>Publicar</Text>
						</TouchableOpacity>
					</View>
				);
			},
		})
		this.state = {
			currentUser: null,
			provider: {},
			images: [],
			message: '',
			height: 250,
			imageUrl: null
		};
	}


	componentDidMount() {
		const { currentUser } = auth()
		this.setState({ currentUser })
	}
	updateSize = (height) => {
		if (height < 30) {
			height = height + 40
		}
		this.setState({
			height
		});
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

	_selectImage = () => {
		const options = {
			title: 'Select Photo',
			noData: true,
			mediaType: "photo",
			allowsEditing: true,
			quality: 0.7
		};
		/**
		 * The first arg is the options object for customization (it can also be null or omitted for default options),
		 * The second arg is the callback which sends object: response (more info in the API Reference)
		 */
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else {
				this.setState({ imageUri: response.uri });
			}
		});
	}

	render() {
		const { currentUser, height } = this.state
		let heightStyle = {
			...styles.textArea,
			height,
		}
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.nameTag}>
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
						<Text>{this.props.user.fullname}</Text>
					</View>
					<View style={styles.textAreaContainer}>
						<TextInput
							style={[heightStyle]}
							underlineColorAndroid="transparent"
							placeholder="Type Suggestion message"
							placeholderTextColor="grey"
							maxLength={150}
							multiline={true}
							onChangeText={message => this.setState({ message })}
							value={this.state.message}
							onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
						/>
					</View>

				</ScrollView>
				<View>
					<TouchableOpacity style={styles.select} onPress={this._selectImage}>
						<AntIcon style={styles.providerPhoto} name="picture" size={30} color={"#00aa00"} />
						<Text>Insert Image</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.select}>
						<AntIcon style={styles.providerPhoto} name="adduser" size={30} color={"#0000aa"} />
						<Text>Select Provider</Text>
					</TouchableOpacity>
				</View>
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
		borderWidth: 2,
		marginLeft: 5,
		marginRight: 15,
	},
	providerPhoto: {
		width: 30,
		height: 30,
		marginLeft: 5,
		marginRight: 15,
	},
	nameTag: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: "#99995501",
		padding: 10,
		borderRadius: 10,
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5
	},
	select: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: 'center',
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		borderTopWidth: 1,
		borderColor: '#00000011'
	},
	textAreaContainer: {
		padding: 15
	},
	textArea: {
		borderColor: '#00000011',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#3399ff22',
		padding: 5,
		textAlignVertical: 'top',
		justifyContent: "flex-start"
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen);