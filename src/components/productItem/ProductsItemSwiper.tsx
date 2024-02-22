"use client";
import React from "react";
import styles from "./ProductItem.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { RollType } from "@/shared/types/products/rolls";
import ProductItem from "./ProductItem";

type Props = {
  slides: number;
  navigation?: boolean;
  products:  RollType[] | any[];
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
          // mousewheel={true}
          // keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          // pagination={{
          //   clickable: true,
          //   renderBullet: function (index, swiper) {
          //     return `<span class="${styles.bullet} ${index === swiper.activeIndex ? styles.activeBullet : ''}"></span>`;
          //   },
          // }}
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
          // mousewheel={true}
          // keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
          // mousewheel={true}
          // keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
