import React from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import Font from '../common/Font';
import Layout from '../common/Layout';
import GreenButton from './components/GreenButton';
import {onChange, signUp} from '../redux_store/actions/authActions';
import MTextInput from './components/MTextInput';


const scrWidth = Layout.window.width;

class ScreenSignUp extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex : 1, backgroundColor : Colors.background}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={{padding : 20}}>
                            <Text style={styles.welcomeText}>Welcome to,</Text>
                            <Text style={styles.welcomeText}>Rakesh Auto Parts</Text>
                            <Text style={styles.subWelcome}>Let's get started</Text>
                        </View>

                        <View style={{margin : 20}}>
                            <MTextInput label={'Company Name'} value={this.props.companyName} onChangeText={(txt)=>this.props.on_change('companyName', txt)}/>
                            <MTextInput label={'Individual Name'} value={this.props.name} onChangeText={(txt)=>this.props.on_change('name', txt)}/>
                            <MTextInput label={'Mobile Number'} value={this.props.mobile} onChangeText={(txt)=>this.props.on_change('mobile', txt)} keyboardType="numeric"/>
                            <MTextInput label={'Password'} value={this.props.password} secureTextEntry={true} onChangeText={(txt)=>this.props.on_change('password', txt)}/>
                        </View>

                        <View style={{width : scrWidth - 20, alignItems: 'flex-end'}}>
                            <GreenButton text={'SIGN UP'} onPress={()=>this.props.sign_up(this.props.navigation)} loading={this.props.loading}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

}

const NotifyText = ({msg}) =>{
    if (msg === '') return null;
    return (
        <View style={{backgroundColor : '#FFC107', padding : 10, margin : 10, borderRadius: 5}}>
            <Text style={{fontFamily : Font.REGULAR, fontSize : 20, color : "#4A148C"}}>{msg}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        loading : s.signUpLoading,
        companyName : s.companyName,
        name : s.name,
        mobile : s.mobile,
        password : s.password,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        sign_up: (nav) => signUp(nav),
        on_change: (name, value) => onChange(name, value),
    }, dispatch);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : Colors.background
    },
    welcomeText : {
        fontFamily : Font.BOLD,
        fontSize : 25,
    },
    subWelcome : {
        fontFamily : Font.REGULAR,
        color : Colors.secondaryTextColor
    },
    buttonContainer : {
        backgroundColor : Colors.primaryDark,
        width : 120,
        height : 40,
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSignUp);
