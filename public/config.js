
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBkusbDHYnlwfYxiCq2ZvwHTuhSSr1m8cI",
  authDomain: "cremultiapps.firebaseapp.com",
  databaseURL: "https://cremultiapps.firebaseio.com",
  projectId: "cremultiapps",
  storageBucket: "cremultiapps.appspot.com",
  messagingSenderId: "962809646511",
  appId: "1:962809646511:web:cb64a7465ace3180bbb35a",
  measurementId: "G-D758JTFBVP"
  };
  // Initialize Firebase

  if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}

  firebase.analytics();
  
  