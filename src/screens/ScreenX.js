import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class ScreenX extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text}>Hello World</Text>
            </View>
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
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenX);
