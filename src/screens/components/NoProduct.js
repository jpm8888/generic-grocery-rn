import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Font from '../../common/Font';
import Colors from '../../common/Colors';


const image = require('../../../assets/tractor.png');
class NoProduct extends Component {
    render() {
        return (
            <View style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
                <Image source={image} resizeMode={'contain'} style={{width : 256 / 2, height : 256 / 2, margin : 10}}/>
                <Text style={{fontFamily : Font.MEDIUM, color : Colors.secondaryTextColor}}>{'No products to show. :('}</Text>
            </View>
        );
    }
}

export default NoProduct;
