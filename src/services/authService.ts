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
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { v1 } from "uuid";

interface IAuthService {
  createUser: (user: UserType) => Promise<User | null>;
  getUserData: (userId: string) => Promise<DocumentData>;
  signIn: (email: string, password: string) => Promise<UserCredential | null>;
  updateUser: (user: User) => Promise<DocumentData | null>;
  logOut: () => Promise<void>;
  addAddress: (userId: string, newAddress: any) => Promise<void>;
  deleteAddress: (userId: string, addressId: string) => Promise<void>;
  editAddress: (data: any) => Promise<any | null>;
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
        addresses: {},
      };

      const userDocRef = doc(usersCollectionRef, authUser.uid);
      await setDoc(userDocRef, userData);

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

      return user;
    } catch (error) {
      console.log(error);
      toast.error("Помилка оновлення даних користувача:(");
      throw error;
    }
  },

  addAddress: async (userId: string, newAddress: any): Promise<void> => {
    try {
      const userDocRef = doc(database, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const existingAddresses = userData?.addresses || [];

        const updatedAddresses = [
          ...existingAddresses,
          { ...newAddress, id: v1() },
        ];

        await updateDoc(userDocRef, { addresses: updatedAddresses });

        toast.success("Адресу додано успішно!");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Помилка додавання адреси:(");
    }
  },

  editAddress: async (data: any) => {
    try {
      const {
        userId,
        addressId,
        addressType,
        deliveryAddress,
        houseNumber,
        flatNumber,
      } = data;

      const userDocRef = doc(database, "users", userId);

      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        const addressIndex = userData.addresses.findIndex(
          (address: any) => address.id === addressId
        );

        if (addressIndex !== -1) {
          const updatedAddress = {
            addressType:
              addressType || userData.addresses[addressIndex].addressType,
            deliveryAddress:
              deliveryAddress ||
              userData.addresses[addressIndex].deliveryAddress,
            houseNumber:
              houseNumber || userData.addresses[addressIndex].houseNumber,
            flatNumber:
              flatNumber || userData.addresses[addressIndex].flatNumber,
          };

          userData.addresses[addressIndex] = {
            ...userData.addresses[addressIndex],
            ...updatedAddress,
          };

          await updateDoc(userDocRef, { addresses: userData.addresses });

          return userData.addresses[addressIndex];
        } 
        // else {
        //   toast.error("Адресу не знайдено:(");
        // }
      } else {
        throw new Error("User document not found");
      }
    } catch (error) {
      toast.error("Помилка редагування адреси. Спробуйте пізніше!");
      return null;
    }
  },

  deleteAddress: async (userId: string, addressId: string): Promise<void> => {
    try {
      const userDocRef = doc(database, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        if (!userData || !userData.addresses) {
          throw new Error("User data or addresses not found");
        }
        const updatedAddresses = userData.addresses.filter(
          (address: any) => address.id !== addressId
        );
        await updateDoc(userDocRef, { addresses: updatedAddresses });
        toast.success("Адресу видалено успішно!");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Помилка видалення адреси:(");
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
