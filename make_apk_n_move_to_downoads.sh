#!/usr/bin/env bash
app_name="grocery-$(date +%d-%b-%Y).apk"
to_path="/Volumes/Backup/Dropbox/WayToTrash/useless/$app_name"
cd android
./gradlew assembleRelease
cd app/build/outputs/apk/release
mv app-release.apk $to_path
