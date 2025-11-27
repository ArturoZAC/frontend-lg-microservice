import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  idCliente: number;
  onLocationSelect?: (data: {
    direccion: string;
    lat: number;
    lng: number;
    pais?: string;
    departamento?: string;
    distrito?: string;
  }) => void;
}

export const GoogleMapSearch: React.FC<Props> = ({ onLocationSelect, idCliente }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const marker = useRef<any>(null);
  const autocompleteInput = useRef<HTMLInputElement | null>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });

  const loadGoogleMaps = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const existing = document.getElementById("google-maps-script");
      if (existing) {
        existing.addEventListener("load", () => resolve());
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `
        https://maps.googleapis.com/maps/api/js?key=AIzaSyCi1LyUTYsdr3P-XKNMH6R6bsuwiISt6U4&libraries=places
      `;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = reject;

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadGoogleMaps().then(() => {
      // console.log("✔ Google Maps + Places cargado");

      mapInstance.current = new window.google.maps.Map(mapRef.current!, {
        center: { lat: -12.046374, lng: -77.042793 },
        zoom: 14,
      });

      marker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: { lat: -12.046374, lng: -77.042793 },
        draggable: true,
      });

      marker.current.addListener("dragend", () => {
        const pos = marker.current.getPosition();
        const lat = pos.lat();
        const lng = pos.lng();

        setCoords({ lat, lng });

        // onLocationSelect?.({
        //   direccion: "",
        //   lat,
        //   lng,
        // });
      });

      if (autocompleteInput.current) {
        autocomplete.current = new window.google.maps.places.Autocomplete(
          autocompleteInput.current,
          { types: ["geocode"] }
        );

        autocomplete.current.addListener("place_changed", () => {
          const place = autocomplete.current!.getPlace();
          if (!place.geometry) return;

          const loc = place.geometry.location;
          const lat = loc.lat();
          const lng = loc.lng();

          marker.current.setPosition({ lat, lng });
          mapInstance.current.setCenter({ lat, lng });
          mapInstance.current.setZoom(16);

          setCoords({ lat, lng });

          // onLocationSelect?.({
          //   direccion: place.formatted_address ?? "",
          //   lat,
          //   lng,
          // });
        });
      }
    });
  }, []);

  // --------- BOTÓN PARA IMPRIMIR DATA DETALLADA ----------
  const imprimirDatos = async () => {
    if (!coords.lat || !coords.lng) {
      console.warn("No hay coordenadas seleccionadas.");
      return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    const info = {
      idCliente,
      lat: coords.lat,
      lng: coords.lng,
      pais: data.address.country,
      departamento: data.address.state || data.address.region,
      distrito:
        data.address.suburb ||
        data.address.city_district ||
        data.address.town ||
        data.address.city ||
        data.address.village,
      // direccionCompleta: data.display_name,
    };

    console.log("📍 Datos completos de ubicación:", info);

    // onLocationSelect?.({
    //   direccion: info.direccionCompleta,
    //   lat: info.lat,
    //   lng: info.lng,
    //   pais: info.pais,
    //   departamento: info.departamento,
    //   distrito: info.distrito,
    // });
  };

  return (
    <div>
      <div className="w-full flex justify-between mt-3 gap-3">
        <input
          ref={autocompleteInput}
          type="text"
          placeholder="Buscar ubicación..."
          className="border-2 w-full px-3 py-2 text-black rounded-md outline-none"
        />
      </div>

      <div ref={mapRef} style={{ width: "100%", height: "400px" }} className="mt-3" />

      {/* BOTÓN PARA MOSTRAR DATA */}
      <Button onClick={imprimirDatos} className="mt-3 px-4 py-2 text-white rounded-lg">
        Guarda Ubicacion
      </Button>
    </div>
  );
};
