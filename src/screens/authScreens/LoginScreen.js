import React, { Component } from 'react';
import { View,Image, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import Text from "../../components/Text";
import TextInput from "../../components/TextInput";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { isIphoneX } from 'react-native-iphone-x-helper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import firestore from "@react-native-firebase/firestore";
import { connect } from "react-redux";
import Loading from "../Loading";
import { registerSuccess, loginSuccess } from "../../actions/AuthActions";
import LinearGradient from "react-native-linear-gradient";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const iphonex = isIphoneX();
const { width, height } = Dimensions.get("screen");

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember : false,
            email : "",
            password : "",
            loading : false,
            percent : 0
        };
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '856367629106-0la46bs0u0ls3bt6t1b73kt0orfp7fc6.apps.googleusercontent.com',
            loginHint: '',//'developersmile01@gmail.com', 
            offlineAccess: true, 
            hostedDomain: '', 
            forceConsentPrompt: true,
          });    
        console.log(this.props.user);    
    }

    _onPressRemember = () => {
        this.setState({remember : !this.state.remember})
    }

    _onChangeEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) this.setState({email : email})
        else this.setState({email : ""})
    }

    _onChangePassword = (password) => {
        this.setState({password: password});
    }

    _onPressForgotPassword = () => {
        this.props.navigation.navigate("ForgotPassword");
    }

    _onPressSignUp = () => {
        this.props.navigation.navigate("RegisterScreen");
    }

    _submit = () => {
        if(this.state.email == ""){
            alert("Please enter your Email!");
            return;
        }
        if(this.state.password == ""){
            alert("Please enter your password!");
            return;
        }
        this.setState({ loading: true });
        const { email, password } = this.state;
        const { registerSuccess, loginSuccess } = this.props;
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(async res => {
            const { uid } = res.user;
            
            const userDoc = await firestore().collection("Users").doc(uid).get();
            const userData = userDoc.data();

            if (userData === undefined) { 
                const { email } = res.user;
                const data = { 
                    email : email, 
                    uid : uid
                }
                registerSuccess(data); 
            }
            else { loginSuccess(userData); }
            
            this.setState({ loading: false });
            
        })
        .catch(error => {
            this.setState({ loading: false });
            if (error.code == "auth/invalid-email") Alert.alert("Invaild email");
            else if (error.code == "auth/user-disabled") Alert.alert("Your account was disabled");
            else if (error.code == "auth/wrong-password") Alert.alert("Password is wrong");
            else if (error.code == "auth/user-not-found") {
                Alert.alert("You are not registered!");
            }
        else { /-*7/
                console.warn(error);
            }
        })

    }
    _loginWithFacebook = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // create a new firebase credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
        // login with credential
        auth().signInWithCredential(googleCredential).then(async res => {
            const { additionalUserInfo, user } = res;            
            const {registerSuccess, loginSuccess } = this.props;
            console.log(this.props.user);
            const userDoc = await firestore().collection("Users").doc(user.uid).get();
            const userData = userDoc.data();
            if(userData === undefined ){ 
                const data = { email : user.email, uid : user.uid }
                registerSuccess(data);                
            }else{ loginSuccess(userData); }
        }).catch(e => {
            alert("Sorry, Something went wrong, please use another start method");
            console.warn(e);
        });
    }
    

    _loginWithGoogle = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // create a new firebase credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
        // login with credential
        auth().signInWithCredential(googleCredential).then(async res => {
            const { additionalUserInfo, user } = res;            
            const {registerSuccess, loginSuccess } = this.props;
            const userDoc = await firestore().collection("Users").doc(user.uid).get();
            const userData = userDoc.data();
            if(userData === undefined ){ 
                const data = { email : user.email, uid : user.uid, fullname : user.displayName, phoneNumber: user.phoneNumber, photos: [user.photoURL, "","","","","",""]}
                registerSuccess(data);                
            }else{
                loginSuccess(userData); 
            }
        }).catch(e => {
            alert("Sorry, Something went wrong, please use another start method");
            console.warn(e);
        });
    }

    render() {
        return (
            <SafeAreaView style={{flex : 1}}>
                <View style={{width:width, justifyContent: "center", alignItems: "center"}}>
                    <View>
                        <Image style={{width: 0.8*width, height: 0.25*height, resizeMode: "center"}} source={require("../../../assets/images/Logo.png")}/>
                    </View>
                    <TextInput  placeholder="Correo electrónico" email onChangeText={this._onChangeEmail} disableAutoCapitalize/>
                    <TextInput placeholder="Contraseña" password onChangeText={this._onChangePassword}/>
                    <TouchableOpacity style={styles.remember} onPress={this._onPressRemember} activeOpacity={1}>
                        <View style={{ ...styles.rememberIcon, backgroundColor: this.state.remember ? "white" : "rgba(254,254,254,.25)" }}>
                            {this.state.remember && <MCIcon name="check" color="green" size={20} />}
                        </View>
                        <Text style={{color: "#00000088", fontSize : 16, fontFamily:"DMSans-Bold"}}>¿Recuerdas esta cuenta?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit} onPress={this._submit} activeOpacity={0.5}>
                        <LinearGradient 
                            colors={['#ee0088',  '#2964FF']} 
                            style={styles.gradient} 
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        >
                            <Text style={{color : this.state.password&&this.state.email?"pink":"white", fontSize : 16}}>INICIAR SESIÓN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                    <View style={{width: '90%', flexDirection : 'row', justifyContent: 'space-around'}}>
                        <Icon.Button
                            name="facebook"
                            backgroundColor="#3b5998"
                            borderRadius = {30}
                            onPress={this._loginWithFacebook}
                            style={styles.social}
                        >
                            <Text style={{ fontFamily: 'Arial', fontSize: 18 }}>
                                Facebook
                            </Text>
                        </Icon.Button>
                        <Icon.Button
                            name="google"
                            backgroundColor="#e34958"
                            borderRadius = {30}
                            onPress={this._loginWithGoogle}
                            style={styles.social}
                        >
                            <Text style={{ fontFamily: 'Arial', fontSize: 18 }}>
                                Google
                            </Text>
                        </Icon.Button>
                    </View>
                    <TouchableOpacity style={{...styles.submit, borderWidth: 2, marginTop: 10}} onPress={this._onPressSignUp} activeOpacity={0.5}>
                        <Text style={{color : "#ff4499", fontSize : 16}}>REGISTRAS</Text>
                    </TouchableOpacity>


                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={{flexDirection :"row"}} onPress={this._onPressForgotPassword}>
                        <MCIcon name="key" size={20} color={"#00000088"}/>
                        <Text style={{fontSize : 18, fontFamily:"DMSans-Bold", marginLeft : 10, color: "#00000088"}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                {this.state.loading && <Loading /> }
            </SafeAreaView>
        );
    }
}

const styles=StyleSheet.create({
    container : {
        width : "100%", 
        height : "100%",
        resizeMode: "center"
    },
    remember : {
        width:width - 70, 
        marginTop:10, 
        flexDirection:"row", 
        alignItems:"center"
    },
    rememberIcon : {
        width : 20, 
        height:20, 
        borderRadius : 15, 
        borderColor: "#00000055",
        borderWidth: 1,
        backgroundColor:"rgba(254,254,254,.25)", 
        marginRight : 10
    },
    social : {
        width :wp("40%"), 
        height :wp("12%"),       
        justifyContent:"center", 
        alignItems :"center"
    },
    
    submit : {
        width :wp("90%"), 
        height :wp("13%"), 
        backgroundColor :"transparent", 
        marginTop : 25,
        marginBottom: 10,
        borderRadius :30, 
        borderColor: '#ff4499',
        borderWidth: 0,
        justifyContent:"center", 
        alignItems :"center"
    },

    gradient: {
        flex: 1,
        width :wp("90%"),
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 35
    },

    bottom : {
        // position: "absolute",
        // bottom : iphonex?200:Platform.OS=="ios"?100:100,
        marginTop : 40,
        justifyContent:"center",
        width : width,
        height : 50,
        alignItems:"center"
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
