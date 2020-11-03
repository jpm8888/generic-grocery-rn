import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetch_product_details} from '../redux_store/actions/productActions';
import Loading from './components/Loading';
import FastImage from 'react-native-fast-image';
import Layout from '../common/Layout';
import Colors from '../common/Colors';
import Font from '../common/Font';
import AddToCartButton from './components/AddToCartButton';
import {get_recents_from_db} from '../redux_store/actions/homeActions';
import VariantsButtons from './components/VariantsButtons';

const scrWidth = Layout.window.width;
const scrHeight = Layout.window.height;

const imageWidth = scrWidth;

const addToCartViewHeight = scrHeight * 0.08;
const codeWidth = scrWidth / 2;

class ScreenProductDetail extends React.Component{

    constructor(props){
        super(props);
        const {navigation} = props;
        const { product_id } = props.route.params;
        this.props.fetchProductDetails(product_id);
        this.props.refreshRecent();
    }

    componentDidMount(): void {

    }


    render(){
        const {products, productDetailsFetching, variantIdx} = this.props;
        if (products.length === 0 || productDetailsFetching) return <Loading/>


        const data = products[variantIdx];

        const {image_path} = data.image;
        const {product} = data;

        let productName = product.name;
        let price = `₹ ${product.price}`;
        let type = `${product.qty_type}`;
        let code = `Code : ${product.code}`;
        let {description} = product;
        let {min_qty} = product;

        const liked = (product.liked === 1);
        const heartIcon = (liked) ? 'heart' : 'hearto';
        const heartColor = (liked) ? Colors.error : Colors.secondaryTextColor;

        const minQtyText = min_qty + " " + type + ((min_qty > 1) ? 's' : '');

        return (
            <View style={{flex : 1, backgroundColor : 'white'}}>
                <ScrollView style={{flex : 1}}>
                    <View style={{backgroundColor : 'white'}}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', margin :5}}>
                            <View style={{backgroundColor : Colors.span_gray, borderRadius : 2, paddingLeft : 10, paddingRight : 10, justifyContent : 'center', alignItems : 'center'}}>
                                <Text style={{fontFamily : Font.REGULAR, color : Colors.secondaryTextColor}}>{type}</Text>
                            </View>
                            {/*<View>*/}
                            {/*    <AntDesign name={heartIcon} size={20} color={heartColor}/>*/}
                            {/*</View>*/}
                        </View>

                        <FastImage
                            style={{ width: imageWidth, height: 300, overflow : 'hidden'}}
                            source={{
                                uri: image_path,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />

                        <CodeSpan code={code}/>

                        <View style={{justifyContent : 'space-between', padding : 5, marginLeft  : 10}}>
                            <Text style={{fontFamily : Font.REGULAR, color : Colors.primaryTextColor}}>{productName}</Text>
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <Text style={{fontFamily : Font.BOLD, color : Colors.primaryTextColor, fontSize : 20}}>{price}</Text>
                                <Text style={{fontFamily : Font.REGULAR, color : Colors.secondaryTextColor, fontSize : 10}}>{' / ' + type}</Text>
                            </View>
                        </View>

                        <View style={{justifyContent : 'space-between', padding : 5, marginLeft  : 10}}>
                            <View>
                                <Text style={{fontFamily : Font.BOLD, color : Colors.primaryTextColor}}>{'Suitable for : '}</Text>
                                <Text style={{fontFamily : Font.REGULAR, color : Colors.secondaryTextColor}}>{description}</Text>
                            </View>

                            <View style={{flexDirection : 'row', marginTop : 10}}>
                                <Text style={{fontFamily : Font.BOLD, color : Colors.primaryTextColor}}>{'Minimum Quantity : '}</Text>
                                <Text style={{fontFamily : Font.MEDIUM, color : Colors.secondaryTextColor}}>{minQtyText}</Text>
                            </View>
                        </View>
                    </View>

                    <VariantsButtons/>

                </ScrollView>

                <AddToCartButton/>
            </View>
        );
    }

}

const CodeSpan = ({code}) =>{
    return(
        <View style={{backgroundColor : Colors.primaryDark, justifyContent : 'center', padding : 3, width : codeWidth, borderRadius : 5, alignItems : 'center', margin : 10}}>
            <Text style={{fontFamily : Font.BOLD, color : 'white', fontSize : 16}}>{code}</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    const s = state.productReducer;
    return {
        products : s.product_details,
        variantIdx : s.variantIdx,
        productDetailsFetching : s.productDetailsFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchProductDetails: (id) => fetch_product_details(id),
        refreshRecent: (id) => get_recents_from_db(),
    }, dispatch);
};


const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProductDetail);
