import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CardView from 'react-native-cardview';
import Font from '../../common/Font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const tractor_icon = require('../../../assets/tractor_icon.png');
class CategoryItem extends Component {
    constructor(props) {
        super(props);
    }

    toScreen(){
        const {navigation, data} = this.props;
        navigation.navigate('ScreenProducts', {id : data.id, title : data.name});
    };

    render() {
        const {navigation, data} = this.props;

        return (
            <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => this.toScreen()}>
                <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5} style={{backgroundColor : 'white'}}>
                    <View style={{flexDirection : 'row', alignItems : 'center', padding: 5, justifyContent : 'space-between'}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Image source={tractor_icon} resizeMode={'contain'} style={{width : 522 / 10, height : 522 / 10}}/>
                            <Text style={styles.category_title}>{data.name}</Text>
                        </View>
                        <View>
                            <MaterialIcons name={'navigate-next'} size={24}/>
                        </View>
                    </View>

                </CardView>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginLeft : 10,
        marginRight : 10,
        marginTop : 10
    },
    category_title : {
        fontFamily : Font.REGULAR,
        marginLeft : 10
    }
});

export default CategoryItem;
