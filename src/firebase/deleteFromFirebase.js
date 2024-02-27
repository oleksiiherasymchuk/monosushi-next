import { database } from "@/firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";

export const deleteFromFirebase = async (collectionName, documentId, setterFunction) => {
  try {
    const collectionRef = collection(database, collectionName);
    const docRef = doc(collectionRef, documentId);
    await deleteDoc(docRef);

    setterFunction(prevState =>
      prevState.filter(item => item.id !== documentId)
    );
  } catch (error) {
    console.error(`Error deleting document: ${error}`);
  }
};