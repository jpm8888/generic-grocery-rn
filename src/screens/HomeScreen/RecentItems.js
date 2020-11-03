import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import FastImage from 'react-native-fast-image';
import Layout from '../../common/Layout';

const scrWidth = Layout.window.width;
const imageWidth = scrWidth / 4;

const itemHeight = 160;
const itemMarginLeft = 10;
const itemWidth = (scrWidth / 4) + (itemMarginLeft / 2);
const imageHeight = itemHeight - 60;


export default class RecentItems extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    goToProduct(id){
        this.props.navigation.navigate('ScreenProductDetail', {product_id : id});
    }


    render(){
        const {items, loading, header, navigation} = this.props;
        if (items.length === 0) return null;

        if (loading){

        }

        return (
            <View style={styles.container}>
                <View style={{marginLeft : 10, paddingTop : 10}}>
                    <Text style={styles.header}>{header}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                    {
                        items.map((item)=>{
                            const {image_path} = item;
                            let name = item.name.substr(0, 10).concat('...');
                            let code = `Code : ${item.code}`;
                            let price = `₹ ${item.price}`;
                            let type = `${item.qty_type}`;
                            return (
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>this.goToProduct(item.id)} key={'k_' + item.id}>
                                    <View style={styles.item}>
                                        <FastImage
                                            style={{ width: imageWidth, height: imageHeight}}
                                            source={{
                                                uri: image_path,
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />

                                        <View style={{justifyContent : 'center', marginTop : 5}}>
                                            <CodeSpan code={code}/>

                                            <Text style={styles.name} numberOfLines={1}>{name}</Text>

                                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                <Text style={styles.price}>{price}</Text>
                                                <Text style={styles.type}>{ '/' + type}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const CodeSpan = ({code}) =>{
    return(
        <View style={{backgroundColor : Colors.primaryDark, padding : 2, borderRadius : 2}}>
            <Text style={{fontFamily : Font.BOLD, color : 'white', fontSize : 10}}>{code}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    text : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 14,
    },
    container : {
        backgroundColor : 'white',
        marginTop : 10,
    },
    header : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 20,
    },
    item:{
        marginLeft : 5,
        flexDirection : 'column',
        width : itemWidth,
        height : itemHeight,
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    type : {
        color : Colors.secondaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 12
    },
    price : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 16,
    },
});

