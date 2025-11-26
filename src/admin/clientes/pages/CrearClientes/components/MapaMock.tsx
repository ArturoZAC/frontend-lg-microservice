import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface Location {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
}

const mockLocations: Location[] = [
  { id: "1", nombre: "Oficina Centro", latitud: -12.0464, longitud: -77.0428 },
  { id: "2", nombre: "Oficina Norte", latitud: -12.0297, longitud: -77.0315 },
  { id: "3", nombre: "Bodega Sureste", latitud: -12.1164, longitud: -77.0728 },
];

export function MapaMock() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(mockLocations[0]);
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = mockLocations.filter((loc) => loc.nombre.toLowerCase().includes(query));
    setFilteredLocations(filtered);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Ubicaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sección izquierda: Mapa */}
          <div className="flex flex-col gap-4">
            {/* Mock de Mapa */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900 rounded-lg p-4 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              {selectedLocation && (
                <div className="text-center z-10">
                  <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 shadow-lg animate-pulse"></div>
                  <p className="text-sm font-semibold text-foreground">{selectedLocation.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedLocation.latitud.toFixed(4)}, {selectedLocation.longitud.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sección derecha: Búsqueda y Lista */}
          <div className="flex flex-col gap-4">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar ubicación..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* Lista de Ubicaciones */}
            <div className="space-y-2 flex-1 overflow-y-auto max-h-96">
              {filteredLocations.map((location) => (
                <Button
                  key={location.id}
                  variant={selectedLocation?.id === location.id ? "default" : "outline"}
                  className="w-full justify-start h-auto py-2 px-3"
                  onClick={() => setSelectedLocation(location)}
                >
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{location.nombre}</p>
                    <p className="text-xs opacity-70">
                      {location.latitud.toFixed(2)}, {location.longitud.toFixed(2)}
                    </p>
                  </div>
                </Button>
              ))}
              {filteredLocations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No se encontraron ubicaciones
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
