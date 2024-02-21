import { doc, getDoc } from "firebase/firestore";
import { database } from "./config";

export default async function getDocument(collection, id) {
    let docRef = doc(database, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}