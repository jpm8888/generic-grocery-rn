import React from 'react';
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Font from '../common/Font';
import Colors from '../common/Colors';
import GreenButton from './components/GreenButton';
import Loading from './components/Loading';
import {fetchMoreOrders, fetchPastOrders} from '../redux_store/actions/orderActions';
import ComponentPullDownRefresh from './components/ComponentPullDownRefresh';
import OrderDetails from './components/OrderDetails';


const image = {
    w : 1250 / 3,
    h : 950 / 3,
    src : require('../../assets/no_orders.png'),
    text : 'No orders till now.',
    subText : 'Browse and add new products.',
}

class ScreenOrderHistory extends React.Component{
    _scrollView = React.createRef();
    constructor(props){
        super(props);
        this.props.fetch_past_orders();
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    componentDidMount(): void {

    }

    navigateToHome(){
        const {navigation} = this.props;
        navigation.navigate('ScreenHome');
    }

    navigateToOrderDetails(id){
        const {navigation} = this.props;
        navigation.navigate('ScreenOrderDetails', {id});
    }


    render(){
        const {loading, orders, fetching, total_orders, isRefreshing} = this.props;

        if (loading) return <Loading/>

        if (orders.length === 0){
            return (
                <SafeAreaView style={{flex : 1}}>
                    <ComponentPullDownRefresh backgroundColor={'white'}/>
                    <ScrollView style={{flex : 1, backgroundColor : 'white'}}
                                refreshControl={
                                    <RefreshControl refreshing={isRefreshing} onRefresh={()=>this.props.fetch_past_orders()} />
                                }>
                        <View style={{alignItems : 'center', justifyContent : 'center', flex : 1}}>
                            <Image source={image.src} style={{width : image.w, height : image.h}} resizeMode={'contain'}/>
                            <Text style={{fontFamily : Font.MEDIUM, fontSize: 20, marginTop : 10}}>{image.text}</Text>
                            <Text style={{fontFamily : Font.REGULAR, fontSize: 14, color : Colors.secondaryTextColor, marginTop : 10}}>{image.subText}</Text>
                            <GreenButton text={'Shop now'} onPress={()=>this.navigateToHome()}/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }

        return (
                <SafeAreaView style={{flex : 1}}>
                    <ComponentPullDownRefresh/>
                    <ScrollView style={{flex : 1, backgroundColor : Colors.background}}
                                ref={(ref) => this._scrollView = ref}
                                refreshControl={
                                    <RefreshControl refreshing={isRefreshing} onRefresh={()=>this.props.fetch_past_orders()} />
                                }
                                onScroll={({nativeEvent}) => {
                                    if (this.isCloseToBottom(nativeEvent) && !this.props.fetching) {
                                        if (total_orders > 0 && total_orders > orders.length){
                                            this.props.fetch_more_orders();
                                        }
                                    }}}
                                scrollEventThrottle={400}>
                        {
                            orders.map(item=>{
                              return <OrderItem item={item} key={'order_item_' + item.id} onPress={()=>this.navigateToOrderDetails(item.id)}/>
                            })
                        }

                        <LoadingView fetching={fetching}/>
                    </ScrollView>
                </SafeAreaView>
        );
    }

}

export function get_color(status) {
    switch (status) {
        case 'pending':
            return Colors.yellow;
        case 'fulfilled':
            return Colors.primaryDark;
        case 'cancelled':
            return Colors.error;
        case 'rejected':
            return Colors.error;
    }
    return 'black';
}

const OrderItem = (props) =>{
    let {uid, status, f_created_at} = props.item;
    let color = get_color(status);

    return (
        <View style={{padding : 5, borderBottomWidth : 0.5, margin : 5}}>
            <OrderDetails uid={uid} f_created_at={f_created_at} status={status}/>

            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                <View/>
                <TouchableOpacity activeOpacity={0.7} style={{paddingTop : 10, paddingBottom : 10}} onPress={props.onPress}>
                    <Text style={{color : '#147EFB', fontFamily : Font.MEDIUM}}>more details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const LoadingView = ({fetching}) =>{
    if (!fetching) return null;
    return (
        <View style={{width : '100%', backgroundColor : Colors.orange, justifyContent : 'center', alignItems : 'center', padding : 10, flexDirection : 'row'}}>
            <ActivityIndicator size={'small'} color={'white'} style={{marginRight : 10}}/>
            <Text style={{fontFamily : Font.MEDIUM, color : 'white'}}>{'Loading more orders...'}</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    const s = state.orderReducer;
    return {
        loading : s.isFetchingPastOrders,
        orders : s.pastOrders,
        fetching : s.isFetchingMoreOrders,
        total_orders : s.total_orders,
        isRefreshing : s.isRefreshing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetch_past_orders: () => fetchPastOrders(),
        fetch_more_orders: () => fetchMoreOrders(),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOrderHistory);
