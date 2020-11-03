import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Font from '../../common/Font';

class AddressHeader extends Component {

    constructor(props) {
        super(props);
    }


    navigateTo(scrName){
        const {navigation} = this.props;
        navigation.navigate(scrName);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>this.navigateTo('ScreenAddressCreate')} style={{marginRight : 10, alignItems : 'center', justifyContent : 'center'}}>
                <AntDesign size={24} name={'plus'} color={'white'}/>
                <Text style={{fontFamily : Font.REGULAR, fontSize: 10, color : 'white'}}>Add</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    const s = state.cartReducer;
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    },
    notificationContainer:{

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressHeader);
