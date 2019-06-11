import firebase from 'firebase';

const config={
  databaseURL: "https://hacker-news.firebaseio.com",
}

const Firebase = firebase.initializeApp(config);
export default Firebase;