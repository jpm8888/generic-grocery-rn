import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Colors from '../../common/Colors';
import Font from '../../common/Font';
import Layout from '../../common/Layout';
import FastImage from 'react-native-fast-image';


const scrWidth = Layout.window.width;
const padding = 1;
const cardWidth = (scrWidth / 2) - (padding / 2);
const imageWidth = cardWidth - (padding * 2);
const codeWidth = cardWidth / 2;

class ProductThumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props;
        const liked = (data.liked === 1);
        const heartIcon = (liked) ? 'heart' : 'hearto';
        const heartColor = (liked) ? Colors.error : Colors.secondaryTextColor;


        let productName = data.name;
        let price = `₹ ${data.price}`;
        let type = `${data.qty_type}`;
        let image_path = data.image_path;

        let code = `Code : ${data.code}`;

        return (
            <View style={{width : cardWidth, justifyContent : 'center', padding}}>
                <View style={{backgroundColor : 'white'}}>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', margin :5}}>
                        <View style={{backgroundColor : Colors.span_gray, borderRadius : 2, paddingLeft : 10, paddingRight : 10, justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={{fontFamily : Font.REGULAR, color : Colors.secondaryTextColor}}>{type}</Text>
                        </View>
                        {/*<View>*/}
                        {/*    <AntDesign name={heartIcon} size={20} color={heartColor}/>*/}
                        {/*</View>*/}
                    </View>

                    <View>
                        <FastImage
                            style={{ width: imageWidth, height: 200, overflow : 'hidden' }}
                            source={{
                                uri: image_path,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>

                    <View style={{justifyContent : 'space-between', padding : 5}}>
                        <CodeSpan code={code}/>
                        <Text style={{fontFamily : Font.REGULAR, color : Colors.primaryTextColor, fontSize : 12}} numberOfLines={2}>{productName}</Text>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Text style={{fontFamily : Font.BOLD, color : Colors.primaryTextColor, fontSize : 14}}>{price}</Text>
                            <Text style={{fontFamily : Font.REGULAR, color : Colors.secondaryTextColor, fontSize : 10}}>{' / ' + type}</Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const CodeSpan = ({code}) =>{
    return(
        <View style={{backgroundColor : Colors.primaryDark, justifyContent : 'center', padding : 3, borderRadius : 3, width : codeWidth, alignItems : 'center'}}>
            <Text style={{fontFamily : Font.MEDIUM, color : 'white', fontSize : 10}}>{code}</Text>
        </View>
    );
}

export default ProductThumb;
