"use client"
import { Loader } from '@googlemaps/js-api-loader'
import React, { useEffect, useRef } from 'react'
import styles from './Map.module.scss'
import { toast } from 'react-toastify'

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ['places'] 
      })

      const google = await loader.load()

      const { Map, Marker } = google.maps

      const mapOptions: google.maps.MapOptions = {
        center: { lat: 50.4501, lng: 30.5234 },
        zoom: 15
      }

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
      const marker = new Marker({ map })


      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current)
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          if (!place.geometry || !place.geometry.location) {
            toast.error("Не можемо знайти Вашу адресу:(")
            return
          }
          const location = place.geometry.location
          map.setCenter(location)
          marker.setPosition(location)
        })
      }
    }

    initMap()
  }, [])

  return (
    <div className={styles.map}>
      <input ref={inputRef} className={styles.mapInput} placeholder="Введіть Вашу адресу" />
      <div ref={mapRef} className={styles.mapItem}></div>
    </div>
  )
}

export default Map
