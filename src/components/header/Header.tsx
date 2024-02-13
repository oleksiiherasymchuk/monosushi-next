"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import HeaderLogo from "../../../public/images/headerLogo.svg";
import BigHeaderLogo from "../../../public/images/bigHeaderLogo.svg";
import Discount from "../../../public/images/discount.svg";
import Rolls from "../../../public/images/rolls.svg";
import Sets from "../../../public/images/sets.svg";
import Drinks from "../../../public/images/drinks.svg";
import Souces from "../../../public/images/souces.svg";
import Menu from "../../../public/images/dropdown.webp";
import Phone from "../../../public/images/phone.svg";
import User from "../../../public/images/user.svg";
import Basket from "../../../public/images/basket.svg";
import Link from "next/link";
import PhoneModal from "../phoneModal/PhoneModal";
import Modal from "../modal/Modal";
import AuthModal from "../authModal/AuthModal";
import SignInModal from "../signInModal/SignInModal";
import ForgetModal from "../forgetModal/ForgetModal";
import BurgerMenuIcon from "../../../public/images/burgerMenu.png";
import BasketModal from "../basketModal/BasketModal";
import AdminHeaderBurger from "../adminNavigation/AdminHeaderBurger";

const Header = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false);
  const [currentModalContent, setCurrentModalContent] = useState<
    "auth" | "signIn" | "forget"
  >("auth");

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const onClosePhoneModal = () => {
    setIsPhoneModalOpen(false);
  };

  const toogleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  const onCloseBasketModal = () => {
    setIsBasketOpen(false);
  };

  const onCloseModal = () => {
    setIsAuthModalOpen(false);
    setIsPhoneModalOpen(false);
  };

  const onOpenPhoneModal = () => {
    setIsPhoneModalOpen(true);
  };

  const onOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const changeModalContent = (content: "auth" | "signIn" | "forget") => {
    setCurrentModalContent(content);
  };

  useEffect(() => {
    // Function to close the burger menu when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsBurgerMenuOpen(false);
      }
    };

    if (isBurgerMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBurgerMenuOpen]);

  const preventPropagation = (e: React.MouseEvent) => {
    setIsBurgerMenuOpen(false);
    e.stopPropagation();
  };

  return (
    <>
      <header>
         {/* START HEADER FOR 1200px+ */}
        <nav className={styles.header}>
          <Modal isOpen={isPhoneModalOpen} onClose={onCloseModal}>
            <PhoneModal onClose={onClosePhoneModal} />
          </Modal>
          <Modal isOpen={isAuthModalOpen} onClose={onCloseModal}>
            {currentModalContent === "auth" && (
              <AuthModal
                onClose={onCloseModal}
                changeContent={changeModalContent}
              />
            )}
            {currentModalContent === "signIn" && (
              <SignInModal
                onClose={onCloseModal}
                changeContent={changeModalContent}
              />
            )}
            {currentModalContent === "forget" && (
              <ForgetModal
                onClose={onCloseModal}
                changeContent={changeModalContent}
              />
            )}
          </Modal>

          <div className={styles.headerLogo}>
            <Link href="/">
              <Image
                src={HeaderLogo}
                className={styles.headerLogoLink}
                alt="logo"
                width={136}
                height={51}
              />
            </Link>
            <Image
              src={BigHeaderLogo}
              className={styles.headerLogoBig}
              alt="logo"
              width={136}
              height={51}
            />
          </div>

          <div className={styles.headerNavbar}>
            <div className={styles.headerNavbarLink}>
              <Link href="/actions">
                <Image
                  src={Discount}
                  width={30}
                  height={30}
                  className={styles.headerNavbarLinkIcon}
                  alt="navbarIcons"
                />
                <span>Акції</span>
              </Link>
            </div>
            <div className={styles.headerNavbarLink}>
              <Link href="/product-category/rolls">
                <Image
                  src={Rolls}
                  width={30}
                  height={30}
                  className={styles.headerNavbarLinkIcon}
                  alt="navbarIcons"
                />
                <span>Роли</span>
              </Link>
            </div>
            <div className={styles.headerNavbarLink}>
              <Link href="/product-category/sets">
                <Image
                  src={Sets}
                  width={30}
                  height={30}
                  className={styles.headerNavbarLinkIcon}
                  alt="navbarIcons"
                />
                <span>Сети</span>
              </Link>
            </div>
            <div className={styles.headerNavbarLink}>
              <Link href="/product-category/drinks">
                <Image
                  src={Drinks}
                  width={30}
                  height={30}
                  className={styles.headerNavbarLinkIcon}
                  alt="navbarIcons"
                />
                <span>Напої</span>
              </Link>
            </div>
            <div className={styles.headerNavbarLink}>
              <Link href="/product-category/souces">
                <Image
                  src={Souces}
                  width={30}
                  height={30}
                  className={styles.headerNavbarLinkIcon}
                  alt="navbarIcons"
                />
                <span>Соуси</span>
              </Link>
            </div>
          </div>

          <div
            className={styles.headerMenu}
            onClick={toggleMenu}
            ref={burgerMenuRef}
          >
            <Image src={Menu} height={50} width={50} alt="burgerMenu" />
            {isBurgerMenuOpen && (
              <div
                className={styles.headerMenuBurger}
                onClick={preventPropagation}
              >
                <Image
                  src={BurgerMenuIcon}
                  height={50}
                  width={50}
                  alt="burgerMenuOpenIcon"
                  className={styles.headerMenuBurgerIcon}
                />

                <div className={styles.headerMenuBurgerItem}>
                  <Link href="/dostavka-ta-oplata"> Доставка та оплата </Link>
                </div>

                <div className={styles.headerMenuBurgerItem}>
                  <Link href="/about-us">Про нас</Link>
                </div>
                <div className={styles.headerMenuBurgerItem}>
                  <Link href="/actions">Акції на суші</Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.headerPhone}>
            <button onClick={onOpenPhoneModal}>
              <Image src={Phone} alt="phone" height={15} width={15} />
              <span>Ми зателефонуємо</span>
            </button>
          </div>

          <div className={styles.headerInfo}>
            <a href="tel:+380938475152">+380938475152</a>
            <div className={styles.headerInfoDetails}>
              Працюємо з <b>11:00</b> до <b>22:30</b>
            </div>
          </div>

          <div className={styles.headerUser} onClick={onOpenAuthModal}>
            <Image src={User} alt="user" height={25} width={25} />
          </div>

          <div className={styles.headerBasket} onClick={toogleBasket}>
            <Image src={Basket} alt="basket" height={25} width={25} />
            <span className={styles.headerBasketProductQuantity}>0</span>
            <span>0 грн</span>
          </div>
        </nav>
        {/* END HEADER FOR 1200px+ */}


        {/* START HEADER FOR TABLET 990px-1200px */}
        <nav className={styles.headerTablet}>
          <Modal isOpen={isPhoneModalOpen} onClose={onCloseModal}>
            <PhoneModal onClose={onClosePhoneModal} />
          </Modal>
          <Modal isOpen={isAuthModalOpen} onClose={onCloseModal}>
            {currentModalContent === "auth" && (
              <AuthModal
                onClose={onCloseModal}
                changeContent={changeModalContent}
              />
            )}
            {currentModalContent === "signIn" && (
              <SignInModal
                onClose={onCloseModal}
                changeContent={changeModalContent}
              />
            )}
            {currentModalContent === "forget" && (
              <ForgetModal
                onClose={onCloseModal}
                changeContent={changeModalContent}
              />
            )}
          </Modal>

          <div className={styles.headerTabletLogo}>
            <Link href="/">
              <Image
                src={HeaderLogo}
                className={styles.headerTabletLogoLink}
                alt="logo"
                width={136}
                height={51}
              />
            </Link>
          </div>

          <div className={styles.headerTabletPhone}>
            <a href="tel:+380938475152">
              <Image src={Phone} alt="phone" height={15} width={15} />
            </a>
          </div>

          <div className={styles.headerTabletUser} onClick={onOpenAuthModal}>
            <Image src={User} alt="user" height={25} width={25} />
          </div>

          <div
            className={styles.headerTabletMenu}
            onClick={toggleMenu}
            ref={burgerMenuRef}
          >
            <Image src={isBurgerMenuOpen ? BurgerMenuIcon : Menu} height={50} width={50} alt="burgerMenu" />
            {isBurgerMenuOpen && (
              <div
                className={styles.headerTabletMenuBurger}
                onClick={preventPropagation}
              >
                {/* <Image
                 src={BurgerMenuIcon}
                 height={50}
                 width={50}
                 alt="burgerMenuOpenIcon"
                 className={styles.headerTabletMenuBurgerIcon}
               /> */}

                <div className={styles.headerTabletMenuBurgerItemSouce}>
                  <Link href="/product-category/souces">
                    <Image
                      src={Souces}
                      width={30}
                      height={30}
                      className={styles.headerTabletMenuBurgerItemIcon}
                      alt="navbarIcons"
                    />
                    <span>Соуси</span>
                  </Link>
                </div>

                <div className={styles.headerTabletMenuBurgerItemLink}>
                  <div className={styles.headerTabletMenuBurgerItemLinkItem}>
                    <Link href="/dostavka-ta-oplata"> Доставка та оплата </Link>
                  </div>

                  <div className={styles.headerTabletMenuBurgerItemLinkItem}>
                    <Link href="/about-us">Про нас</Link>
                  </div>
                  <div className={styles.headerTabletMenuBurgerItemLinkItem}>
                    <Link href="/actions">Акції на суші</Link>
                  </div>
                </div>

                <div className={styles.headerTabletMenuBurgerItemPhone}>
                  <a href="tel:+380938475152">+380938475152</a>
                  <div className={styles.headerTabletMenuBurgerItemPhoneDetails}>
                    Працюємо з <b>11:00</b> до <b>22:30</b>
                  </div>
                </div>

                <div className={styles.headerTabletMenuBurgerItemCall}>
                    <button onClick={onOpenPhoneModal}>
                      <Image src={Phone} alt="phone" height={15} width={15} />
                      <span>Ми зателефонуємо</span>
                    </button>
                  </div>
              </div>
            )}
          </div>

          <div className={styles.headerTabletBasket} onClick={toogleBasket}>
            <Image src={Basket} alt="basket" height={25} width={25} />
            <span className={styles.headerBasketProductQuantity}>0</span>
            <span>0 грн</span>
          </div>
        </nav>
        {/* END HEADER FORMTABLET 990px-1200px */}
        

        {/* START PRODUCTS NAVBAR */}
        <nav className={styles.productsNavbar}>
          <div className={styles.productsNavbarItem}>
            <Link href="/actions">
              <Image
                src={Discount}
                width={30}
                height={30}
                className={styles.productsNavbarItemIcon}
                alt="navbarIcons"
              />
              <span>Акції на суші</span>
            </Link>
          </div>

          <div className={styles.productsNavbarItem}>
              <Link href="/product-category/rolls">
                <Image
                  src={Rolls}
                  width={30}
                  height={30}
                  className={styles.productsNavbarItemIcon}
                  alt="navbarIcons"
                />
                <span>Роли</span>
              </Link>
            </div>

            <div className={styles.productsNavbarItem}>
              <Link href="/product-category/sets">
                <Image
                  src={Sets}
                  width={30}
                  height={30}
                  className={styles.productsNavbarItemIcon}
                  alt="navbarIcons"
                />
                <span>Сети</span>
              </Link>
            </div>

            <div className={styles.productsNavbarItem}>
              <Link href="/product-category/drinks">
                <Image
                  src={Drinks}
                  width={30}
                  height={30}
                  className={styles.productsNavbarItemIcon}
                  alt="navbarIcons"
                />
                <span>Безалкогольні напої</span>
              </Link>
            </div>
        </nav>
        {/* END PRODUCTS NAVBAR */}
        
      </header>
      {isBasketOpen && <BasketModal onClose={onCloseBasketModal} />}
    </>
  );
};

export default Header;
