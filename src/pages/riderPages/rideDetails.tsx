import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchRideHistory, selectRides } from "@/redux/features/rider/rider.slice";
import { ArrowLeft, MapPin, Clock, User, CheckCircle, XCircle, Car, Loader } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet + React
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

const RideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rides = useSelector(selectRides);

  // Find ride from store
  const ride = rides.find((r) => r._id === id);

  useEffect(() => {
    if (!ride) {
      dispatch(fetchRideHistory());
    }
  }, [ride, dispatch]);

  if (!ride) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading ride details...
      </div>
    );
  }

  // Timeline steps
  const statusSteps = ["requested", "accepted", "ongoing", "completed"];
  const currentIndex = statusSteps.indexOf(ride.status);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={18} /> Back
      </Button>

      {/* Ride Status & Timeline */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Ride Status
            <Badge
              className={
                ride.status === "completed"
                  ? "bg-green-500"
                  : ride.status === "cancelled"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }
            >
              {ride.status}
            </Badge>
          </h2>
        </CardHeader>
        <CardContent>
          {/* Timeline */}
          <div className="flex items-center justify-between mt-4">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white 
                    ${i <= currentIndex ? "bg-green-500" : "bg-gray-600"}`}
                >
                  {step === "completed" ? (
                    <CheckCircle size={16} />
                  ) : step === "cancelled" ? (
                    <XCircle size={16} />
                  ) : i <= currentIndex ? (
                    <Car size={16} />
                  ) : (
                    <Loader size={16} />
                  )}
                </div>
                <p className="text-xs mt-1 capitalize">{step}</p>
                {i < statusSteps.length - 1 && (
                  <div
                    className={`h-1 w-full ${
                      i < currentIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="space-y-2 mt-6 text-gray-300">
            <p className="flex items-center gap-2">
              <Clock size={16} /> Requested:{" "}
              {new Date(ride.createdAt).toLocaleString()}
            </p>
            {ride.updatedAt && (
              <p className="flex items-center gap-2">
                <Clock size={16} /> Last Updated:{" "}
                {new Date(ride.updatedAt).toLocaleString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pickup & Dropoff */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <h2 className="text-xl font-semibold">Route</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <MapPin className="text-green-600" size={18} />
              Pickup: {ride.pickupLocation?.address}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="text-red-600" size={18} />
              Dropoff: {ride.destinationLocation?.address}
            </p>

            {/* Map View */}
            {ride.pickupLocation?.lat && ride.destinationLocation?.lat && (
              <MapContainer
                center={[ride.pickupLocation.lat, ride.pickupLocation.lng]}
                zoom={13}
                style={{
                  height: "250px",
                  width: "100%",
                  borderRadius: "12px",
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[ride.pickupLocation.lat, ride.pickupLocation.lng]}>
                  <Popup>Pickup</Popup>
                </Marker>
                <Marker position={[ride.destinationLocation.lat, ride.destinationLocation.lng]}>
                  <Popup>Dropoff</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Driver Info */}
      {ride.driver && (
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <h2 className="text-xl font-semibold">Driver Info</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <User size={18} /> {ride.driver.name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RideDetails;
