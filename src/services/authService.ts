import { auth, database } from "@/firebase/config";
import { UserType } from "@/shared/types/user/user";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

interface IAuthService {
  createUser: (user: UserType) => Promise<User | null>;
  getUserData: (userId: string) => Promise<DocumentData>;
  signIn: (email: string, password: string) => Promise<UserCredential | null>;
  updateUser: (user: User) => Promise<DocumentData | null>;
  logOut: () => Promise<void>;
}

export const authService: IAuthService = {
  getUserData: async (userId: string) => {
    try {
      const userDocRef = doc(database, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        return userDocSnapshot.data();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  signIn: async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      toast.error("Помилка логінування:(");
      return null;
    }
  },

  logOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (user: any) => {
    try {
      const usersCollectionRef = collection(database, "users");
      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("email", "==", user.email))
      );

      if (!querySnapshot.empty) {
        toast.error("Користувач з такою поштою вже зареєстрований!");
        return null;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const authUser = userCredential.user;

      const userData = {
        userID: authUser.uid,
        email: authUser.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        role: "User",
      };

      const userDocRef = doc(usersCollectionRef, authUser.uid);
      await setDoc(userDocRef, userData);

      // console.log("User signed up");
      return authUser;
    } catch (error) {
      toast.error("Сталась помилка реєстрації акаунту:(");
      throw new Error("Failed to create user");
    }
  },

  updateUser: async (user: any): Promise<User | null> => {
    try {
      const userId = user.userID;
      const userDocRef = doc(database, "users", userId);

      await setDoc(userDocRef, user, { merge: true });
      toast.success(`Дані користувача ${user.email} успішно оновлені!`);
      return user;
    } catch (error) {
      toast.error("Помилка оновлення даних користувача:(");
      throw error;
    }
  },
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const usersCollectionRef = collection(database, "users");
    const snapshot = await getDocs(
      query(usersCollectionRef, where("email", "==", email))
    );
    return !snapshot.empty;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};
