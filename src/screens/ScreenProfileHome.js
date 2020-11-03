import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SettingItem from './components/SettingItem';
import {logout} from '../redux_store/actions/settingActions';
import ComponentRate from '../common/ComponentRate';
import ComponentVersion from '../common/ComponentVersion';


class ScreenProfileHome extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        return (
            <ScrollView>
                <SettingItem icon={'antdesign'} name={'Update Password'} onPress={()=>this.props.navigation.navigate('ScreenUpdatePassword')}/>
                <SettingItem icon={'poweroff'} name={'Logout'} onPress={()=>this.props.logout()}/>
                <ComponentRate darkMode={false}/>
                <ComponentVersion/>
            </ScrollView>
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
        logout: () => logout(),
    }, dispatch);
};


const styles = StyleSheet.create({
    text : {
        color : 'red',
        fontSize : 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProfileHome);
