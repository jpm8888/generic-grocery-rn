import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import RedButton from './RedButton';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {decrement_qty, delete_from_cart, increment_qty} from '../../redux_store/actions/cartActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Layout from '../../common/Layout';


const scrWidth = Layout.window.width;
const codeWidth = scrWidth / 3;

class CartItem extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return (nextProps.updated_at !== this.props.updated_at);
    }

    render(){
        const {item, deleteButtonLoading} = this.props;
        const {product} = item;
        let price = `₹ ${product.price}`;
        let type = `${product.qty_type}`;
        let qty = item.qty;
        let id = product.id;
        let code = `Code : ${product.code}`;

        const {f_product_images} = product;
        let image_path = null;
        if (f_product_images.length > 0){
            image_path = f_product_images[0].f_path;
        }

        const outerShade = '#78909C';
        const innerShade = "#EEEEEE";

        const product_price = parseFloat(product.price);
        const total = parseFloat(qty) * product_price;


        return (
            <View style={{margin : 10}}>
                <View style={{flexDirection : 'row'}}>
                    <FastImage
                        style={{ width: 100, height: 100, overflow : 'hidden'}}
                        source={{uri: image_path, priority: FastImage.priority.normal}}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                    <View style={{justifyContent : 'center', flex : 1, marginLeft : 10}}>
                        <CodeSpan code={code}/>
                        <Text style={{fontFamily : Font.BOLD, color : Colors.primaryTextColor, fontSize: 20,}}>{product.name}</Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Text style={{fontFamily : Font.REGULAR, color : Colors.primaryTextColor, fontSize : 20}}>{price}</Text>
                            <Text style={{fontFamily : Font.REGULAR, color : Colors.secondaryTextColor, fontSize : 10}}>{' / ' + type}</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily: Font.BOLD, fontSize: 15, color : Colors.orange}}>{`Total (₹): ${total}`}</Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                    <View style={{flexDirection : 'row', justifyContent : 'center', borderWidth : 1, borderColor : outerShade, borderRadius : 3}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.decrementQty(id)}>
                            <LinearGradient colors={[outerShade, innerShade, outerShade]} style={{width : 25, height : 25, justifyContent : 'center', alignItems : 'center'}}>
                                <AntDesign name={"minus"} color={'#37474F'} size={16}/>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{justifyContent : 'center', alignItems : 'center', width : 50}}>
                            <Text style={styles.text}>{qty}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.incrementQty(id)}>
                            <LinearGradient colors={[outerShade, innerShade, outerShade]} style={{width : 25, height : 25, justifyContent : 'center', alignItems : 'center'}}>
                                <MaterialIcons name={"add"} color={'#37474F'} size={16}/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>


                    <RedButton loading={deleteButtonLoading} text={'Delete'} marginTop={0.01} onPress={()=>this.props.deleteItem(id)}/>
                </View>

                <View style={{borderBottomWidth : 1, marginTop : 10, borderBottomColor : Colors.span_gray}}/>

            </View>
        );
    }

}

const CodeSpan = ({code}) =>{
    return(
        <View style={{backgroundColor : Colors.primaryDark, justifyContent : 'center', padding : 3, borderRadius : 10, width : codeWidth, alignItems : 'center'}}>
            <Text style={{fontFamily : Font.BOLD, color : 'white', fontSize : 14}}>{code}</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    const s = state.cartReducer;
    return {
        updated_at: s.updated_at,
        deleteButtonLoading: s.deleteButtonLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteItem: (id) => delete_from_cart(id),
        incrementQty : (id) => increment_qty(id),
        decrementQty : (id) => decrement_qty(id),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        fontFamily : Font.MEDIUM,
        fontSize : 16,
        color : Colors.secondaryTextColor,
        width : '100%',
        textAlign : 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
