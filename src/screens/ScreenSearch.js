import React from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchTextInput from './HomeScreen/SearchTextInput';
import {clearSearch} from '../redux_store/actions/searchActions';


class ScreenSearch extends React.Component{

    constructor(props){
        super(props);

    }

    componentDidMount(): void {

    }

    componentWillUnmount() {
        this.props.clear_search();
    }


    render(){
        const { category_id } = this.props.route.params;
        return (
            <SearchTextInput navigation={this.props.navigation} category_id={category_id}/>
        );
    }

}

const mapStateToProps = (state) => {
    const s = state.indexReducer;
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // on_change: (name, value) => on_change(name, value),
        clear_search : () => clearSearch(),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSearch);
