import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from './components/Loading';
import Font from '../common/Font';
import Colors from '../common/Colors';
import GreenButton from './components/GreenButton';
import {fetchAddress, select} from '../redux_store/actions/addressActions';
import CardView from 'react-native-cardview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlaceOrderButton from './components/PlaceOrderButton';


const image = {
    w : 512 / 2,
    h : 512 / 2,
    src : require('../../assets/address.png')
}


class ScreenAddressBook extends React.Component{

    constructor(props){
        super(props);
        this.props.fetch_addresses();
    }

    componentDidMount(): void {

    }


    render(){
        const {loading, addresses, selectedId} = this.props;

        if (loading){
            return (
                <Loading />
            )
        }

        const text = "Your address list is empty!";
        const subText = "Add new address to it now";

        if (addresses.length === 0){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{alignItems : 'center', justifyContent : 'center'}}>
                        <Image source={image.src} style={{width : image.w, height : image.h}} resizeMode={'contain'}/>
                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 20, marginTop : 10}}>{text}</Text>
                        <Text style={{fontFamily : Font.REGULAR, fontSize: 14, color : Colors.secondaryTextColor, marginTop : 10}}>{subText}</Text>
                        <GreenButton text={'Add Address'} onPress={()=>this.props.navigation.navigate('ScreenAddressCreate')}/>
                    </View>
                </View>
            );
        }


        return (
            <View style={{flex : 1}}>
                <ScrollView style={{backgroundColor : Colors.background, marginBottom : 10}}>
                    {
                        addresses.map(item=>{
                            return <AddressView item={item} key={'add_' + item.id} onPress={()=>this.props.select(item.id)} selected={selectedId === item.id}/>
                        })
                    }
                </ScrollView>

                <PlaceOrderButton nav={this.props.navigation}/>
            </View>
        );
    }

}


const AddressView = (props)=>{
    let {name, line_1, line_2, state, pin_code, mobile, landmark} = props.item;
    let {selected} = props;
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <CardView style={{padding : 10, backgroundColor : 'white', margin : 5}} cardElevation={2} cardMaxElevation={2} cornerRadius={1}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={{fontFamily: Font.BOLD, fontSize: 25}}>{name}</Text>
                    {
                        selected ? <AntDesign size={24} name={'checkcircle'} color={Colors.primaryDark}/> : <></>
                    }

                </View>

                <Text style={styles.subtext}>{mobile}</Text>
                <Text style={styles.subtext}>{line_1 + ','}</Text>
                <Text style={styles.subtext}>{line_2 + ','}</Text>
                <Text style={styles.subtext}>{state.toUpperCase()}</Text>
                <Text style={styles.subtext}>{pin_code}</Text>
                <Text style={styles.subtext}>{'Landmark: ' + landmark}</Text>
            </CardView>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state) => {
    const s = state.addressReducer;
    return {
        addresses : s.addresses,
        loading : s.loading,
        selectedId : s.selectedId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetch_addresses : () => fetchAddress(),
        select : (id) => select(id),
    }, dispatch);
};


const styles = StyleSheet.create({
    subtext : {
        fontSize: 15,
        fontFamily: Font.REGULAR
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenAddressBook);
