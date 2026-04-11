// ============================================
// FIREBASE CLOUD FUNCTIONS (functions/index.js)
// Deploy with: firebase deploy --only functions
// ============================================
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// Trigger: When new incident is created → auto-alert contacts
exports.onIncidentCreated = functions.firestore
  .document("incidents/{incidentId}")
  .onCreate(async (snap, context) => {
    const incident = snap.data();
    const { uid, lat, lng } = incident;

    // Get user's contacts
    const contactsSnap = await admin.firestore()
      .collection("users").doc(uid)
      .collection("contacts").get();

    const contacts = contactsSnap.docs.map(d => d.data());
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    const message = `EMERGENCY: She needs help! Location: ${mapsLink}`;

    // Send SMS via MSG91
    const smsContacts = contacts.filter(c => c.sms);
    for (const contact of smsContacts) {
      await axios.post("https://api.msg91.com/api/v5/flow/", {
        flow_id: functions.config().msg91.flow_id,
        sender: "SAFETY",
        mobiles: contact.phone.replace(/\s/g, ""),
        VAR1: mapsLink
      }, {
        headers: { authkey: functions.config().msg91.key }
      });
    }

    // Send push notifications
    const pushContacts = contacts.filter(c => c.notif && c.fcmToken);
    const notifications = pushContacts.map(c =>
      admin.messaging().send({
        token: c.fcmToken,
        notification: {
          title: "EMERGENCY ALERT",
          body: message
        },
        data: { incidentId: context.params.incidentId, lat: String(lat), lng: String(lng) }
      })
    );
    await Promise.allSettled(notifications);

    console.log(`Alerts sent for incident ${context.params.incidentId}`);
  });

// HTTP function for SMS (called from app)
exports.sendSMS = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { phone, message } = req.body;
  // MSG91 integration here
  res.json({ success: true });
});
