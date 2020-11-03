import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GreenButton from './components/GreenButton';
import Colors from '../common/Colors';
import Font from '../common/Font';
import Layout from '../common/Layout';
import {onChangeAddress, saveAddress} from '../redux_store/actions/addressActions';
import MTextInput from './components/MTextInput';

const scrWidth = Layout.window.width;

class ScreenAddressCreate extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        const {address, loading} = this.props;


        return (
            <View style={styles.container}>
                <ScrollView style={{flex : 1, backgroundColor : Colors.background}}>
                    <View style={{padding : 20}}>
                        <Text style={styles.welcomeText}>Address</Text>
                        <Text style={styles.subWelcome}>Add new customer details.</Text>
                    </View>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} style={{flex : 1, backgroundColor : Colors.background}}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{margin : 20}}>
                                <MTextInput value={address.name} label={'Customer Name'} onChangeText={(text)=> this.props.on_change_val('name', text)}/>
                                <MTextInput value={address.line_1} label={'Address Line 1'} onChangeText={(text)=> this.props.on_change_val('line_1', text)}/>
                                <MTextInput value={address.line_2} label={'Address Line 2'} onChangeText={(text)=> this.props.on_change_val('line_2', text)}/>
                                <MTextInput value={address.state} label={'State'} onChangeText={(text)=> this.props.on_change_val('state', text)}/>
                                <MTextInput value={address.pin_code} label={'Pin code'} onChangeText={(text)=> this.props.on_change_val('pin_code', text)} keyboardType={'numeric'} numeric/>
                                <MTextInput value={address.mobile} label={'Mobile'} onChangeText={(text)=> this.props.on_change_val('mobile', text)} keyboardType={'numeric'} numeric maxLength={10}/>
                                <MTextInput value={address.landmark} label={'Landmark (if any)'} onChangeText={(text)=> this.props.on_change_val('landmark', text)}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{width : scrWidth - 20, alignItems: 'flex-end'}}>
                            <GreenButton text={'Save'} onPress={()=>this.props.save(this.props.navigation)} loading={loading}/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.addressReducer;
    return {
        address : s.newAddress,
        loading : s.saveAddressLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        on_change_val: (name, value) => onChangeAddress(name, value),
        save: (nav) => saveAddress(nav),
    }, dispatch);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : Colors.background,
        marginBottom : 20
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenAddressCreate);
