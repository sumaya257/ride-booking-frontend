import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { cancelExistingRide, fetchRideHistory } from "@/redux/features/rider/rider.slice";

const RideHistory = () => {
  const dispatch = useDispatch();
  const { rides, loading } = useSelector((state: RootState) => state.rider);

  useEffect(() => {
    dispatch(fetchRideHistory());
  }, [dispatch]);

  if (loading) return <p>Loading rides...</p>;

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
          {rides.map((ride) => (
            <tr key={ride.id} className="border-t border-[var(--border)]">
              <td className="p-3">{new Date(ride.createdAt).toLocaleString()}</td>
              <td className="p-3">{ride.pickupLocation.address}</td>
              <td className="p-3">{ride.destinationLocation.address}</td>
              <td className="p-3">${ride.fare}</td>
              <td className="p-3">{ride.status}</td>
              <td className="p-3">
                {ride.status === "requested" && (
                  <button
                    onClick={() => dispatch(cancelExistingRide(ride.id))}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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
