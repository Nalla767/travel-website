import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7eszj_9IeqTT2NPOSbh8IA15PYmJ0Eas",
    authDomain: "feel-your-trip-1d650.firebaseapp.com",
    projectId: "feel-your-trip-1d650",
    storageBucket: "feel-your-trip-1d650.firebasestorage.app",
    messagingSenderId: "164937255403",
    appId: "1:164937255403:web:9f18c7ec986f41b586f1ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to show messages
function showMessage(message) {
    alert(message);
}

// Handle Sign Up
document.getElementById('submitSignUp').addEventListener('click', async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const mobile = document.getElementById('Mobile No').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;

    if (password !== confirmPassword) {
        showMessage('Passwords do not match!');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            mobile,
            email,
            dob,
            gender,
        });

        showMessage('Account Created Successfully!');
        window.location.href = 'Login.html';
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            
        } else {
            showMessage('Error: ' + error.message);
        }
    }
});