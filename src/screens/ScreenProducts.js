import React from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import ProductThumb from './components/ProductThumb';
import {chunk_array} from '../common/array_utils';
import Loading from './components/Loading';
import NoProduct from './components/NoProduct';
import {fetch_more_products, fetch_products} from '../redux_store/actions/productActions';
import Font from '../common/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';


class ScreenProducts extends React.Component{
    _scrollView = React.createRef();
    constructor(props){
        super(props);
        const {navigation} = props;
        const { id, title } = props.route.params;
        //navigation.setOptions({title});

        this.props.fetchProducts(id);
    }

    componentDidMount(): void {

    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    product_clicked(product_id){
        const {navigation, data} = this.props;
        navigation.navigate('ScreenProductDetail', {product_id});
    }


    render(){
        const {loading, chunks, navigation, fetching} = this.props;
        const { id } = this.props.route.params; //category_id


        if (loading) return <Loading/>
        if (chunks.length === 0) return <NoProduct/>

        return (
            <SafeAreaView style={{flex : 1}}>
                <ScrollView style={{flex : 1, backgroundColor : Colors.background}}
                            ref={(ref) => this._scrollView = ref}
                            onScroll={({nativeEvent}) => {
                                if (this.isCloseToBottom(nativeEvent) && !this.props.fetching) {
                                    this.props.fetchMoreProducts(id);
                                }}}
                            scrollEventThrottle={400}
                >

                    <SearchBox navigation={this.props.navigation} category_id={id}/>

                    <View style={{marginBottom : 10}}>
                    {
                        chunks.map((items, idx)=>{
                            return (
                                <View key={`container_${idx}`} style={{flexDirection : 'row'}}>
                                    {
                                        items.map((item)=>{
                                            return (
                                                    <TouchableOpacity activeOpacity={0.7} key={`in_${item.id}`} onPress={()=>this.product_clicked(item.id)}>
                                                        <ProductThumb data={item} navigation={navigation}/>
                                                    </TouchableOpacity>
                                                )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                    </View>
                    <LoadingView fetching={fetching}/>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const SearchBox = (props) =>{
    let {category_id} = props;
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>props.navigation.navigate('ScreenSearch', {category_id})} style={{margin : 10, borderRadius : 5, borderColor : 'gray', borderWidth : 0.5, padding : 5, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', backgroundColor : 'white'}}>
            <AntDesign size={20} name={'search1'} color={'gray'}/>
            <Text style={{width : '90%', color : 'lightgray', fontFamily : Font.REGULAR}}>{'Search Product or Code'}</Text>
        </TouchableOpacity>
    )
}


const LoadingView = ({fetching}) =>{
    if (!fetching) return null;
    return (
        <View style={{width : '100%', backgroundColor : Colors.orange, justifyContent : 'center', alignItems : 'center', padding : 10, flexDirection : 'row'}}>
            <ActivityIndicator size={'small'} color={'white'} style={{marginRight : 10}}/>
            <Text style={{fontFamily : Font.MEDIUM, color : 'white'}}>{'Loading more products...'}</Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    const s = state.productReducer;
    let {products} = s;
    let chunks = (products.length > 0) ? chunk_array(products, 2) : [];
    return {
        loading : s.loading,
        fetching : s.fetching,
        chunks
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchProducts: (category_id) => fetch_products(category_id),
        fetchMoreProducts: (category_id) => fetch_more_products(category_id),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProducts);
