import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Colors from '../../common/Colors';
import Font from '../../common/Font';
import Layout from '../../common/Layout';


const scrWidth = Layout.window.width;
const imageWidth = scrWidth / 4;

const itemHeight = 160;
const itemMarginLeft = 10;
const itemWidth = (scrWidth / 4) + (itemMarginLeft / 2);
const imageHeight = itemHeight - 60;

class CategoryItems extends Component {

    constructor(props) {
        super(props);
    }

    goToProducts(id, title){
        this.props.navigation.navigate('ScreenProducts', {id, title});
    }

    render() {
        const {categories, loading} = this.props;

        return (
            <View style={styles.container}>
                <View style={{marginLeft : 10, paddingTop : 10}}>
                    <Text style={styles.header}>{'Category'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        {
                            categories.map((item)=>{
                                const image_path = item.f_image;
                                let name = item.name;
                                return (
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.goToProducts(item.id, item.name)} key={'k_' + item.id}>
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
                                                <Text style={styles.name}>{name}</Text>
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

const mapStateToProps = (state) => {
    const s = state.categoryReducer;
    return {
        loading : s.loading,
        categories : s.categories,
    };
};

const CategoryPlaceHolder = () =>{
    return(
      <View/>
    );
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 14,
    },
    container : {
        backgroundColor : 'white',
        marginTop : 10,
        paddingBottom : 10,
        paddingRight : 10,
        paddingLeft : 10,
    },
    header : {
        color : Colors.primaryTextColor,
        fontFamily : Font.REGULAR,
        fontSize : 20,
    },
    item:{
        flexDirection : 'column',
        width : itemWidth,
        height : itemHeight,
        alignItems : 'center',
        justifyContent : 'space-between'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItems);
