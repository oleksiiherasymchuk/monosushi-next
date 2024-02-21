import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export default async function authMe(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}