"use client";
import styles from "./discount.module.scss";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

type Params = {
  params: {
    name: string;
  };
};

export default function Discount({ params }: Params) {
  
  const loading = useTypedSelector(state => state.discounts.loading)
  const currentDiscount = useTypedSelector(state => state.discounts.currentDiscount)
  const { getDiscountByName } = useActions()

  useEffect(() => {
    getDiscountByName(params.name)
  }, [params.name])

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Breadcrumb
            // categoryName={"Акції"}
            categoryName={"actions"}
            productName={currentDiscount?.name}
          />

          <div className={styles.discount}>
            <div className={styles.discountTitle}>
              <div className={styles.discountTitleTitle}>
                <div className={styles.hr}></div>
                <p>{currentDiscount?.name}</p>
              </div>
            </div>

            <div className={styles.discountDescription}>
              <ul>
                <li>{currentDiscount?.description}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

  // const [currentDiscount, setCurrentDiscount] = useState<DiscountType | null>(
  //   null
  // );
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchDiscount = async () => {
      // try {
      //   const discountQuery = query(
      //     collection(database, "discounts"),
      //     where("title", "==", params.name)
      //   );
      //   const querySnapshot = await getDocs(discountQuery);
      //   querySnapshot.forEach((doc) => {
      //     setCurrentDiscount({
      //       id: doc.id,
      //       ...doc.data(),
      //     } as DiscountType);
      //   });
      // } catch (error) {
      //   console.error("Error fetching discount: ", error);
      // } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (params.name) {
  //     fetchDiscount();
  //   }
  // }, [params.name]);