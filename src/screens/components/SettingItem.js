import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../common/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Font from '../../common/Font';

class SettingItem extends Component {
    render() {
        const {name, icon, onPress} = this.props;
        return (
            <TouchableOpacity style={{margin : 5}} activeOpacity={0.7} onPress={onPress}>
                <View style={{flexDirection : 'row', alignItems : 'center', borderBottomWidth : 0.5, borderBottomColor : 'gray', padding : 16}}>
                    <AntDesign name={icon} size={22} color={Colors.primaryDark}/>
                    <Text style={{fontFamily : Font.REGULAR, fontSize : 16, marginLeft : 10}}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default SettingItem;
