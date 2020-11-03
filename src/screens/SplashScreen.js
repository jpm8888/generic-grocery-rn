import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Constants, {debugLog} from '../common/Constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {run_database_migrations} from '../app/database/AppDatabase';
import Font from '../common/Font';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../common/Colors';
import {verifyToken} from '../redux_store/actions/authActions';

const timer = require('react-native-timer');
export const logo_image = require('../../assets/logo.png');
export const rak_logo = require('../../assets/rak_auto_logo.png');

class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
        run_database_migrations().then(()=>{
            debugLog('executed all migrations...');
        });
    }



    async componentDidMount(){
        let time = (Constants.DEBUG) ? 2000 : 2000;
        timer.setTimeout(this, 'splash', () => {
            this.props.verifyToken();
        }, time);
    }

    render() {
        let text = '#Superior tractor parts, Made in India with ❤️'

        let color_a = Colors.primaryLight;
        let color_b = "rgb(67, 161, 56)";
        let color_c = "rgb(167, 204, 38)";

        return (
            <LinearGradient colors={[color_a, color_c, color_b]} style={styles.container}>
                <View style={[styles.container]}>
                    <Image source={logo_image} resizeMode={'contain'} style={{width : '100%', height : '100%'}}/>
                </View>



                <View style={{marginBottom : 10, justifyContent : 'center', alignItems: 'center'}}>
                    <Image source={rak_logo} resizeMode={'contain'} style={{width : 512/4, height : 165/4}}/>
                    <Text style={styles.tagLine}>{text}</Text>
                </View>
            </LinearGradient>
        );
    }


}


export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
    },

    tagLine : {
        fontFamily : Font.MEDIUM,
        color : 'white',
        fontSize : 15,
    }
});



const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        isSigned: s.isSigned,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        verifyToken : () => verifyToken(),
    }, dispatch);
};



export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
