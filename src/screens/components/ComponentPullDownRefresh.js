import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../common/Colors';
import Font from '../../common/Font';


export default class ComponentPullDownRefresh extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {

    }

    render() {
        const backgroundColor = (this.props.backgroundColor) ? this.props.backgroundColor : Colors.background;
        return(
            <View style={{backgroundColor}}>
                <Text style={styles.text}>Pull down to refresh.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text : {
        marginTop: 10,
        alignSelf : 'center',
        color : '#90A4AE',
        backgroundColor : '#ECEFF1',
        paddingLeft : 10,
        paddingRight : 10,
        paddingTop : 2,
        paddingBottom : 2,
        borderRadius : 10,
        fontFamily : Font.REGULAR,
        fontSize : 12,
    }
});
