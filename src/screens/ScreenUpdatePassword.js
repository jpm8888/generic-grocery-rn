import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {on_change, updatePassword} from '../redux_store/actions/settingActions';
import Font from '../common/Font';
import GreenButton from './components/GreenButton';
import Colors from '../common/Colors';
import MTextInput from './components/MTextInput';


class ScreenUpdatePassword extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        return (
            <View style={styles.container}>

                <View style={{padding : 20}}>
                    <Text style={styles.welcomeText}>Set new password</Text>
                    <Text style={styles.subWelcome}>Enter your new password</Text>
                </View>

                <View style={{margin : 20}}>
                    <MTextInput value={this.props.new_pass} label={'New password'} secureTextEntry={true} onChangeText={(txt)=>this.props.on_change('new_pass', txt)}/>
                    <MTextInput value={this.props.confirm_new_pass} label={'Confirm new password'} secureTextEntry={true} onChangeText={(txt)=>this.props.on_change('confirm_new_pass', txt)}/>
                </View>


                <View style={{alignItems: 'flex-end', marginRight : 15}}>
                    <GreenButton text={'Update'} onPress={()=>this.props.update_password()} loading={this.props.loading}/>
                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.settingReducer;
    return {
        new_pass : s.new_pass,
        confirm_new_pass : s.confirm_new_pass,
        loading : s.updatingPassword,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        on_change: (name, value) => on_change(name, value),
        update_password: () => updatePassword(),
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenUpdatePassword);
