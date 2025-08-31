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
import { useState } from "react";

const RideRequestForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RideRequestPayload>();

  const [dialog, setDialog] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });

  const onSubmit: SubmitHandler<RideRequestPayload> = async (data) => {
    try {
      const result = await dispatch(createRide(data)).unwrap();
      reset();
      setDialog({
        open: true,
        title: "Ride Requested!",
        message: `Your ride from ${result.pickupLocation.address} to ${result.destinationLocation.address} has been requested.`,
      });
    } catch (err: any) {
      setDialog({
        open: true,
        title: "Request Failed",
        message: err || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg mx-auto p-6 bg-[var(--card)] rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Request a Ride</h2>

        {/* Pickup Address */}
        <div>
          <label className="block mb-1 font-semibold">Pickup Address</label>
          <input
            {...register("pickupLocation.address", { required: "Pickup address is required" })}
            className="w-full p-3 rounded-lg border border-[var(--border)]"
          />
          {errors.pickupLocation?.address && (
            <p className="text-red-500">{errors.pickupLocation.address.message}</p>
          )}
        </div>

        {/* Pickup Lat/Lng */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Pickup Lat</label>
            <input
              type="number"
              step="0.000001"
              {...register("pickupLocation.lat", { required: "Pickup latitude is required" })}
              className="w-full p-3 rounded-lg border border-[var(--border)]"
            />
            {errors.pickupLocation?.lat && (
              <p className="text-red-500">{errors.pickupLocation.lat.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Pickup Lng</label>
            <input
              type="number"
              step="0.000001"
              {...register("pickupLocation.lng", { required: "Pickup longitude is required" })}
              className="w-full p-3 rounded-lg border border-[var(--border)]"
            />
            {errors.pickupLocation?.lng && (
              <p className="text-red-500">{errors.pickupLocation.lng.message}</p>
            )}
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block mb-1 font-semibold">Destination Address</label>
          <input
            {...register("destinationLocation.address", { required: "Destination address is required" })}
            className="w-full p-3 rounded-lg border border-[var(--border)]"
          />
          {errors.destinationLocation?.address && (
            <p className="text-red-500">{errors.destinationLocation.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Destination Lat</label>
            <input
              type="number"
              step="0.000001"
              {...register("destinationLocation.lat", { required: "Destination latitude is required" })}
              className="w-full p-3 rounded-lg border border-[var(--border)]"
            />
            {errors.destinationLocation?.lat && (
              <p className="text-red-500">{errors.destinationLocation.lat.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Destination Lng</label>
            <input
              type="number"
              step="0.000001"
              {...register("destinationLocation.lng", { required: "Destination longitude is required" })}
              className="w-full p-3 rounded-lg border border-[var(--border)]"
            />
            {errors.destinationLocation?.lng && (
              <p className="text-red-500">{errors.destinationLocation.lng.message}</p>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-semibold">Payment Method</label>
          <select
            {...register("paymentMethod", { required: "Payment method is required" })}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-card"
          >
            <option value="">Select method</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500">{errors.paymentMethod.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Request Ride
        </button>
      </form>

      {/* Alert Dialog */}
      <AlertDialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialog.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialog((d) => ({ ...d, open: false }))}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RideRequestForm;
