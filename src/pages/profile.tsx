import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCredentials } from "@/redux/features/auth/auth.slice";

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    // Example: update Redux state
    dispatch(setCredentials({ user: { ...user, name, phone }, token: user?.token ?? "" }));
    alert("Profile updated!");
  };

  return (
    <section className="py-12 px-6 md:px-16">
      <div className="max-w-3xl mx-auto bg-[var(--card)] p-8 rounded-xl shadow-md text-[var(--card-foreground)]">
        <h2 className="text-3xl font-bold mb-6">Profile Management</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Change Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Update Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
