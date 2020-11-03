import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FONT from '../../common/Font';
import Colors from '../../common/Colors';
import {fetch_cart} from '../../redux_store/actions/cartActions';

const notification = {
    w : 16,
    h : 16,
}

const notiRadius = notification.w  / 2;

class CustomHeader extends React.Component{

    constructor(props){
        super(props);
        this.props.syncCart();
    }

    componentDidMount(): void {

    }

    navigateTo(scrName){
        const {navigation} = this.props;
        navigation.navigate(scrName);
    }


    render(){
        return (
            <View>
                <TouchableOpacity activeOpacity={0.7} style={{marginRight : 10}} onPress={()=>this.navigateTo('ScreenCart')}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding : 10, flexDirection : 'row' }}>
                        <View style={{flexDirection : 'column', justifyContent:  'center', alignItems:  'center'}}>
                            <MaterialIcons name={"shopping-cart"} size={24} color={'white'}/>
                            <Text style={{fontFamily : FONT.MEDIUM, color : 'white', fontSize: 10}}>Cart</Text>
                        </View>
                        <View style={styles.notificationContainer}>
                            <Text style={{fontFamily : FONT.MEDIUM, color : 'white', fontSize: 10}}>{this.props.count}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.cartReducer;
    return {
        count : s.cart.length
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        syncCart: () => fetch_cart(),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    },
    notificationContainer:{
        top : 1,
        left : 25,
        position : 'absolute',
        backgroundColor : Colors.error,
        width : notification.w,
        height : notification.w,
        borderRadius : notiRadius,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
