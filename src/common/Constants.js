const DEBUG = true;
const SHOW_ADS = false;

const DATABASE_NAME = "grocery_jpm.db";
const RN_CODEBASE_VERSION = '1.0.1';

const IOS_AD_APP_ID = 'ca-app-pub-7445712351150990~7705963653';
const IOS_AD_BANNER = DEBUG ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-7445712351150990/5079800311';
const IOS_AD_FULLPAGE = DEBUG ? 'ca-app-pub-3940256099942544/1033173712' : 'ca-app-pub-7445712351150990/1140555305';
const IOS_AD_REWARD = DEBUG ? 'ca-app-pub-3940256099942544/5224354917' : 'ca-app-pub-7445712351150990/8045461731';

const ANDROID_AD_APP_ID = 'ca-app-pub-7445712351150990~2353015882';
const ANDROID_AD_BANNER = DEBUG ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-7445712351150990/7413770874';
const ANDROID_AD_FULLPAGE = DEBUG ? 'ca-app-pub-3940256099942544/1033173712' : 'ca-app-pub-7445712351150990/3958290334';
const ANDROID_AD_REWARD = DEBUG ? 'ca-app-pub-3940256099942544/5224354917' : 'ca-app-pub-7445712351150990/8444276355';


const API_BASE_URL = "http://grocery.dybydx.co/api_v1/";

const APP_NAME = "Grocery";

const APP_LINK = "http://onelink.to/kidskbc";

const IOS_BUNDLE_ID = "jpm.grocery";

const IOS_APP_ID = "1536091136";
const ANDROID_PACKAGE_NAME = "jpm.grocery";


const IOS_RATE_URL = "https://itunes.apple.com/app/id" + IOS_APP_ID;
const ANDROID_RATE_URL = "https://play.google.com/store/apps/details?id=" + ANDROID_PACKAGE_NAME;


// const IOS_MORE_APPS_URL = 'itms-apps://itunes.apple.com/in/artist/' + 'syed-rizvi/id1055554860'; //syed rizvi account
const IOS_MORE_APPS_URL = 'itms-apps://itunes.apple.com/in/artist/' + 'nexogen-private-limited/id869478131'; //nexogen account
const ANDROID_MORE_APPS_URL = "market://search?q=pub:" + "CAVERNS+DEN+STUDIOS";

const SHARE_MESSAGE = "General knowledge trivia is a very interesting and popular Indian quiz game. Download it for free\nAndroid : " + ANDROID_RATE_URL + "\n\niPhone : " + IOS_RATE_URL;

export default {

    DEBUG,
    SHOW_ADS,
    DATABASE_NAME,
    RN_CODEBASE_VERSION,

    ANDROID_AD_APP_ID,
    ANDROID_AD_BANNER,
    ANDROID_AD_FULLPAGE,
    ANDROID_AD_REWARD,

    IOS_AD_APP_ID,
    IOS_AD_BANNER,
    IOS_AD_FULLPAGE,
    IOS_AD_REWARD,

    IOS_BUNDLE_ID,
    IOS_APP_ID,
    ANDROID_PACKAGE_NAME,

    IOS_RATE_URL,
    ANDROID_RATE_URL,

    IOS_MORE_APPS_URL,
    ANDROID_MORE_APPS_URL,

    APP_NAME,
    APP_LINK,

    SHARE_MESSAGE,

    API_BASE_URL

};

export function debugLog(msg) {
    if (DEBUG === true) console.log(msg);
}


