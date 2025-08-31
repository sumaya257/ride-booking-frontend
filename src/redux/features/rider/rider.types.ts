// rider.types.ts

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface Ride {
  _id: string; 
  rider: string;
  driver: {
    _id: string;
    name: string;
  } | null; // can be null
  pickupLocation: Location;
  destinationLocation: Location;
  fare: number;
  distance?: number;
  status: 'requested' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
  canceledBy?: string | null;
  timestamps: {
    requestedAt?: string;
    pickedUpAt?: string;
    completedAt?: string;
    cancelledAt?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface RideRequestPayload {
  pickupLocation: Location;
  destinationLocation: Location;
  paymentMethod: 'cash' | 'card';
}
