import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {cancelOrder, fetchOrderDetails} from '../redux_store/actions/orderActions';
import Loading from './components/Loading';
import Font from '../common/Font';
import Colors from '../common/Colors';
import OrderDetails from './components/OrderDetails';
import FastImage from 'react-native-fast-image';
import RedButton from './components/RedButton';


const image = {
    w : 879 / 3,
    h : 939 / 3,
    src : require('../../assets/wrong.png'),
    text : 'Something went wrong.',
    subText : 'Try Again.',
}

class ScreenOrderDetails extends React.Component{

    constructor(props){
        super(props);
        const { id } = props.route.params;
        this.props.fetch_order_details(id);
    }

    componentDidMount(): void {

    }


    render(){
        const {loading, order, isCancelling} = this.props;
        const { id } = this.props.route.params;

        if (loading) return <Loading/>

        if (!order){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : 'white' }}>
                    <View style={{alignItems : 'center', justifyContent : 'center'}}>
                        <Image source={image.src} style={{width : image.w, height : image.h}} resizeMode={'contain'}/>
                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 20, marginTop : 10}}>{image.text}</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.fetch_order_details(id)}>
                            <Text style={{fontFamily : Font.REGULAR, fontSize: 14, color : 'rgb(0, 122, 255)', marginTop : 10}}>{image.subText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }


        const {uid, status, f_created_at, items, total} = order;

        return (
            <View style={{flex : 1, backgroundColor : Colors.background}}>
            <ScrollView style={{ flex: 1, backgroundColor : Colors.background}}>
                <View style={{borderBottomWidth : 0.5, margin : 5, borderBottomColor : 'gray'}}>
                    <OrderDetails uid={uid} f_created_at={f_created_at} status={status}/>
                </View>
                {
                    items.map((item, idx)=>{
                        const {qty, product} = item;
                        const {code, name, price, f_product_images} = product;
                        const {f_path} = f_product_images[0];

                        return (
                            <View style={{borderBottomWidth : 0.5, margin : 5, flexDirection : 'row', alignItems : 'center', borderBottomColor : 'gray'}} key={'it_' + idx}>

                                <View style={{alignItems : 'center'}}>
                                    <FastImage
                                        style={{ width: 100, height: 100, overflow : 'hidden'}}
                                        source={{uri: f_path, priority: FastImage.priority.normal}}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </View>

                                <View style={{flex : 1}}>
                                    <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : 5}}>
                                        <CodeSpan code={code}/>
                                    </View>
                                    <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : 5}}>
                                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 15, flexShrink: 1}}>{name}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : 5}}>
                                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 15}}>Price</Text>
                                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 18}}>{'₹ ' + price}</Text>
                                    </View>
                                    <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : 5}}>
                                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 15}}>Quantity</Text>
                                        <Text style={{fontFamily : Font.MEDIUM, fontSize: 18}}>{qty}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }

                <View style={{justifyContent : 'space-between', alignItems : 'center', flexDirection: 'row', padding : 10 }}>
                    <Text style={{fontFamily : Font.BOLD, color : Colors.primaryTextColor, fontSize: 20}}>{'Total'}</Text>
                    <Text style={{fontFamily : Font.BOLD, color : Colors.orange, fontSize: 25}}>{`₹ ${total}`}</Text>
                </View>
            </ScrollView>
                {
                    (status === 'pending') ?
                        <View style={{justifyContent : 'space-between', alignItems : 'center', margin : 10, flexDirection : 'row'}}>
                            <View/>
                            <RedButton text={'Cancel Order'} loading={isCancelling} onPress={()=>this.props.cancel_order(id)}/>
                        </View>

                        :

                        <View/>
                }
            </View>
        );
    }

}

const CodeSpan = ({code}) =>{
    return(
        <View style={{backgroundColor : Colors.primaryDark, justifyContent : 'center', padding : 3, borderRadius : 5, width : 100, alignItems : 'center'}}>
            <Text style={{fontFamily : Font.MEDIUM, fontSize: 15, color : 'white'}}>{code}</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    const s = state.orderReducer;
    return {
        loading : s.isFetchingOrderDetails,
        order : s.orderDetails,
        isCancelling : s.isCancelling,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetch_order_details: (id) => fetchOrderDetails(id),
        cancel_order: (id) => cancelOrder(id),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOrderDetails);
