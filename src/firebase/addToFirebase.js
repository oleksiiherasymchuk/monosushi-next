import { collection, doc, setDoc } from "firebase/firestore";
import { v1 } from "uuid";
import { database } from "./config";

export const addToFirebase = async (collectionName, data, setterFunction) => {
  debugger
  try {
    // debugger
    const documentId = v1();
    const collectionRef = collection(database, collectionName);
    const docRef = doc(collectionRef, documentId);
    await setDoc(docRef, data);

    setterFunction(prevState => [{ id: documentId, ...data }, ...prevState]);
  } catch (error) {
    console.error(`Error adding document to Firebase: ${error}`);
  }
};
