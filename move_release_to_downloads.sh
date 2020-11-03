#!/usr/bin/env bash
APP_NAME="Grocery_"
zipName="$APP_NAME$(date +%d_%m_%Y).zip"
cd android/app/build/outputs/apk/release/
zip -r $zipName *
mv $zipName /Users/jpm/Downloads/
