import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../common/Font';
import Colors from '../common/Colors';
import GreenButton from './components/GreenButton';


const image = {
    w : 1143 / 3,
    h : 909 / 3,
    src : require('../../assets/order_success.png')
}

class ScreenOrderConfirmed extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        const { order_id } = this.props.route.params;
        const text = 'Thanks, your order has been confirmed.'
        const subText = `Order Num : ${order_id}`

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : 'white'}}>
                <View style={{alignItems : 'center', justifyContent : 'center'}}>
                    <Image source={image.src} style={{width : image.w, height : image.h}} resizeMode={'contain'}/>
                    <Text style={{fontFamily : Font.MEDIUM, fontSize: 20, marginTop : 10}}>{text}</Text>
                    <Text style={{fontFamily : Font.REGULAR, fontSize: 14, color : Colors.secondaryTextColor, marginTop : 10}}>{subText}</Text>
                    <GreenButton text={'Browse'} onPress={()=>this.props.navigation.navigate('ScreenHome')}/>
                </View>
            </View>
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
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOrderConfirmed);
