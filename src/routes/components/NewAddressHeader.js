import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Font from '../../common/Font';
import {saveAddress} from '../../redux_store/actions/addressActions';

class NewAddressHeader extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {loading} = this.props;

        if (loading){
            return (
                <ActivityIndicator size={'small'} color={'white'} style={{marginRight : 10}}/>
            )
        }

        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.save(this.props.navigation)} style={{marginRight : 10, alignItems : 'center', justifyContent : 'center'}}>
                <AntDesign size={24} name={'check'} color={'white'}/>
                <Text style={{fontFamily : Font.REGULAR, fontSize: 10, color : 'white'}}>Done</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    const s = state.addressReducer;
    return {
        loading : s.saveAddressLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        save: (nav) => saveAddress(nav),
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

export default connect(mapStateToProps, mapDispatchToProps)(NewAddressHeader);
