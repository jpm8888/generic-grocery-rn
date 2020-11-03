import {Alert, BackHandler, Linking, Platform, Share} from 'react-native';
import Constants from './Constants';


export function rateApp() {
    const rate_url = Platform.OS === 'ios' ? Constants.IOS_RATE_URL : Constants.ANDROID_RATE_URL;
    Linking.canOpenURL(rate_url).then(supported => {
        supported && Linking.openURL(rate_url);
    }, (err) => console.log(err));
}

export function openUrl(url) {
    Linking.canOpenURL(url).then(supported => {
        supported && Linking.openURL(url);
    }, (err) => console.log(err));
}

export function moreApps() {
    const moreAppsUrl = Platform.OS === 'ios' ? Constants.IOS_MORE_APPS_URL : Constants.ANDROID_MORE_APPS_URL;
    Linking.canOpenURL(moreAppsUrl).then(supported => {
        supported && Linking.openURL(moreAppsUrl);
    }, (err) => console.log(err));
}

export function share() {
    Share.share({title: Constants.APP_NAME, message: Constants.SHARE_MESSAGE})
        .then(({action, activityType}) => {
            console.log(action == Share.sharedAction, activityType);
        });
}

export function shareViaWhatsapp(text) {
    const url = `whatsapp://send?text=${text}`
    Linking.canOpenURL(url).then(supported => {
        supported && Linking.openURL(url);
    }, (err) => console.log(err));
}

export const exitAlert = () => {
    Alert.alert(
        'Confirm exit',
        'Do you want to quit the app?',
        [
            {text: 'Rate App', onPress: () => rateApp()},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
    );
};

export function abbreviateNumber (value) {
    let suffixes = ["", "k", "m", "b","t"];
    let suffixNum = Math.floor((""+value).length/3);
    let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}
