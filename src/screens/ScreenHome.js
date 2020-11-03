import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetch_home, get_recents_from_db} from '../redux_store/actions/homeActions';
import Colors from '../common/Colors';
import HomePlaceHolderProducts from './HomeScreen/HomePlaceHolderProducts';
import RecentItems from './HomeScreen/RecentItems';
import HomeProductsView from './HomeScreen/HomeProductsView';
import {get_categories_from_db} from '../redux_store/actions/categoryActions';
import CategoryItems from './HomeScreen/CategoryItems';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Font from '../common/Font';


class ScreenHome extends React.Component{

    constructor(props){
        super(props);
        this.props.fetchCategories();
        this.props.getRecents();
        this.props.fetchHome();
    }

    componentDidMount() {

    }


    render(){
        const {recent, navigation, fetchingHome, data} = this.props;

        const loading = (fetchingHome || data === undefined) ? <LoadingView/> : null;




        return (
            <ScrollView style={{backgroundColor : Colors.background}}>
                <SearchBox navigation={this.props.navigation}/>
                <CategoryItems navigation={navigation}/>
                <RecentItems items={recent} loading={false} header={'Recent Products'} navigation={navigation}/>
                {
                    data.map((item, idx)=>{
                        return <HomeProductsView data={item} key={`hpv_` + idx} navigation={this.props.navigation}/>
                    })
                }

                {loading}
            </ScrollView>
        );
    }

}

const SearchBox = (props) =>{
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>props.navigation.navigate('ScreenSearch', {category_id : 0})} style={{margin : 10, borderRadius : 5, borderColor : 'gray', borderWidth : 0.5, padding : 5, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', backgroundColor : 'white'}}>
            <AntDesign size={20} name={'search1'} color={'gray'}/>
            <Text style={{width : '90%', color : 'lightgray', fontFamily : Font.REGULAR}}>{'Search Product or Code'}</Text>
        </TouchableOpacity>
    )
}

const LoadingView = (props) =>{
    return (
        <View>
            <HomePlaceHolderProducts/>
            <HomePlaceHolderProducts/>
            <HomePlaceHolderProducts/>
        </View>
    )
}


const mapStateToProps = (state) => {
    const s = state.homeReducer;
    return {
        recent: s.recent,
        fetchingHome: s.fetchingHome,
        data: s.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRecents : () => get_recents_from_db(),
        fetchHome : () => fetch_home(),
        fetchCategories: () => get_categories_from_db(),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenHome);
