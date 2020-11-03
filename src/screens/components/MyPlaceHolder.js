import React, {PureComponent} from 'react';
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from 'rn-placeholder';
import {View} from 'react-native';

class MyPlaceHolder extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{margin : 10}}>
                <Placeholder Animation={Fade} Left={PlaceholderMedia}>
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
            </View>
        );
    }
}

export default MyPlaceHolder;
