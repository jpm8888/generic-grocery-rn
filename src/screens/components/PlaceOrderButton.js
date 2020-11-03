import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../../common/Font';
import Colors from '../../common/Colors';
import Layout from '../../common/Layout';
import {placeOrder} from '../../redux_store/actions/orderActions';

const buttonHeight = 0.08 * Layout.window.height;

class PlaceOrderButton extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        let {selectedId, placeOrderLoading, nav} = this.props;


        if (selectedId === 0) return null;

        let text = 'Place Order';
        const Loader = () =>{
            return (placeOrderLoading) ? <ActivityIndicator size={'small'} color={'white'} style={{}}/> : null;
        }


        return (
            <View>
                <View style={{width : '100%'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.place(nav)} style={styles.button}>
                        <Loader/>
                        <Text style={{fontFamily : Font.MEDIUM, color : 'white', fontSize: 20, marginLeft : 10}}>{text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.addressReducer;
    return {
        placeOrderLoading : s.placeOrderLoading,
        selectedId : s.selectedId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        place : (nav) => placeOrder(nav),
    }, dispatch);
};


const styles = StyleSheet.create({
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        backgroundColor : Colors.primaryDark,
        height : buttonHeight
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderButton);
