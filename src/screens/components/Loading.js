import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import MyPlaceHolder from './MyPlaceHolder';
import Colors from '../../common/Colors';
import Font from '../../common/Font';

const tractorImage = require('../../../assets/tractor.png');
class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor : Colors.background, flex : 1}}>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <MyPlaceHolder/>
                <View style={{position : 'absolute', flex : 1, top : 0, bottom : 0, right : 0, left : 0, alignItems : 'center', justifyContent : 'center'}}>
                    <Image source={tractorImage} resizeMode={'contain'} style={{width : 50, height : 50}}/>
                    <Text style={{fontFamily : Font.REGULAR, alignSelf : 'center', textAlign : 'center', fontSize : 10 }}>{'Please wait...'}</Text>
                </View>
            </View>
        );
    }
}

export default Loading;
