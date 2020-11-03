import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../common/Font';
import Colors from '../common/Colors';
import GreenButton from './components/GreenButton';
import CartItem from './components/CartItem';
import CartSaveButton from './components/CartSaveButton';
import CartBuyButton from './components/CartBuyButton';


const image = {
    w : 1136 / 3,
    h : 908 / 3,
    src : require('../../assets/bag_empty.png')
}



class ScreenCart extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {
        // let cd = moment().format('YYYY:MM::DD_HH:mm:ss').toString();
        // console.log('home-->' + cd);
    }


    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return (nextProps.updated_at !== this.props.updated_at);
        // console.log('render-->' + render);
        // return render;
    }


    navigateToHome(){
        const {navigation} = this.props;
        navigation.navigate('ScreenHome');
    }

    render(){
        const {cart} = this.props;
        const cartLen = cart.length;

        const text = "Your cart is empty!";
        const subText = "Add items to it now";

        if (cartLen === 0){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : 'white' }}>
                    <View style={{alignItems : 'center', justifyContent : 'center'}}>
                        <Image source={image.src} style={{width : image.w, height : image.h}} resizeMode={'contain'}/>
                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 20, marginTop : 10}}>{text}</Text>
                        <Text style={{fontFamily : Font.REGULAR, fontSize: 14, color : Colors.secondaryTextColor, marginTop : 10}}>{subText}</Text>
                        <GreenButton text={'Shop now'} onPress={()=>this.navigateToHome()}/>
                    </View>
                </View>
            );
        }

        return (
            <View style={{flex : 1}}>
                <ScrollView>
                    {
                        cart.map((item, idx)=>{
                            return <CartItem item={item} key={'cart_' + idx}/>
                        })
                    }
                </ScrollView>

                <CartSaveButton/>
                <CartBuyButton nav={this.props.navigation}/>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.cartReducer;
    return {
        cart : s.cart,
        updated_at : s.updated_at,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCart);
