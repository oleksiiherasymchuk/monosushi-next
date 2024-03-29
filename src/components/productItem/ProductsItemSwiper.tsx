"use client";
import React from "react";
import styles from "./ProductItem.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { RollType } from "@/shared/types/products/rolls";
import ProductItem from "./ProductItem";

type Props = {
  slides: number;
  navigation?: boolean;
  products?: RollType[] | null | any[];
};

const ProductsItemSwiper = ({
  slides = 2,
  navigation = false,
  products,
}: Props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Swiper
          spaceBetween={10}
          slidesPerView={slides}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ height: "100%" }}
          navigation={navigation ? false : true}
          modules={[Navigation, Pagination, Keyboard]}
        >
          {products?.map((p) => (
            <SwiperSlide key={p.id} style={{ width: "695px" }}>
              <ProductItem products={[p]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.wrapperTablet}>
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ height: "100%" }}
          navigation={navigation ? false : true}
          modules={[Navigation, Pagination, Keyboard]}
        >
          {products?.map((p) => (
            <SwiperSlide
              key={p.id}
              style={{
                width: "80vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <ProductItem products={[p]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.wrapperMobile}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ height: "100%" }}
          navigation={navigation ? false : true}
          modules={[Navigation, Pagination, Keyboard]}
        >
          {products?.map((p) => (
            <SwiperSlide
              key={p.id}
              style={{
                width: "510px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <ProductItem products={[p]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductsItemSwiper;
