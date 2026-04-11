// ============================================
// DATABASE — Firestore Collections
// ============================================
import { getFirestore, collection, doc,
  addDoc, setDoc, getDoc, getDocs,
  query, where, orderBy, onSnapshot,
  serverTimestamp, deleteDoc, updateDoc
} from "firebase/firestore";

export const db = getFirestore();

// ---- USERS ----
export async function createUserProfile(uid, data) {
  await setDoc(doc(db, "users", uid), {
    name: data.name,
    phone: data.phone,
    createdAt: serverTimestamp(),
    deviceLinked: false,
    deviceId: null
  });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// ---- CONTACTS ----
export async function addContact(uid, contact) {
  // contact: { name, phone, sms, call, notif }
  return await addDoc(collection(db, "users", uid, "contacts"), {
    ...contact,
    createdAt: serverTimestamp()
  });
}

export async function getContacts(uid) {
  const snap = await getDocs(collection(db, "users", uid, "contacts"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteContact(uid, contactId) {
  await deleteDoc(doc(db, "users", uid, "contacts", contactId));
}

export async function updateContact(uid, contactId, data) {
  await updateDoc(doc(db, "users", uid, "contacts", contactId), data);
}

// ---- INCIDENTS / ALERTS ----
export async function createIncident(uid, data) {
  // data: { lat, lng, location }
  return await addDoc(collection(db, "incidents"), {
    uid,
    lat: data.lat,
    lng: data.lng,
    location: data.location || "Unknown",
    status: "active",
    startedAt: serverTimestamp(),
    endedAt: null,
    duration: null,
    alertsSent: []
  });
}

export async function endIncident(incidentId, duration) {
  await updateDoc(doc(db, "incidents", incidentId), {
    status: "resolved",
    endedAt: serverTimestamp(),
    duration
  });
}

export async function getUserIncidents(uid) {
  const q = query(
    collection(db, "incidents"),
    where("uid", "==", uid),
    orderBy("startedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Real-time listener for active incidents (for web dashboard)
export function listenActiveIncidents(callback) {
  const q = query(
    collection(db, "incidents"),
    where("status", "==", "active")
  );
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ---- LOCATION UPDATES (Real-time) ----
export async function updateLiveLocation(incidentId, lat, lng) {
  // Uses Realtime Database for speed
  await setDoc(doc(db, "liveLocations", incidentId), {
    lat, lng,
    updatedAt: serverTimestamp()
  });
}

export function listenLiveLocation(incidentId, callback) {
  return onSnapshot(doc(db, "liveLocations", incidentId), snap => {
    if (snap.exists()) callback(snap.data());
  });
}
