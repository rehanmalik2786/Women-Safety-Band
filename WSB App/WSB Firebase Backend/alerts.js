// ============================================
// ALERT SYSTEM — Notifications + SMS
// ============================================
import { db } from "./database.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// --- Push Notifications via Firebase Cloud Messaging ---
export async function sendPushToContacts(contacts, incident) {
  // This calls your Firebase Cloud Function
  const res = await fetch("https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/sendAlerts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contacts: contacts.filter(c => c.notif),
      incidentId: incident.id,
      lat: incident.lat,
      lng: incident.lng
    })
  });
  return res.json();
}

// --- SMS via MSG91 (India) ---
export async function sendSMSAlert(phone, lat, lng) {
  const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
  const message = `EMERGENCY ALERT: She needs help NOW! Live location: ${mapsLink} - Women Safety Band`;

  // Call your backend/cloud function (never expose API key in frontend)
  const res = await fetch("https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/sendSMS", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, message })
  });
  return res.json();
}

// --- Log alert sent ---
export async function logAlertSent(incidentId, contactId, method) {
  await updateDoc(doc(db, "incidents", incidentId), {
    alertsSent: arrayUnion({ contactId, method, sentAt: new Date().toISOString() })
  });
}
