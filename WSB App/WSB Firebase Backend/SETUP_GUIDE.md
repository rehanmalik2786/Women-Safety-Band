# Women Safety Band — Firebase Backend Setup Guide

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project" → Name: "women-safety-band"
3. Enable Google Analytics (optional)

## Step 2: Enable Services
- Authentication → Sign-in method → Phone (enable)
- Firestore Database → Create database → Production mode
- Realtime Database → Create database
- Cloud Functions → Get started
- Cloud Messaging (FCM) → Automatic

## Step 3: Get Config
- Project Settings → Your Apps → Add Web App
- Copy config object → paste into firebase-config.js

## Step 4: Deploy Security Rules
firebase deploy --only firestore:rules

## Step 5: Set Cloud Function Secrets
firebase functions:config:set msg91.key="YOUR_KEY" msg91.flow_id="YOUR_FLOW_ID"
firebase deploy --only functions

## Step 6: MSG91 SMS Setup (India)
1. Register at https://msg91.com
2. Create flow template: "EMERGENCY ALERT: Location: ##VAR1##"
3. Get API key + Flow ID → set in Firebase config

## Collections Structure:
users/
  {uid}/
    name, phone, deviceLinked, deviceId
    contacts/
      {contactId}/
        name, phone, sms, call, notif, fcmToken

incidents/
  {incidentId}/
    uid, lat, lng, status, startedAt, endedAt, duration

liveLocations/
  {incidentId}/
    lat, lng, updatedAt
