import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../common/Colors';
import Font from '../../common/Font';
import {chunk_array} from '../../common/array_utils';
import FastImage from 'react-native-fast-image';
import Layout from '../../common/Layout';


let products = []

const scrWidth = Layout.window.width;
const padding = 4;
const imageDimen = scrWidth / 2 - (padding * 2);

class HomeProductsView extends Component {

    constructor(props) {
        super(props);
        products = this.props.data.products;
        products = chunk_array(products, 2);
    }

    render() {
        const {data, navigation} = this.props;

        return (
            <View style={{backgroundColor : 'white', marginTop : 10}}>

                <View style={{marginLeft : 10, paddingTop : 10}}>
                    <Text style={styles.header}>{data.title}</Text>
                </View>

                <View style={{}}>
                {
                    products.map((items, index) => {
                        return (
                            <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : padding}} key={`container_` + index}>
                                {
                                    items.map((item, idx) => {
                                        return <ProductView key={'in_' + index + '_' + idx} product={item.product} navigation={navigation}/>
                                    })
                                }
                            </View>
                        )
                    })
                }
                </View>
            </View>
        );
    }
}

const ProductView = ({product, navigation}) =>{
    let image = product?.f_product_images[0]?.f_path;
    let price = `₹ ${product.price}`;
    let type = `${product.qty_type}`;

    let name = product.name.substr(0, 15).concat('...');

    return (
        <TouchableOpacity style={{}} activeOpacity={0.7} onPress={()=>navigation.navigate('ScreenProductDetail', {product_id : product.id})}>
        <View style={{justifyContent : 'center'}}>
            <View style={{alignItems : 'center'}}>
                <FastImage
                    style={{ width: imageDimen, height: imageDimen, overflow : 'hidden' }}
                    source={{
                        uri: image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
            <View style={{justifyContent : 'center', marginTop : 5, marginLeft : 10}}>
                <View style={{width : scrWidth / 6}}>
                    <CodeSpan code={product.code}/>
                </View>

                <Text style={styles.name} numberOfLines={1}>{name}</Text>

                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.type}>{ '/' + type}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const CodeSpan = ({code}) =>{
    return(
        <View style={{backgroundColor : Colors.primaryDark, padding : 2, borderRadius : 2}}>
            <Text style={{fontFamily : Font.BOLD, color : 'white', fontSize : 12}}>{code}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    header : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 20,
    },
    name : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
    },
    price : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 16,
    },
    type : {
        color : Colors.secondaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 12
    }
});

export default HomeProductsView;
