import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { HiEye, HiTrash } from "react-icons/hi";
import {
  cancelExistingRide,
  fetchRideHistory,
  selectRides,
  selectRidesError,
  selectRidesLoading,
} from "@/redux/features/rider/rider.slice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Filters {
  status?: string;
  minFare?: number;
  maxFare?: number;
  startDate?: string;
  endDate?: string;
}

const RideHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allRides = useSelector(selectRides);
  const loading = useSelector(selectRidesLoading);
  const error = useSelector(selectRidesError);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 5;

  useEffect(() => {
    dispatch(fetchRideHistory());
  }, [dispatch]);

  const handleCancelClick = (id: string) => {
    setSelectedRideId(id);
    setOpenDialog(true);
  };

  const handleConfirmCancel = () => {
  if (selectedRideId) {
    dispatch(cancelExistingRide(selectedRideId))
      .unwrap()
      .then(() => {
        // 1️⃣ Cancel success, show alert
        Swal.fire({
          icon: "success",
          title: "Ride Cancelled",
          text: "The ride has been successfully cancelled.",
          timer: 2000,
          showConfirmButton: false,
        });

        // 2️⃣ Refetch ride history from backend
        dispatch(fetchRideHistory());
      })
      .catch((err: string) =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        })
      );

    setOpenDialog(false);
    setSelectedRideId(null);
  }
};


  // Apply search + filters 
  const filteredRides = allRides
  .filter(r =>
    r.pickupLocation.address.toLowerCase().includes(search.toLowerCase()) ||
    r.destinationLocation.address.toLowerCase().includes(search.toLowerCase())
  )
  .filter(r => {
    const { status, minFare, maxFare, startDate, endDate } = filters;
    let valid = true;
    if (status) valid = valid && r.status === status; // only if user selected a status
    if (minFare !== undefined) valid = valid && r.fare >= minFare;
    if (maxFare !== undefined) valid = valid && r.fare <= maxFare;
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      valid = valid && new Date(r.createdAt) >= start;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      valid = valid && new Date(r.createdAt) <= end;
    }
    return valid;
  });

  // Pagination
  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = filteredRides.slice(indexOfFirstRide, indexOfLastRide);
  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);

  if (loading) return <div className="text-center py-10 text-lg font-medium">⏳ Loading your rides...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-semibold">⚠️ {error}</div>;
  if (!allRides.length)
    return (
      <div className="max-w-3xl mx-auto p-10 text-center">
        <p className="text-2xl font-semibold text-gray-600">🚗 No rides found</p>
        <p className="mt-2 text-gray-500">Book your first ride and it will show up here.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Ride History</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by pickup or destination"
          className="border p-2 rounded bg-[var(--card)]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded bg-[var(--card)]"
          onChange={e => setFilters(f => ({ ...f, status: e.target.value || undefined }))}
        >
          <option value="">All Status</option>
          <option value="requested">Requested</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="number"
          placeholder="Min Fare"
          className="border p-2 rounded bg-[var(--card)]"
          onChange={e => setFilters(f => ({ ...f, minFare: e.target.value ? +e.target.value : undefined }))}
        />
        <input
          type="number"
          placeholder="Max Fare"
          className="border p-2 rounded bg-[var(--card)]"
          onChange={e => setFilters(f => ({ ...f, maxFare: e.target.value ? +e.target.value : undefined }))}
        />
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="border p-2 rounded bg-[var(--card)]"
            onChange={e =>
              setFilters(f => ({ ...f, startDate: e.target.value || undefined }))
            }
          />
          <span className="text-gray-500 font-semibold">→</span>
          <input
            type="date"
            className="border p-2 rounded bg-[var(--card)]"
            onChange={e =>
              setFilters(f => ({ ...f, endDate: e.target.value || undefined }))
            }
          />
        </div>

      </div>

      {/* Ride Table */}
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
          {currentRides.map(ride => (
            <tr key={ride._id} className="border-t border-[var(--border)]">
              <td className="p-3">{new Date(ride.createdAt).toLocaleString()}</td>
              <td className="p-3">{ride.pickupLocation.address}</td>
              <td className="p-3">{ride.destinationLocation.address}</td>
              <td className="p-3">${ride.fare}</td>
              <td className="p-3 capitalize">{ride.status}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => navigate(`/rides/${ride._id}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                   <HiEye />
                </button>
                {ride.status === "requested" && (
                  <button
                    onClick={() => handleCancelClick(ride._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                     <HiTrash/>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${i + 1 === currentPage ? "bg-card" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* AlertDialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Ride?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this ride? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-500 text-white">
              Yes, Cancel
            </AlertDialogAction>
            <AlertDialogAction onClick={() => setOpenDialog(false)}>No</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RideHistory;
