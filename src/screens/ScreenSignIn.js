import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import Font from '../common/Font';
import Layout from '../common/Layout';
import GreenButton from './components/GreenButton';
import {onChange, sign_in} from '../redux_store/actions/authActions';
import MTextInput from './components/MTextInput';


const scrWidth = Layout.window.width;

class ScreenSignIn extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        const {navigation} = this.props;

        return (
            <View style={styles.container}>

                <View style={{padding : 20}}>
                    <Text style={styles.welcomeText}>Welcome to,</Text>
                    <Text style={styles.welcomeText}>Rakesh Auto Parts</Text>
                    <Text style={styles.subWelcome}>Let's get started</Text>
                </View>

                <View style={{margin : 20}}>
                    <MTextInput label={'Mobile Number'} value={this.props.mobile} keyboardType={'numeric'} onChangeText={(txt) => this.props.on_change('mobile', txt)} maxLength={10}/>
                    <MTextInput label={'Password'} value={this.props.password} secureTextEntry={true} onChangeText={(txt)=>this.props.on_change('password', txt)}/>
                </View>

                <View style={{flexDirection : 'row', justifyContent:  'space-between', paddingRight : 20, paddingLeft : 20, alignItems: 'center'}}>
                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate('ScreenForgotPass')}>
                            <Text style={{fontFamily : Font.REGULAR, color : 'blue', textDecorationLine: 'underline',}}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems: 'flex-end'}}>
                        <GreenButton text={'SIGN IN'} onPress={()=>this.props.signIn(this.props.navigation)} loading={this.props.loading}/>
                    </View>
                </View>



            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        loading : s.loading,
        mobile : s.mobile,
        password : s.password,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn: (nav) => sign_in(nav),
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSignIn);
