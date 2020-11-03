import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CardView from 'react-native-cardview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import {rateApp} from './common';
import Font from './Font';
import Entypo from 'react-native-vector-icons/Entypo';

export default class ComponentRate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value : 0,
            filledColor : "#E91E63",
            emoji : '😑',
        };
        this.getRating();
    }

    rate = (value) => {
        let colorArray = ["#E91E63", "#f44336", "#FF5722", "#FF9800", "#8BC34A", "#4CAF50"];
        let emojiArray = ["😑", "☹️", "🙁", "😯", "😊", "❤️"];
        this.setState({value : value, filledColor : colorArray[value], emoji : emojiArray[value]});

        this.setRating(value);
    }

    async setRating(value) {
        await AsyncStorage.setItem('key_rated', value.toString());
    }

    async getRating() {
        const value = await AsyncStorage.getItem('key_rated');
        let colorArray = ["#E91E63", "#f44336", "#FF5722", "#FF9800", "#8BC34A", "#4CAF50"];
        let emojiArray = ["😑", "☹️", "🙁", "😯", "😊", "❤️"];
        if (value !== null) {
            let index = parseInt(value);
            this.setState({value: index, filledColor : colorArray[index], emoji : emojiArray[index]});
        }


    }

    render(){
        const filledColor = this.state.filledColor;
        const storeName = ((Platform.OS === 'ios') ? "App Store" : "Google Play");
        const storeIcon = (Platform.OS === 'ios') ? "app-store" : "google-play";

        const emoji = this.state.emoji;

        const buttonStyle = {
            alignSelf : 'flex-end',
            backgroundColor:  this.state.filledColor,
            marginTop : 10,
            borderRadius : 5,
        };

        let darkMode = (this.props.darkMode);
        let cardBackgroundColor = (darkMode) ? '#1e1e30' : 'white';

        return (
            <View style={{}}>
                <CardView cardElevation={4} cardMaxElevation={2} cornerRadius={5} style={{backgroundColor : cardBackgroundColor, ...styles.listCard}}>
                    <Text style={{color: "#777777", fontFamily: Font.MEDIUM}}>
                        Please consider rating us:
                    </Text>

                    <View style={{flexDirection : 'row', marginTop : 10}}>
                        <TouchableOpacity onPress={()=> this.rate(1)}>
                            <AntDesign name={(this.state.value >= 1) ? "star" : "staro"} color={filledColor} size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.rate(2)}>
                            <AntDesign name={(this.state.value >= 2) ? "star" : "staro"} color={filledColor} size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.rate(3)}>
                            <AntDesign name={(this.state.value >= 3) ? "star" : "staro"} color={filledColor} size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.rate(4)}>
                            <AntDesign name={(this.state.value >= 4) ? "star" : "staro"} color={filledColor} size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.rate(5)}>
                            <AntDesign name={(this.state.value >= 5) ? "star" : "staro"} color={filledColor} size={32}/>
                        </TouchableOpacity>
                        <View style={{flex : 1, justifyContent : 'center'}}>
                            <Text style={{alignSelf : 'flex-end', fontSize : 32, color : 'black'}}>{emoji}</Text>
                        </View>
                    </View>

                    {
                        (this.state.value >= 1) ?
                            <View style={buttonStyle}>
                                <TouchableOpacity style={{flexDirection : "row", padding : 5}} onPress={() => rateApp()}>
                                    <Entypo name={storeIcon} color={'#FAFAFA'} size={32}/>
                                    <Text style={styles.buttonTextStyle}>Rate it on {storeName}</Text>
                                </TouchableOpacity>
                            </View>

                            :

                            <View/>
                    }

                </CardView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listCard : {
        padding: 10,
        margin: 5,
        justifyContent: "center",
        flex: 1,
        color: "#777777",
    },

    buttonTextStyle : {
        margin : 5,
        color : 'white',
        fontWeight : 'bold',
        fontFamily : Font.REGULAR,
    }

});
