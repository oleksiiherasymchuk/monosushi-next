"use client";
import React, { useState , useEffect } from "react";
import styles from "./ProductItem.module.scss";
import Image from "next/image";
import zsu from "../../../../public/images/zsu.jpeg";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ProductItem from "@/components/productItem/ProductItem";
import ProductsItemSwiper from "@/components/productItem/ProductsItemSwiper";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { ProductType } from "@/shared/types/products/product";

type Params = {
  params: {
    name: string;
  };
};

const Product = ({ params }: Params) => {

  const { loading,  currentProduct }  = useTypedSelector(state => state.products)
  const drinks = useTypedSelector(state => state.drinks.drinks)
  const sets = useTypedSelector(state => state.sets.sets)

  const { getDrinksFromFirebaseThunk, getSetsFromFirebaseThunk, getProductByName } = useActions()

  useEffect(() => {
    getDrinksFromFirebaseThunk()
    getSetsFromFirebaseThunk()
    getProductByName(params.name)
  }, [params.name])


  const sortSets = (sets: ProductType[]) => {
    const sortedSets = [...sets];

    sortedSets.sort((a, b) => a.name.localeCompare(b.name));

    const index = sortedSets.findIndex(
      (set) => set.name === "Допоможи ЗСУ разом з Моносушиком"
    );

    if (index !== -1) {
      const item = sortedSets.splice(index, 1)[0];
      sortedSets.unshift(item);
    }

    return sortedSets;
  };

  const sortedSets = sortSets(sets || []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Breadcrumb
            categoryName={currentProduct?.category}
            productName={currentProduct?.name}
          />

          <div className={styles.product}>
            <div className={styles.productImage}>
              <Image
                src={currentProduct?.imagePath || zsu}
                alt={currentProduct?.name || "currentProductImage"}
                width={240}
                height={240}
              />
            </div>
            <div className={styles.productDescription}>
              <h5>{currentProduct?.name}</h5>
              {currentProduct?.ingredients && <p>
                <span>Склад: </span>
                {currentProduct?.ingredients}
              </p>}
              {currentProduct?.weight && <p>
                <span>Вага: </span>
                {currentProduct?.weight}
              </p>}
              <PriceAndQuantity product={currentProduct} />
            </div>
          </div>

          <div className={styles.trySwiper}>
            <h2>Також спробуйте</h2>
            <ProductsItemSwiper products={sortedSets} slides={3} navigation={true} />
          </div>

          <div className={styles.tasteWithSwiper}>
            <h2>Смакує разом</h2>
            <ProductItem products={drinks} />
          </div>
        </>
      )}
    </>
  );
};

export default Product;

    // const [loading, setLoading] = useState<boolean>(true);
  // const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
  //   null
  // );
  // const [drinks, setDrinks] = useState<ProductsType | null>(null);
  // const [sets, setSets] = useState<ProductsType | null>(null);

  // useEffect(() => {
  //   const fetchSets = async () => {
  //     try {
  //       setLoading(true);
  //       const setsCollectionRef = collection(database, "products");
  //       const setsQuery = query(
  //         setsCollectionRef,
  //         where("category", "==", "sets")
  //       );
  //       const setsSnapshot = await getDocs(setsQuery);
  //       const setsData: ProductType[] = [];
  //       setsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
  //         const data = doc.data();
  //         setsData.push({
  //           id: doc.id,
  //           name: data.name || "",
  //           category: data.category || "",
  //           path: data.path || "",
  //           ingredients: data.ingredients || "",
  //           description: data.description || "",
  //           price: data.price || "",
  //           weight: data.weight || "",
  //           imagePath: data.imagePath || "",
  //         });
  //       });
  //       setSets(setsData);
  //     } catch (error) {
  //       console.error("Error fetching souces: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSets();
  // }, []);

  // useEffect(() => {
  //   const fetchDrinks = async () => {
  //     try {
  //       setLoading(true);
  //       const drinksCollectionRef = collection(database, "products");
  //       const drinksQuery = query(
  //         drinksCollectionRef,
  //         where("category", "==", "drinks")
  //       );
  //       const drinksSnapshot = await getDocs(drinksQuery);
  //       const drinksData: ProductType[] = [];
  //       drinksSnapshot.forEach((doc: QueryDocumentSnapshot) => {
  //         const data = doc.data();
  //         drinksData.push({
  //           id: doc.id,
  //           name: data.name || "",
  //           category: data.category || "",
  //           path: data.path || "",
  //           ingredients: data.ingredients || "",
  //           description: data.description || "",
  //           price: data.price || "",
  //           weight: data.weight || "",
  //           imagePath: data.imagePath || "",
  //         });
  //       });
  //       setDrinks(drinksData);
  //     } catch (error) {
  //       console.error("Error fetching souces: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDrinks();
  // }, []);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const productQuery = query(
  //         collection(database, "products"),
  //         where("path", "==", params.name)
  //       );
  //       const querySnapshot = await getDocs(productQuery);
  //       querySnapshot.forEach((doc) => {
  //         setCurrentProduct({
  //           id: doc.id,
  //           ...doc.data(),
  //         } as ProductType);
  //       });
  //     } catch (error) {
  //       console.error("Error fetching discount: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (params.name) {
  //     fetchProduct();
  //   }
  // }, [params.name]);

  // useEffect(() => {
  //   console.log(currentProduct);
  // }, [currentProduct]);
