import { useEffect } from "react";
import { useAppDispatch} from "@/redux/hook";
import {
  cancelExistingRide,
  fetchRideHistory,
  selectRides,
  selectRidesError,
  selectRidesLoading,
} from "@/redux/features/rider/rider.slice";
import { useSelector } from "react-redux";


const RideHistory = () => {
  const dispatch = useAppDispatch();
  const rides = useSelector(selectRides);
  const loading = useSelector(selectRidesLoading);
  const error = useSelector(selectRidesError);

  useEffect(() => {
    dispatch(fetchRideHistory());
  }, [dispatch]);
  console.log(rides)

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        ⏳ Loading your rides...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        ⚠️ {error}
      </div>
    );
  }

  if (!rides.length) {
    return (
      <div className="max-w-3xl mx-auto p-10 text-center">
        <p className="text-2xl font-semibold text-gray-600">
          🚗 No rides found
        </p>
        <p className="mt-2 text-gray-500">
          Book your first ride and it will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Ride History</h2>
      <table className="w-full border border-[var(--border)] rounded-lg overflow-hidden">
        <thead className="bg-[var(--card)]">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Pickup</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Fare</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rides?.map((ride) => (
            <tr key={ride._id} className="border-t border-[var(--border)]">
              <td className="p-3">
                {new Date(ride.createdAt).toLocaleString()}
              </td>
              <td className="p-3">{ride.pickupLocation.address}</td>
              <td className="p-3">{ride.destinationLocation.address}</td>
              <td className="p-3">${ride.fare}</td>
              <td className="p-3 capitalize">{ride.status}</td>
              <td className="p-3">
                {ride.status === "requested" && (
                  <button
                    onClick={() => dispatch(cancelExistingRide(ride._id))}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RideHistory;
