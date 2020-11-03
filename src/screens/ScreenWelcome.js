import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import {logo_image, rak_logo} from './SplashScreen';
import Font from '../common/Font';
import {SafeAreaView} from 'react-native-safe-area-context';


class ScreenWelcome extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }

    navigate_to(scr_name){
        const {navigation} = this.props;
        navigation.navigate(scr_name);
    }


    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={{justifyContent:  'center', alignItems:  'center'}}>
                    <Text style={{color : 'white', fontFamily: Font.BOLD, fontSize:  30}}>Welcome To</Text>
                    <Image source={logo_image} resizeMode={'contain'} style={{width : 1067 / 3, height : 503 / 3}}/>
                </View>

                <View>
                    <TouchableOpacity style={styles.signInContainer} activeOpacity={0.7} onPress={()=>this.navigate_to('ScreenSignIn')}>
                        <Text style={{fontFamily: Font.MEDIUM, fontSize:  16, color : Colors.primaryDark}}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpContainer} activeOpacity={0.7} onPress={()=>this.navigate_to('ScreenSignUp')}>
                        <Text style={{fontFamily: Font.MEDIUM, fontSize:  16, color : 'white'}}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>

                <View style={{position : 'absolute', bottom : 20}}>
                    <Image source={rak_logo} resizeMode={'contain'} style={{width : 512 / 4, height : 165 / 4}}/>
                </View>

            </SafeAreaView>
        );
    }

}


const mapStateToProps = (state) => {
    const s = state.indexReducer;
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // on_change: (name, value) => on_change(name, value),
    }, dispatch);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor : Colors.primaryDark
    },

    signInContainer : {
        backgroundColor : 'white',
        width : 150,
        height : 40,
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10
    },
    signUpContainer : {
        backgroundColor : Colors.primaryDark,
        width : 150,
        height : 40,
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenWelcome);
