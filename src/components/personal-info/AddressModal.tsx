"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./PersonalInfo.module.scss";
import { Loader } from "@googlemaps/js-api-loader";
import { toast } from "react-toastify";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";

type Props = {
  onClose: () => void;
  address?: any;
  isOpen: boolean;
};

const AddressModal = ({ onClose, address = null, isOpen }: Props) => {
  const [userData, setUserData] = useState<User | any>({
    addressType: address ? address.addressType : "",
    deliveryAddress: address ? address.deliveryAddress : "",
    houseNumber: address ? address.houseNumber : "",
    flatNumber: address ? address.flatNumber : "",
  });


  const {
    getUserDataThunk,
    updateUserThunk,
    addAddressThunk,
    editAddressThunk,
  } = useActions();
  const user = useTypedSelector((state) => state.auth.user);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      getUserDataThunk({ userId: currentUser.uid });
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const { addressType, deliveryAddress, houseNumber, flatNumber } =
          userData;
        const newAddress = {
          addressType,
          deliveryAddress,
          houseNumber,
          flatNumber,
        };


        if (isOpen && address) {
          await editAddressThunk({
            data: {
              userId: currentUser.uid,
              addressId: address.id,
              ...newAddress,
            },
          });
        } else {
          await addAddressThunk({ userId: currentUser.uid, newAddress });
        }
      }

       setUserData({
          addressType: "",
          deliveryAddress: "",
          houseNumber: "",
          flatNumber: "",
        });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
      });

      const google = await loader.load();

      const { Map, Marker } = google.maps;

      const mapOptions: google.maps.MapOptions = {
        center: { lat: 50.4501, lng: 30.5234 },
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      const marker = new Marker({ map });

      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) {
            toast.error("Не можемо знайти Вашу адресу:(");
            return;
          }
          const location = place.geometry.location;
          map.setCenter(location);
          marker.setPosition(location);

          setUserData((prevFormData: any) => ({
            ...prevFormData,
            deliveryAddress: place.formatted_address,
          }));
        });
      }
    };

    initMap();
  }, []);

  return (
    <div className={styles.modal}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>

      <h1>Нова адреса</h1>

      <form className={styles.modalForm}>
        <input
          type="text"
          className={styles.modalFormAddressType}
          placeholder="*Вкажіть тип адреси (наприклад, дім, робота)"
          name="addressType"
          value={userData.addressType}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          className={styles.modalFormDelivery}
          placeholder="*Введіть вулицю доставки"
          ref={inputRef}
          name="deliveryAddress"
          value={userData.deliveryAddress}
          onChange={handleInputChange}
          required
        />

        <div className={styles.modalFormHalfInput}>
          <input
            type="text"
            className={styles.modalFormHalfInputAddress}
            placeholder="*№ Будинку"
            name="houseNumber"
            value={userData.houseNumber}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            className={styles.modalFormHalfInputAddress}
            placeholder="№ Квартири"
            name="flatNumber"
            value={userData.flatNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.modalFormButtons}>
          <button className={styles.modalFormButtonsFindAddress} type="button">
            Пошук адреси
          </button>
          <button
            className={styles.modalFormButtonsSave}
            type="button"
            onClick={handleSaveChanges}
          >
            Зберегти
          </button>
        </div>

        <div className={styles.modalFormMap} ref={mapRef}></div>
      </form>
    </div>
  );
};

export default AddressModal;
