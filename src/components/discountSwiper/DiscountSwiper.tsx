"use client";
import React from "react";
import styles from "./DiscountSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { RollType } from "@/shared/types/products/rolls";
import { DiscountType } from "@/shared/types/discount/discount";

type Props = {
  slides: number;
  navigation?: boolean;
  products: DiscountType[] | RollType[] | any[];
};

const DiscountSwiper = ({
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
          {products?.map((p) => {
            return (
              <SwiperSlide key={p.id} style={{ width: "695px" }}>
                <Link href={`/actions/${p.title}`}>
                  <img src={p.imagePath} alt={`${p.category} ${p.id}`} />
                </Link>
              </SwiperSlide>
            );
          })}
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
          mousewheel={true}
          keyboard={true}
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
              {/* <Link href={`/${p.category}/${p.name}`}> */}
              <Link href={`/actions/${p.title}`}>
                <img src={p.imagePath} alt={`${p.category} ${p.id}`} />
              </Link>
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
          mousewheel={true}
          keyboard={true}
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
              {/* <Link href={`/${p.category}/${p.name}`}> */}
              <Link href={`/actions/${p.title}`}>
                <img src={p.imagePath} alt={`${p.category} ${p.id}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default DiscountSwiper;
