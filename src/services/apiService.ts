import { DiscountType } from "@/shared/types/discount/discount";
import { firebaseService } from "./firebaseService";
import { ProductType } from "@/shared/types/products/product";

const myCustomApiService = {
  getDiscounts: async (): Promise<DiscountType[]> => {
    try {
      const discounts = await firebaseService.getDiscounts();
      return discounts;
    } catch (error) {
      console.error("Error fetching discounts:", error);
      throw error;
    }
  },
};

export default myCustomApiService;
