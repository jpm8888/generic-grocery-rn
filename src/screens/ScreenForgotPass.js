import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import Font from '../common/Font';
import Layout from '../common/Layout';
import GreenButton from './components/GreenButton';
import {forgotPassword, onChange, updatePassword} from '../redux_store/actions/authActions';
import MTextInput from './components/MTextInput';


const scrWidth = Layout.window.width;
class ScreenForgotPass extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        const {navigation, otp_id} = this.props;

        const editable = (otp_id > 0);

        return (
            <View style={styles.container}>

                <View style={{padding : 20}}>
                    <Text style={styles.welcomeText}>Forgot Password</Text>
                    <Text style={styles.subWelcome}>Enter your registered mobile number</Text>
                </View>

                <View style={{margin : 20}}>
                    <MTextInput label={'Registered Mobile Number'} value={this.props.mobile} style={[styles.textInputStyle, {backgroundColor: !editable ? Colors.background : '#C0C0C0'}]} keyboardType="numeric" onChangeText={(txt)=>this.props.on_change('mobile', txt)} maxLength={10} editable={!editable}/>
                    <MTextInput label={'OTP'} value={this.props.otp} style={[styles.textInputStyle, {backgroundColor: editable ? Colors.background : '#C0C0C0'}]} keyboardType="numeric" onChangeText={(txt)=>this.props.on_change('otp', txt)} maxLength={6} editable={editable}/>
                    <MTextInput label={'New Password'} value={this.props.new_password} style={[styles.textInputStyle, {backgroundColor: editable ? Colors.background : '#C0C0C0'}]}  onChangeText={(txt)=>this.props.on_change('new_password', txt)} editable={editable} secureTextEntry={true}/>
                </View>


                <View style={{alignItems: 'flex-end', width : scrWidth - 20}}>
                    <GreenButton text={editable ? 'Update' : 'Request'} onPress={()=>{
                        editable ? this.props.update_password() : this.props.forgot_password()
                    }} loading={this.props.loading}/>
                </View>

            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        loading : s.forgotPassLoading,
        mobile : s.mobile,
        otp_id : s.otp_id,
        otp : s.otp,
        new_password : s.new_password,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        update_password : () => updatePassword(),
        forgot_password : () => forgotPassword(),
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
    textInputStyle: {
        marginTop : 20,
        borderBottomWidth : 1,
        borderBottomColor : Colors.secondaryTextColor,
        height : 40,
        fontFamily : Font.BOLD,
        fontSize: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenForgotPass);
