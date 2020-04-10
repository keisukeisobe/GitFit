import {auth} from '../services/firebase';

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.addScope('https://www.googleapis.com/auth/plus.me');
  return auth().signInWithPopup(provider);
}

export function logout(){
  return auth().signOut();
}