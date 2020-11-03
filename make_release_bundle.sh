#!/usr/bin/env bash
app_name="greentrac-$(date +%d-%b-%Y).aab"
to_path="/Users/jpm/Downloads/$app_name"
cd android
./gradlew bundleRelease
cd app/build/outputs/bundle/release
mv app.aab $to_path
