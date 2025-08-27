export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface Ride {
  id: string;
  pickupLocation: Location;
  destinationLocation: Location;
  fare: number;
  status: 'requested' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
  driver?: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface RideRequestPayload {
  pickupLocation: Location;
  destinationLocation: Location;
  paymentMethod: 'cash' | 'card';
}
