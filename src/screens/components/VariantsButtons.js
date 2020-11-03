import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import {connect} from 'react-redux';
import {setVariant} from '../../redux_store/actions/productActions';


class VariantsButtons extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {products, variantIdx} = this.props;
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap : 'wrap'}}>
                {
                    products.map((item, idx)=>{
                        let selected = (idx === variantIdx);
                        let backgroundColor = (selected) ? 'orange' : 'white';
                        let textColor = (selected) ? 'white' : 'black';
                        let borderColor = (selected) ? 'white' : 'orange';
                        return (
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.set_variant(idx)} key={'vr_' + item.product.id}>
                                <View style={{backgroundColor , padding : 5, margin : 5, borderRadius : 3, borderColor, borderWidth : 1}}>
                                    <Text style={{fontFamily : Font.REGULAR, color : textColor}}>{item.product.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        set_variant: (idx) => setVariant(idx),
    }, dispatch);
};

const mapStateToProps = (state) => {
    const s = state.productReducer;
    return {
        variantIdx : s.variantIdx,
        products : s.product_details,
    };
};


const styles = StyleSheet.create({
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
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

export default connect(mapStateToProps, mapDispatchToProps)(VariantsButtons);
