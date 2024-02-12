'use client'
import React, { useState } from 'react';
import styles from './Discounts.module.scss'; // Adjust path to your SCSS file
import Image from 'next/image';
import logo from '../../../../public/images/logo.svg'

const AdminDiscounts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  // Function to add discount item
  const addDiscountItem = () => {
    // setIsOpen(true);
    setIsOpen(!isOpen)
  };

  // Function to handle form submission
  const addDiscount = (e: any) => {
    e.preventDefault();
    // Logic to add discount
  };

  // Function to handle file upload
  const upload = (e: any) => {
    // Logic to handle file upload
    setIsUploaded(true);
  };

  // Function to delete image
  const deleteImage = () => {
    // Logic to delete image
    setIsUploaded(false);
  };

  // Function to render image source
  const valueByControl = (controlName: any) => {
    // Logic to return image source based on controlName
  };

  // Dummy data for demonstration
  const adminDiscounts = [
    { name: 'Discount 1', title: 'Title 1', description: 'Description 1', imagePath: 'image1.jpg' },
    { name: 'Discount 2', title: 'Title 2', description: 'Description 2', imagePath: 'image2.jpg' },
    // Add more dummy data as needed
  ];

  const editDiscount = (discount: any) => {}
  const deleteDiscount = (discount: any) => {}

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addDiscountItem}>
        ДОДАТИ АКЦІЮ
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={addDiscount}>
            <div className={styles.name}>
              <input type="text" placeholder="*Назва" name="name" id="name" />
              <input type="text" placeholder="*Заголовок" name="title" id="title" />
            </div>
            <textarea placeholder="*Опис" name="description" id="description"></textarea>
            <div className={styles.file}>
              <input type="file" name="formFile" className={styles.fileInput} id="formFile" onChange={upload} />
            </div>

            {isUploaded && (
              <div>
                <Image 
                src={logo}
                // src={valueByControl('imagePath')}
                 alt="logo" className={styles.loadedImg} />
                <button type="button" className={styles.deleteImage} onClick={deleteImage}>
                  delete
                </button>
              </div>
            )}

            <button className={styles.save} 
            // disabled={discountForm.invalid}
             type="submit">
              ЗБЕРЕГТИ
            </button>
          </form>
        </div>
      )}

     {!isOpen && (
       <table>
       <thead>
         <tr>
           <td>Дата</td>
           <td>Назва</td>
           <td>Заголовок</td>
           <td>Опис</td>
           <td>Картинка</td>
           <td>Дії</td>
         </tr>
       </thead>
       <tbody>
         {adminDiscounts.map((discount, index) => (
           <tr key={index}>
             <td>24.03.2023</td>
             <td>{discount.name}</td>
             <td>{discount.title}</td>
             <td>
               {discount.description.slice(0, 100)}
               {discount.description.length > 60 && <span>...</span>}
             </td>
             <td><img src={discount.imagePath} alt="" /></td>
             <td>
               <p onClick={() => editDiscount(discount)}>Редагувати</p>
               <p onClick={() => deleteDiscount(discount)}>Видалити</p>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     )}
    </div>
  );
};

export default AdminDiscounts;