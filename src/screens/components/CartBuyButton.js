import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import Layout from '../../common/Layout';

const buttonHeight = 0.08 * Layout.window.height;
const totalAmountWidth = Layout.window.width;
class CartBuyButton extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        let {hasChanges, buyButtonLoading, nav} = this.props;


        if (hasChanges) return null;

        let text = (buyButtonLoading) ? 'Please wait...' : 'Continue';
        const Loader = () =>{
            return (buyButtonLoading) ? <ActivityIndicator size={'small'} color={'white'} style={{}}/> : null;
        }


        const {total} = this.props;


        return (
            <View>
                <View style={styles.amountBox}>
                    <Text style={styles.amountText}>{`Total Amount : ₹ ${total}`}</Text>
                </View>
                <View style={{width : '100%'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>nav.navigate('ScreenAddressBook')} style={styles.button}>
                        <Loader/>
                        <Text style={{fontFamily : Font.MEDIUM, color : 'white', fontSize: 20, marginLeft : 10}}>{text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.cartReducer;

    let {cart} = s;
    let total = 0;
    cart.map((item)=>{
        let {qty} = item;
        let {price} = item.product;
        total += parseFloat(qty) * parseFloat(price);
    });


    return {
        hasChanges : s.hasChanges,
        buyButtonLoading : s.buyButtonLoading,
        total : total,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // saveCart: () => save_cart(),
    }, dispatch);
};


const styles = StyleSheet.create({
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : Colors.primaryDark,
        height : buttonHeight
    },
    amountBox : {
        backgroundColor: Colors.orange,
        width : totalAmountWidth,
        padding : 5, borderTopEndRadius : 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    amountText : {
        fontFamily : Font.BOLD,
        fontSize : 20,
        color : 'white'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartBuyButton);
