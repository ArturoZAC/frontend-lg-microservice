import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { crearUbicacionAction } from "../actions/crearClienteUbicacion.action";
import { toast } from "sonner";
import { useUbicacion } from "../../EditarClientes/hooks/useUbicacion";
import { actualizarUbicacionAction } from "../../EditarClientes/actions/actualizarUbicacion.action";

interface Props {
  idCliente: number;
  /*   onLocationSelect?: (data: {
    direccion: string;
    lat: number;
    lng: number;
    pais?: string;
    departamento?: string;
    distrito?: string;
  }) => void; */
}

export const GoogleMapSearch: React.FC<Props> = ({ /* onLocationSelect, */ idCliente }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const marker = useRef<any>(null);
  const autocompleteInput = useRef<HTMLInputElement | null>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });

  const { data: ubicacion } = useUbicacion(idCliente);

  // useEffect(() => {
  //   console.log({ ubicacion });
  // }, [ubicacion]);

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
      const initialLat = ubicacion ? parseFloat(ubicacion.latitud) : -12.046374;
      const initialLng = ubicacion ? parseFloat(ubicacion.longitud) : -77.042793;

      mapInstance.current = new window.google.maps.Map(mapRef.current!, {
        center: { lat: initialLat, lng: initialLng },
        zoom: 14,
      });

      marker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: { lat: initialLat, lng: initialLng },
        draggable: true,
      });

      // Actualizamos coords si existe ubicación
      if (ubicacion) {
        setCoords({ lat: parseFloat(ubicacion.latitud), lng: parseFloat(ubicacion.longitud) });
      }

      marker.current.addListener("dragend", () => {
        const pos = marker.current.getPosition();
        const lat = pos.lat();
        const lng = pos.lng();
        setCoords({ lat, lng });
      });

      if (autocompleteInput.current) {
        autocomplete.current = new window.google.maps.places.Autocomplete(
          autocompleteInput.current,
          {
            types: ["geocode"],
          }
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
        });
      }
    });
  }, [ubicacion]); // ⬅️ Cuando la ubicación esté disponible, reubicamos el marker

  const imprimirDatos = async () => {
    if (!coords.lat || !coords.lng) {
      console.warn("No hay coordenadas seleccionadas.");
      return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    const info = {
      cliente_id: "" + idCliente,
      latitud: "" + coords.lat,
      longitud: "" + coords.lng,
      pais: data.address.country,
      departamento: data.address.state || data.address.region,
      distrito:
        data.address.suburb ||
        data.address.city_district ||
        data.address.town ||
        data.address.city ||
        data.address.village,
    };

    try {
      if (ubicacion?.id) {
        // si ya tiene id → actualizar
        await actualizarUbicacionAction({ id: ubicacion.id, ...info });
        toast.success("Ubicación actualizada correctamente");
      } else {
        // si no tiene id → crear
        await crearUbicacionAction(info);
        toast.success("Ubicación creada correctamente");
      }
    } catch {
      toast.error("Error al guardar ubicación");
    }
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
      <Button
        onClick={imprimirDatos}
        variant={"secondary"}
        className="mt-3 px-4 py-2 text-white rounded-lg"
      >
        Guarda Ubicacion
      </Button>
    </div>
  );
};
