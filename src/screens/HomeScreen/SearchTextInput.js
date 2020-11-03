import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {onQuery} from '../../redux_store/actions/searchActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Font from '../../common/Font';
import Colors from '../../common/Colors';

class SearchTextInput extends Component {
    _textRef = React.createRef();
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._textRef.focus();
    }

    onInputChange(text){
        let id = this.props.category_id;
        if (!id) id = 0;
        this.props.on_query(text, id)
    }

    render() {
        const {loading, data, navigation, category_id} = this.props;

        return (
            <View>
                <View style={{margin : 10, borderRadius : 10, borderColor : 'gray', borderWidth : 0.5, padding : 5, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                    <AntDesign size={20} name={'search1'} color={'gray'}/>
                    <TextInput ref={(ref) => this._textRef = ref} autoFocus={true} placeholder={'Search Code or Name'} onChangeText={(text) => this.onInputChange(text)} value={this.props.queryStr} maxLength={40} style={{width : '85%', fontFamily : Font.REGULAR}}/>
                    <ActivityIndicator size={'small'} color={(loading) ? 'gray' : Colors.background}/>
                </View>
                <View>
                    {
                        data.map(item=>{
                            return <ResItem id={item.id} code={item.code} name={item.name} key={"res_item" + item.id} navigation={navigation}/>
                        })
                    }
                </View>
            </View>
        );
    }
}

const ResItem = ({id, code, name, navigation}) =>{
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={()=> navigation.navigate('ScreenProductDetail', {product_id : id})}>
            <View style={styles.codeContainer}>
                <Text style={styles.code}>{code}</Text>
            </View>
            <Text style={styles.nameStyle}>{name}</Text>
        </TouchableOpacity>
    )
}


const mapStateToProps = (state) => {
    const s = state.searchReducer;
    return {
        queryStr : s.queryStr,
        loading : s.loading,
        data : s.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        on_query : (text, category_id) => onQuery(text, category_id),
    }, dispatch);
};


const styles = StyleSheet.create({
    container:{
        flexDirection : 'row',
        marginLeft : 20,
        marginRight : 20,
        borderBottomWidth : 0.5,
        borderBottomColor : 'gray',
        paddingBottom : 5,
        marginBottom : 5,
        alignItems : 'center'
    },
    codeContainer : {
        backgroundColor : Colors.primaryDark,
        padding : 5,
        borderRadius : 3,
    },
    code : {
        fontFamily: Font.BOLD,
        color : 'white',
        fontSize : 16
    },
    nameStyle : {
        fontFamily : Font.REGULAR,
        marginLeft : 10,
        fontSize : 16
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTextInput);
