// Para que TS sepa que window.google existe
declare global {
  interface Window {
    google: any;
  }
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: HTMLElement, opts: any);
    setCenter(latLng: any): void;
    setZoom(zoom: number): void;
  }

  class Marker {
    constructor(opts: any);
    setPosition(latLng: any): void;
    getPosition(): any;
    addListener(event: string, handler: (...args: any[]) => void): void;
  }

  namespace places {
    class Autocomplete {
      constructor(inputField: HTMLInputElement, opts?: any);
      getPlace(): any;
      addListener(event: string, handler: (...args: any[]) => void): void;
    }
  }
}

export {};
