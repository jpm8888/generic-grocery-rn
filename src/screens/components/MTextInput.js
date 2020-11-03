import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../common/Colors';
import Font from '../../common/Font';

class MTextInput extends Component {
    render() {
        let {label, editable} = this.props;
        if (editable === undefined){
            editable = true;
        }

        return (
            <View style={{marginTop : 20}}>
                <View style={[styles.textInputContainer, {backgroundColor: editable ? Colors.background : '#C0C0C0'}]}>
                    <TextInput {...this.props} style={styles.textInputStyle} returnKeyType={'done'}/>
                </View>
                <View style={{position : 'absolute', top : -8, backgroundColor : editable ? Colors.background : '#C0C0C0', left : 10, borderRadius: 5}}>
                    <Text style={styles.labelStyle}>{label}</Text>
                </View>
            </View>
        );
    }
}

export default MTextInput;

const styles = StyleSheet.create({

    labelStyle : {
        fontFamily: Font.REGULAR,
        // fontSize: 16,
        color : Colors.secondaryTextColor
    },
    textInputContainer : {
        borderRadius : 5,
        borderWidth : 0.5,
        borderColor : Colors.secondaryTextColor,
        justifyContent : 'center'
    },
    textInputStyle: {
        height : 40,
        marginLeft : 10,
        fontFamily : Font.REGULAR,
        fontSize: 16,
    },

});
