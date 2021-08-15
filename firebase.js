var firebaseConfig = {
  apiKey: 'AIzaSyBDpy12nGAJJ7qDEmJEy89757rlm_Sfjqg',
  authDomain: 'clone-two-34e7d.firebaseapp.com',
  projectId: 'clone-two-34e7d',
  storageBucket: 'clone-two-34e7d.appspot.com',
  messagingSenderId: '190622663188',
  appId: '1:190622663188:web:835b7e44f557e190939d01',
  measurementId: 'G-NXRCLVP5DF',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();
