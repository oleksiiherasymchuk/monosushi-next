import { DiscountType } from "@/shared/types/discount/discount";
import { firebaseService } from "./firebaseService";
import { ProductType } from "@/shared/types/products/product";

const myCustomApiService = {
  // getDiscounts: firebaseService.getDiscounts,
  // getRolls: firebaseService.getRolls,
  // getDiscounts: async (): Promise<DiscountType[]> => {
  //   return firebaseService.getDiscounts();
  // },
  // getRolls: async (): Promise<ProductType[]> => {
  //   return firebaseService.getRolls();
  // },
  getDiscounts: async (): Promise<DiscountType[]> => {
    try {
      const discounts = await firebaseService.getDiscounts();
      return discounts;
    } catch (error) {
      console.error("Error fetching discounts:", error);
      throw error;
    }
  },
  // getRolls: async (): Promise<ProductType[] | null> => {
  //   try {
  //     debugger
  //     const rolls = await firebaseService.getRolls();
  //     return rolls;
  //   } catch (error) {
  //     console.error("Error fetching rolls:", error);
  //     throw error;
  //   }
  // },


  
};

export default myCustomApiService;