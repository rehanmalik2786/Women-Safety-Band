// ============================================
// AUTHENTICATION — Phone OTP Login
// ============================================
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Step 1: Send OTP
export async function sendOTP(phoneNumber) {
  // phoneNumber format: "+919876543210"
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible'
  });
  const confirmationResult = await signInWithPhoneNumber(
    auth, phoneNumber, window.recaptchaVerifier
  );
  window.confirmationResult = confirmationResult;
  return confirmationResult;
}

// Step 2: Verify OTP
export async function verifyOTP(otp) {
  const result = await window.confirmationResult.confirm(otp);
  return result.user; // Returns logged-in user
}

// Listen to auth state
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
