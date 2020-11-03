import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import Layout from '../../common/Layout';
import {save_cart} from '../../redux_store/actions/cartActions';

const updateButtonHeight = 0.08 * Layout.window.height;
class CartSaveButton extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        let {hasChanges, saveButtonLoading} = this.props;


        if (!hasChanges) return null;

        let text = (saveButtonLoading) ? 'Please wait...' : 'Save';
        const Loader = () =>{
            return (saveButtonLoading) ? <ActivityIndicator size={'small'} color={'white'} style={{}}/> : null;
        }


        return (
            <View>
                <View style={{width : '100%'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.saveCart()} style={styles.updateButton}>
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
    return {
        hasChanges : s.hasChanges,
        saveButtonLoading : s.saveButtonLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveCart: () => save_cart(),
    }, dispatch);
};


const styles = StyleSheet.create({
    updateButton : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : Colors.yellow,
        height : updateButtonHeight
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartSaveButton);
