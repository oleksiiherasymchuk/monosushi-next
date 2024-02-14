"use client";
import React from "react";
import styles from "./DiscountSwiper.module.scss";
import { DiscountType } from "@/shared/types/discount/discount";
import Discount from "../../../public/images/discountSlide1.jpeg";
import Discount1 from "../../../public/images/discountSlide2.jpeg";
import Discount2 from "../../../public/images/discountSlider3HP.jpeg";
import Discount3 from "../../../public/images/discountSlider3Lunch.jpeg";
import Discount4 from "../../../public/images/discountSlider5Delivery.jpeg";
import Discount5 from "../../../public/images/DiscountSlider6Photo.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const DiscountSwiper = (props: Props) => {
  const discounts: DiscountType[] = [
    { id: 1, name: "HP", imagePath: Discount.src },
    { id: 2, name: "HP", imagePath: Discount1.src },
    { id: 3, name: "HP", imagePath: Discount2.src },
    { id: 4, name: "HP", imagePath: Discount3.src },
    { id: 5, name: "HP", imagePath: Discount4.src },
    { id: 6, name: "HP", imagePath: Discount5.src },
  ];
  return (
    <>
      <div className={styles.wrapper}>
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          style={{ height: "100%" }}
          // pagination={{
          //   clickable: true,
          //   renderBullet: function (index, swiper) {
          //     return `<span class="${styles.bullet} ${index === swiper.activeIndex ? styles.activeBullet : ''}"></span>`;
          //   },
          // }}
        >
          {discounts.map((discount) => (
            <SwiperSlide key={discount.id} style={{ width: "695px" }}>
              <Link href={`/action/${discount.name}`}>
                <img src={discount.imagePath} alt={`Discount ${discount.id}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.wrapperTablet}>
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          style={{ height: "100%" }}
        >
          {discounts.map((discount) => (
            <SwiperSlide
              key={discount.id}
              style={{
                width: "80vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Link href={`/action/${discount.name}`}>
                <img src={discount.imagePath} alt={`Discount ${discount.id}`} />
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
          modules={[Pagination]}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          style={{ height: "100%" }}
        >
          {discounts.map((discount) => (
            <SwiperSlide
              key={discount.id}
              style={{
                width: "510px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Link href={`/action/${discount.name}`}>
                <img src={discount.imagePath} alt={`Discount ${discount.id}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default DiscountSwiper;
