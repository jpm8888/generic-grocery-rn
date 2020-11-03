import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import Layout from '../../common/Layout';
import {add_to_cart} from '../../redux_store/actions/cartActions';
import Toast from 'react-native-simple-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const buttonHeight = 35;
const buttonWidth = 0.5 * Layout.window.width;
class AddToCartButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            qty : 0,
        };
    }

    componentDidMount(): void {

    }

    increment(){
        const {qty} = this.state;
        const {productDetails, variantIdx} = this.props;
        const {product} = productDetails[variantIdx];
        let new_qty = qty + product.min_qty;
        this.setState({qty : new_qty});
    }

    decrement(){
        const {qty} = this.state;
        const {productDetails, variantIdx} = this.props;
        const {product} = productDetails[variantIdx];
        if (qty === 0) return;

        let new_qty = qty - product.min_qty;
        this.setState({qty : new_qty});
    }

    add(){
        const {qty} = this.state;

        if (qty === 0){
            Toast.show('quantity is 0');
            return;
        }

        const {productDetails, variantIdx} = this.props;
        const {product} = productDetails[variantIdx];
        this.props.addToCart(product.id, qty);
        this.setState({qty : 0})
    }


    render(){
        let {addCartButtonLoading} = this.props;

        let text = (addCartButtonLoading) ? 'Please wait...' : 'Add to cart';
        const Loader = () =>{
            return (addCartButtonLoading) ? <ActivityIndicator size={'small'} color={'white'} style={{}}/> : null;
        }

        const outerShade = '#78909C';
        const innerShade = "#EEEEEE";
        const wh_btn = 30;


        return (
            <View style={{justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', backgroundColor : 'white', marginBottom : 20}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.decrement()}>
                        <View style={{width : wh_btn, height : wh_btn, justifyContent : 'center', alignItems : 'center', backgroundColor: '#ededed'}}>
                            <AntDesign name={"minus"} color={'#37474F'} size={24}/>
                        </View>
                    </TouchableOpacity>

                    <View style={{marginLeft : 20, marginRight : 20, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={styles.text}>{this.state.qty}</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.increment()}>
                        <View style={{width : wh_btn, height : wh_btn, justifyContent : 'center', alignItems : 'center', backgroundColor: '#ededed'}}>
                            <MaterialIcons name={"add"} color={'#37474F'} size={24}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{margin : 10, borderRadius : 5, backgroundColor: '#e6375e', width : buttonWidth, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.add()} style={styles.button}>
                        <Loader/>
                        <Text style={{fontFamily : Font.REGULAR, color : 'white', fontSize: 15, marginLeft : 10}}>{text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.cartReducer;
    return {
        addCartButtonLoading : s.addCartButtonLoading,
        productDetails : state.productReducer.product_details,
        variantIdx : state.productReducer.variantIdx,
        cart : state.cartReducer.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addToCart: (product_id, qty) => add_to_cart(product_id, qty),
    }, dispatch);
};


const styles = StyleSheet.create({
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        height : buttonHeight
    },
    textButton : {
        fontFamily : Font.BOLD,
        fontSize : 20,
    },
    text : {
        fontFamily : Font.MEDIUM,
        fontSize : 20,
        color : Colors.secondaryTextColor,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
