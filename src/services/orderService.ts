import { database } from "@/firebase/config";
import { ProductType } from "@/shared/types/products/product";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

interface IOrderService {
  createOrder: (order: ProductType[], userId?: string) => Promise<void>;
  getUserOrder: (userId: string) => Promise<ProductType[] | null>;
}

export const orderService: IOrderService = {
  getUserOrder: async (userId: string) => {
    try {
      // debugger
      const orderCollectionRef = collection(database, "orders");
      const q = query(orderCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const orders: ProductType[] = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data() as ProductType);
      });
      return orders;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return null;
    }
  },

  createOrder: async (order: ProductType[], userId?: string) => {
    try {
      const orderCollectionRef = collection(database, "orders");

      const timestamp = Timestamp.now();
      const orderData = userId
        ? { products: order, userId, timestamp }
        : { products: order, timestamp };

      await addDoc(orderCollectionRef, orderData);
    } catch (error) {
      toast.error("На жаль, ваше замовлення неможливе через технічні збої:(");
    }
  },
};
