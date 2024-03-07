import { database } from "@/firebase/config";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { DiscountType } from "@/shared/types/discount/discount";
import { ProductType } from "@/shared/types/products/product";

interface IFirebaseService {
  getDiscounts: () => Promise<DiscountType[]>;
  getCurrentDiscount: ( name : string) => Promise<DiscountType | null>;
  getRolls: () => Promise<ProductType[]>;
  getDrinks: () => Promise<ProductType[]>;
  getSets: () => Promise<ProductType[]>;
  getSouces: () => Promise<ProductType[]>;
  getCurrentProduct: ( name : string ) => Promise<ProductType | null>;
}

export const firebaseService: IFirebaseService = {

  getDiscounts: async (): Promise<DiscountType[]> => {
    try {
      const discountsCollectionRef = collection(database, "discounts");
      const discountsSnapshot = await getDocs(discountsCollectionRef);
      const discountsData: DiscountType[] = [];

      discountsSnapshot.forEach((doc) => {
        discountsData.push({ id: doc.id, ...doc.data() } as DiscountType);
      });

      return discountsData;
    } catch (error) {
      console.error("Error fetching discounts: ", error);
      throw new Error("Failed to fetch discounts");
    }
  },

  getCurrentDiscount: async (name: string): Promise<DiscountType | null> => {
    try {
      const discountQuery = query(
        collection(database, "discounts"),
        where("title", "==", name)
      );
      const querySnapshot = await getDocs(discountQuery);
      let currentDiscount: DiscountType | null = null;
  
      querySnapshot.forEach((doc) => {
        currentDiscount = {
          id: doc.id,
          ...doc.data(),
        } as DiscountType;
      });
  
      return currentDiscount;
    } catch (error) {
      console.error("Error fetching current discount: ", error);
      return null;
    }
  },
  
  getRolls: async (): Promise<ProductType[]> => {
    try {
      // debugger
      const rollsCollectionRef = collection(database, "products");
      const rollsQuery = query(
        rollsCollectionRef,
        where("category", "==", "rolls")
      );
      const rollsSnapshot = await getDocs(rollsQuery);
      const rollsData: ProductType[] = [];
      rollsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        rollsData.push({
          id: doc.id,
          name: data.name || "",
          category: data.category || "",
          path: data.path || "",
          ingredients: data.ingredients || "",
          description: data.description || "",
          price: data.price || "",
          weight: data.weight || "",
          imagePath: data.imagePath || "",
        });
      });
      return rollsData;
    } catch (error) {
      console.error("Error fetching rolls:", error);
      throw new Error("Failed to fetch rolls");
    }
  },

  getDrinks: async (): Promise<ProductType[]> => {
    try {
      const drinksCollectionRef = collection(database, "products");
      const drinksQuery = query(
        drinksCollectionRef,
        where("category", "==", "drinks")
      );
      const drinksSnapshot = await getDocs(drinksQuery);
      const drinksData: ProductType[] = [];
      drinksSnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        drinksData.push({
          id: doc.id,
          name: data.name || "",
          category: data.category || "",
          path: data.path || "",
          ingredients: data.ingredients || "",
          description: data.description || "",
          price: data.price || "",
          weight: data.weight || "",
          imagePath: data.imagePath || "",
        });
      });
      return drinksData;
    } catch (error) {
      console.error("Error fetching drinks:", error);
      throw new Error("Failed to fetch drinks");
    }
  },

  getSets: async (): Promise<ProductType[]> => {
    try {
      const setsCollectionRef = collection(database, "products");
      const setsQuery = query(
        setsCollectionRef,
        where("category", "==", "sets")
      );
      const setsSnapshot = await getDocs(setsQuery);
      const setsData: ProductType[] = [];
      setsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        setsData.push({
          id: doc.id,
          name: data.name || "",
          category: data.category || "",
          path: data.path || "",
          ingredients: data.ingredients || "",
          description: data.description || "",
          price: data.price || "",
          weight: data.weight || "",
          imagePath: data.imagePath || "",
        });
      });
      return setsData;
    } catch (error) {
      console.error("Error fetching sets:", error);
      throw new Error("Failed to fetch sets");
    }
  },

  getSouces: async (): Promise<ProductType[]> => {
    try {
      const soucesCollectionRef = collection(database, "products");
      const soucesQuery = query(
        soucesCollectionRef,
        where("category", "==", "souces")
      );
      const soucesSnapshot = await getDocs(soucesQuery);
      const soucesData: ProductType[] = [];
      soucesSnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        soucesData.push({
          id: doc.id,
          name: data.name || "",
          category: data.category || "",
          path: data.path || "",
          ingredients: data.ingredients || "",
          description: data.description || "",
          price: data.price || "",
          weight: data.weight || "",
          imagePath: data.imagePath || "",
        });
      });
      return soucesData;
    } catch (error) {
      console.error("Error fetching souces:", error);
      throw new Error("Failed to fetch souces");
    }
  },

  getCurrentProduct: async (name: string): Promise<ProductType | null> => {
    try {
      debugger
      const productQuery = query(
        collection(database, "products"),
        where("path", "==", name)
      );
      const querySnapshot = await getDocs(productQuery);
      let currentProduct: ProductType | null = null;
  
      querySnapshot.forEach((doc) => {
        currentProduct = {
          id: doc.id,
          ...doc.data(),
        } as ProductType;
      });
  
      return currentProduct;
    } catch (error) {
      console.error("Error fetching current product: ", error);
      return null;
    }
  },
};


