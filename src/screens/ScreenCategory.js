import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from './components/Loading';
import CategoryItem from './components/CategoryItem';
import {get_categories_from_db} from '../redux_store/actions/categoryActions';
import Colors from '../common/Colors';


class ScreenCategory extends React.Component{

    constructor(props){
        super(props);
        this.props.fetchCategories();
    }

    componentDidMount(): void {

    }


    render(){
        const {loading, navigation} = this.props;
        let categories = (this.props.categories) ? this.props.categories : [];

        if (loading){
            return (
                <Loading/>
            )
        }

        return (
            <ScrollView style={{flex : 1, backgroundColor : Colors.background}}>
                <View style={{flex : 1, marginBottom : 10, backgroundColor : Colors.background}}>
                {
                    categories.map((item, idx)=>{
                        return <CategoryItem navigation={navigation} data={item} key={'cat_' + idx}/>
                    })
                }
                </View>
            </ScrollView>
        );
    }

}

const mapStateToProps = (state) => {
    return state.categoryReducer;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchCategories: () => get_categories_from_db(),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCategory);
