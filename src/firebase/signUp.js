import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
        console.log(e)
    }

    return { result, error };
}