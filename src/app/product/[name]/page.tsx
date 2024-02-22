import Link from 'next/link';
import React from 'react'
import styles from './ProductItem.module.scss'
import Image from 'next/image';
import cola from '../../../../public/images/colaa.jpeg'
import PriceAndQuantity from '@/components/priceAndQuantity/PriceAndQuantity';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { DrinksType } from '@/shared/types/products/drinks';
import ProductItem from '@/components/productItem/ProductItem';
import DiscountSwiper from '@/components/discountSwiper/DiscountSwiper';
import { RollsType } from '@/shared/types/products/rolls';
import ProductsItemSwiper from '@/components/productItem/ProductsItemSwiper';

type Props = {}

const Product = (props: Props) => {

  const rolls: RollsType = [
    { id: 1, name: "Сет Філадельфія", price: 115, weight: 15 },
    { id: 2, name: "Сет Філадельфія", price: 225, weight: 15 },
    { id: 3, name: "Сет Філадельфія", price: 235, weight: 15 },
    { id: 4, name: "Сет Філадельфія", price: 355, weight: 15 },
    { id: 5, name: "Сет Філадельфія", price: 435, weight: 15 },
  ];

  const drinks: DrinksType = [
    { id: 1, name: "Cola", price: 15, weight: 15 },
    { id: 2, name: "Pepsi", price: 25, weight: 15 },
    { id: 3, name: "Fanta", price: 35, weight: 15 }
  ];

  const product = {name: 'Сет Філадельфія', weight: '1070', squad: 'Філадельфія: з лососем / в кунжуті / з тунцем / з вугрем', price: 10, category: 'sets'}

  return (
    <>
      <Breadcrumb categoryName={product.category} productName={product.name}/>

      <div className={styles.product}>
        <div className={styles.productImage}>
          <Image src={cola} alt='productImage'/>
        </div>
        <div className={styles.productDescription}>
          <h5>{product.name}</h5>
          <p><span>Склад: </span>{product.squad}</p>
          <p><span>Вага: </span>{product.weight} г</p>
          <PriceAndQuantity product={product} />
        </div>
      </div>

      <div className={styles.trySwiper}>
        <h2>Також спробуйте</h2>
        <ProductsItemSwiper products={rolls} slides={3} navigation={true}/>
      </div>

      <div className={styles.tasteWithSwiper}>
        <h2>Смакує разом</h2>
        <ProductItem products={drinks} />
      </div>
      </>
  )
}

export default Product;