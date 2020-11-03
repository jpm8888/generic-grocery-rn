import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Font from '../../common/Font';
import Colors from '../../common/Colors';

class GreenButton extends Component {


    render() {
        const {loading} = this.props;
        const marginTop = (this.props.marginTop) ? this.props.marginTop : 10;

        if (loading){
            return (
                <View style={{...styles.buttonContainer, flexDirection : 'row', justifyContent: 'space-evenly', marginTop : marginTop}}>
                    <ActivityIndicator size={'small'} color={'white'}/>
                    <Text style={{color : 'white', fontFamily: Font.MEDIUM, fontSize:  10}}>{'Please wait...'}</Text>
                </View>
            );
        }

        const {onPress} = this.props;

        return (
            <TouchableOpacity style={{...styles.buttonContainer, marginTop : marginTop}} activeOpacity={0.7} onPress={onPress}>
                <Text style={{fontFamily: Font.MEDIUM, fontSize:  16, color : 'white'}}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer : {
        backgroundColor : Colors.primaryDark,
        width : 120,
        height : 40,
        borderRadius : 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GreenButton;
