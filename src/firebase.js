import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD60kam1XppQ_u-tGjA6oun2-3RnSR7jnw",
  authDomain: "helpers-87f89.firebaseapp.com",
  projectId: "helpers-87f89",
  storageBucket: "helpers-87f89.appspot.com",
  messagingSenderId: "1011768019383",
  appId: "1:1011768019383:web:ec61d0e5f9f78740f90032"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };