import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createRide } from "@/redux/features/rider/rider.slice";
import type { RideRequestPayload } from "@/redux/features/rider/rider.types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/redux/hook";
import { useState, useEffect } from "react";
import { calculateDistanceInKm, calculateFare } from "@/utils/distanceFare";
import MapPicker from "@/utils/MapPicker";

const RideRequestForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<RideRequestPayload>();

  const [dialog, setDialog] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: "", message: "" });
  const [pickupPosition, setPickupPosition] = useState<[number, number] | null>(null);
  const [destinationPosition, setDestinationPosition] = useState<[number, number] | null>(null);
  const [fare, setFare] = useState<number | null>(null);

  async function fetchAddress(lat: number, lng: number) {
    try {
      const res = await fetch(`http://localhost:5000/api/geocode/reverse?lat=${lat}&lon=${lng}`);
      const data = await res.json();
      return data.address;
    } catch {
      return "";
    }
  }

  useEffect(() => {
    if (pickupPosition) {
      setValue("pickupLocation.lat", pickupPosition[0]);
      setValue("pickupLocation.lng", pickupPosition[1]);
      fetchAddress(pickupPosition[0], pickupPosition[1]).then(addr => setValue("pickupLocation.address", addr));
    }
    if (destinationPosition) {
      setValue("destinationLocation.lat", destinationPosition[0]);
      setValue("destinationLocation.lng", destinationPosition[1]);
      fetchAddress(destinationPosition[0], destinationPosition[1]).then(addr => setValue("destinationLocation.address", addr));
    }
    if (pickupPosition && destinationPosition) {
      const distance = calculateDistanceInKm(
        pickupPosition[0], pickupPosition[1],
        destinationPosition[0], destinationPosition[1]
      );
      setFare(calculateFare(distance));
    } else {
      setFare(null);
    }
  }, [pickupPosition, destinationPosition]);

  const onSubmit: SubmitHandler<RideRequestPayload> = async (data) => {
    try {
      const result = await dispatch(createRide(data)).unwrap();
      reset();
      setPickupPosition(null);
      setDestinationPosition(null);
      setFare(null);
      setDialog({
        open: true,
        title: "Ride Requested!",
        message: `Your ride from ${result.pickupLocation.address} to ${result.destinationLocation.address} has been requested.\nFare: ${fare} BDT`,
      });
    } catch (err: any) {
      setDialog({ open: true, title: "Request Failed", message: err || "Something went wrong!" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto p-6 bg-[var(--card)] rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Request a Ride</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Pickup Address</label>
            <input {...register("pickupLocation.address", { required: "Pickup address is required" })}
                   className="w-full p-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            {errors.pickupLocation?.address && <span className="text-red-500 text-sm">{errors.pickupLocation.address.message}</span>}
            <MapPicker onSelect={(lat, lng) => setPickupPosition([lat, lng])} />
          </div>

          {/* Destination */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Destination Address</label>
            <input {...register("destinationLocation.address", { required: "Destination address is required" })}
                   className="w-full p-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            {errors.destinationLocation?.address && <span className="text-red-500 text-sm">{errors.destinationLocation.address.message}</span>}
            <MapPicker onSelect={(lat, lng) => setDestinationPosition([lat, lng])} />
          </div>
        </div>

        {fare !== null && <div className="text-lg font-semibold text-center text-green-600">Estimated Fare: {fare} BDT</div>}

        <div className="flex flex-col gap-1">
          <label className="font-medium">Payment Method</label>
          <select {...register("paymentMethod", { required: "Payment method is required" })}
                  className="w-full p-2 rounded-lg border border-[var(--border)] bg-card focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
            <option value="">Select method</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
          {errors.paymentMethod && <span className="text-red-500 text-sm">{errors.paymentMethod.message}</span>}
        </div>

        <button type="submit" className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 rounded-lg font-semibold hover:scale-105 transition-transform">Request Ride</button>
      </form>

      <AlertDialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
        <AlertDialogContent className="z-[9999]">
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialog.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialog((d) => ({ ...d, open: false }))}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RideRequestForm;
