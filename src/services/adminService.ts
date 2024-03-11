import { database, storage } from "@/firebase/config";
import { CategoryType } from "@/shared/types/categories/category";
import { DiscountType } from "@/shared/types/discount/discount";
import { ProductType } from "@/shared/types/products/product";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v1 } from "uuid";

interface IAdminService {
  getCategories: () => Promise<CategoryType[] | null>;
  getDiscounts: () => Promise<DiscountType[] | null>;
  getProducts: () => Promise<ProductType[] | null>;

  createCategory: (data: any) => void;
  createDiscount: (data: any) => void;
  createProduct: (data: any) => void;

  editCategory: (data: any, categoryId: string) => Promise<CategoryType | null>;
  editDiscount: (data: any, discountId: string) => Promise<DiscountType | null>;
  editProduct: (data: any, productId: string) => Promise<ProductType | null>;

  deleteCategory: (categoryId: string) => void;
  deleteDiscount: (discountId: string) => void;
  deleteProduct: (productId: string) => void;

  getCurrentCategoryToEdit: (
    categoryId: string
  ) => Promise<CategoryType | null>;
  getCurrentDiscountToEdit: (
    categoryId: string
  ) => Promise<DiscountType | null>;
  getCurrentProductToEdit: (categoryId: string) => Promise<ProductType | null>;
}

export const adminService: IAdminService = {
  // GET ADMIN
  getCategories: async (): Promise<CategoryType[] | null> => {
    try {
      const categoriesCollectionRef = collection(database, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollectionRef);
      const categoriesData: CategoryType[] = [];
      categoriesSnapshot.forEach((doc) => {
        categoriesData.push({ id: doc.id, ...doc.data() } as CategoryType);
      });
      return categoriesData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getDiscounts: async (): Promise<DiscountType[] | null> => {
    try {
      const discountsCollectionRef = collection(database, "discounts");
      const discountsSnapshot = await getDocs(discountsCollectionRef);
      const discountsData: DiscountType[] = [];
      discountsSnapshot.forEach((doc) => {
        discountsData.push({ id: doc.id, ...doc.data() } as DiscountType);
      });
      return discountsData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getProducts: async (): Promise<ProductType[] | null> => {
    try {
      const productsCollectionRef = collection(database, "products");
      const productsSnapshot = await getDocs(productsCollectionRef);
      const productsData: ProductType[] = [];
      productsSnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as ProductType);
      });
      return productsData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // CREATE ADMIN
  createCategory: async (data: any) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const category: CategoryType = {
          name: data.name,
          path: data.path,
          imagePath: downloadURL,
        };

        const categoryID = v1();
        const categoryDocRef = doc(
          collection(database, "categories"),
          categoryID
        );
        await setDoc(categoryDocRef, category);

        return category;
      } else {
        console.error("No file uploaded.");
      }
    } catch (error) {
      console.log(error);
    }
  },
  createDiscount: async (data: any) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const discount: DiscountType = {
          name: data.name,
          title: data.title,
          description: data.description,
          imagePath: downloadURL,
        };

        const discountID = v1();
        const discountDocRef = doc(
          collection(database, "discounts"),
          discountID
        );
        await setDoc(discountDocRef, discount);

        return discount;
      } else {
        console.error("No file uploaded.");
      }
    } catch (error) {
      console.log(error);
    }
  },
  createProduct: async (data: any) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const product: ProductType = {
          name: data.name,
          category: data.category,
          path: data.path,
          ingredients: data.ingredients,
          weight: data.weight,
          price: data.price,
          imagePath: downloadURL,
        };

        const productID = v1();
        const productDocRef = doc(collection(database, "products"), productID);

        await setDoc(productDocRef, product);

        return product;
      } else {
        console.error("No file uploaded.");
      }
    } catch (error) {
      console.log(error);
    }
  },

  // EDIT ADMIN
  editCategory: async (data: any, categoryId: string) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const category: CategoryType = {
          name: data.name,
          path: data.path,
          imagePath: downloadURL,
        };

        const categoryDocRef = doc(
          collection(database, "categories"),
          categoryId
        );
        await updateDoc(categoryDocRef, category);

        return category;
      } else {
        console.error("No file uploaded.");
        return null;
      }
    } catch (error) {
      console.error("Error editing category:", error);
      return null;
    }
  },
  editDiscount: async (data: any, discountId: string) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const discount: DiscountType = {
          name: data.name,
          title: data.title,
          description: data.description,
          imagePath: downloadURL,
        };

        const discountDocRef = doc(
          collection(database, "discounts"),
          discountId
        );
        await updateDoc(discountDocRef, discount);

        return discount;
      } else {
        console.error("No file uploaded.");

        return null;
      }
    } catch (error) {
      console.error("Error editing discount:", error);

      return null;
    }
  },
  editProduct: async (data: any, productId: string) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(storageRef);

        const product: ProductType = {
          name: data.name,
          category: data.category,
          path: data.path,
          ingredients: data.ingredients,
          weight: data.weight,
          price: data.price,
          imagePath: downloadURL,
        };

        const productDocRef = doc(collection(database, "products"), productId);
        await updateDoc(productDocRef, product);

        return product;
      } else {
        console.error("No file uploaded.");
        // return false;
        return null;
      }
    } catch (error) {
      console.error("Error editing product:", error);
      // return false;
      return null;
    }
  },

  // DELETE ADMIN
  deleteCategory: async (categoryId: string) => {
    try {
      const collectionRef = collection(database, "categories");
      const docRef = doc(collectionRef, categoryId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  },
  deleteDiscount: async (discountId: string) => {
    try {
      const collectionRef = collection(database, "discounts");
      const docRef = doc(collectionRef, discountId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  },
  deleteProduct: async (productId: string) => {
    try {
      const collectionRef = collection(database, "products");
      const docRef = doc(collectionRef, productId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  },

  // GET CURRENT ADMIN
  getCurrentCategoryToEdit: async (categoryId: string) => {
    try {
      const categoryDocRef = doc(
        collection(database, "categories"),
        categoryId
      );
      const docSnapshot = await getDoc(categoryDocRef);
      const categoryData = docSnapshot.data() as CategoryType;

      return categoryData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getCurrentDiscountToEdit: async (discountId: string) => {
    try {
      const discountDocRef = doc(collection(database, "discounts"), discountId);
      const docSnapshot = await getDoc(discountDocRef);
      const discountData = docSnapshot.data() as DiscountType;

      return discountData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getCurrentProductToEdit: async (productId: string) => {
    try {
      const productDocRef = doc(collection(database, "products"), productId);
      const docSnapshot = await getDoc(productDocRef);
      const productData = docSnapshot.data() as ProductType;

      return productData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
