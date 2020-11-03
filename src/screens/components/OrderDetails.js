import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Font from '../../common/Font';
import {get_color} from '../ScreenOrderHistory';

class OrderDetails extends Component {
    render() {
        const {uid, f_created_at, status} = this.props;

        return (
            <View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 5, alignItems : 'center'}}>
                    <Text style={{fontFamily : Font.MEDIUM, fontSize: 15}}>Order Number</Text>
                    <Text style={{fontFamily : Font.MEDIUM, fontSize: 18}}>{uid}</Text>
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 5, alignItems : 'center'}}>
                    <Text style={{fontFamily : Font.MEDIUM, fontSize: 15}}>Order Date</Text>
                    <Text style={{fontFamily : Font.MEDIUM, fontSize: 18}}>{f_created_at}</Text>
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 5, alignItems : 'center'}}>
                    <Text style={{fontFamily : Font.MEDIUM, fontSize: 15}}>Status</Text>
                    <View style={{backgroundColor : get_color(status), paddingLeft : 8, paddingRight : 8, paddingTop: 4, paddingBottom : 4, borderRadius : 3}}>
                        <Text style={{fontFamily : Font.BOLD, fontSize: 15, color : 'white'}}>{status}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default OrderDetails;
