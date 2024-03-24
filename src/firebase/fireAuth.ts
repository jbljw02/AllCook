import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebasedb";

const fireAuth = getAuth(firebaseApp);

export default fireAuth;
