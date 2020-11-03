import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import Font from '../common/Font';
import Layout from '../common/Layout';
import GreenButton from './components/GreenButton';
import {onChange, verifyOtp} from '../redux_store/actions/authActions';
import MTextInput from './components/MTextInput';


const scrWidth = Layout.window.width;

class ScreenSignUpVerifyOtp extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){

        return (
            <View style={styles.container}>

                <ScrollView style={{flex : 1, backgroundColor : Colors.background}}>
                    <View style={{padding : 20}}>
                        <Text style={styles.welcomeText}>Almost done,</Text>
                        <Text style={styles.subWelcome}>Please check your messages for OTP</Text>
                    </View>

                    <View style={{margin : 20}}>
                        <MTextInput label={'OTP'} value={this.props.otp} onChangeText={(txt)=>this.props.on_change('otp', txt)} keyboardType="numeric"/>
                    </View>

                    <View style={{width : scrWidth - 20, alignItems: 'flex-end'}}>
                        <GreenButton text={'Verify'} onPress={()=>this.props.verify_otp()} loading={this.props.loading}/>
                    </View>

                </ScrollView>
            </View>
        );
    }

}


const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        loading : s.signUpLoading,
        otp : s.otp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        verify_otp: () => verifyOtp(),
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSignUpVerifyOtp);
