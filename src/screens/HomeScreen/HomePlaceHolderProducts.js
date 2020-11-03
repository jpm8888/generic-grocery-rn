import React, {Component} from 'react';
import {View} from 'react-native';
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from 'rn-placeholder';
import Layout from '../../common/Layout';

const scrWidth = Layout.window.width;
const containerMargin = 5;
const mediaDime = (scrWidth / 2) - (containerMargin * 4);

class HomePlaceHolderProducts extends Component {
    render() {
        return (
            <View style={{backgroundColor : 'white', width : '100%', marginTop : 5}}>
                <View style={{flexDirection : 'row', justifyContent : 'space-evenly', margin : containerMargin}}>
                    <PlaceholderLine width={90} style={{marginLeft : containerMargin * 2, marginTop : 10}}/>
                </View>

                <Placeholder Animation={Fade}>
                    <View style={{flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center', margin : containerMargin}}>
                        <PlaceholderMedia style={{width : mediaDime, height : mediaDime}}/>
                        <PlaceholderMedia style={{width : mediaDime, height : mediaDime}}/>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center', margin : containerMargin}}>
                        <PlaceholderMedia style={{width : mediaDime, height : mediaDime}}/>
                        <PlaceholderMedia style={{width : mediaDime, height : mediaDime}}/>
                    </View>
                </Placeholder>
            </View>
        );
    }
}

export default HomePlaceHolderProducts;
