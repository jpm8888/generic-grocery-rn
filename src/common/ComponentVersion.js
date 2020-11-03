import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Font from './Font';
import Constants from './Constants';

export default class ComponentVersion extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return (
            <View style={{}}>
                <View style={{...styles.listCard}}>
                    <Text style={{color: "#777777", fontFamily: Font.REGULAR}}>Codebase Version: {Constants.RN_CODEBASE_VERSION}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listCard : {
        margin: 5,
        justifyContent: "center",
        flex: 1,
        color: "#777777",
    },

    buttonTextStyle : {
        margin : 10,
        color : 'white',
        fontWeight : 'bold',
        fontFamily : Font.REGULAR,
    }

});
