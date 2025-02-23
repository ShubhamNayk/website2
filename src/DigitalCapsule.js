import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DigitalCapsule = () => {
  const [capsules, setCapsules] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Backend se capsules fetch karne ka function
  const fetchCapsules = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/capsules");
      if (!response.ok) throw new Error("Failed to fetch capsules");

      const data = await response.json();
      setCapsules(data);
    } catch (error) {
      console.error("Error fetching capsules:", error);
    }
  };

  // ✅ Naya capsule add karne ka function
  const addCapsule = async () => {
    if (!title || !message) return;

    const newCapsule = { title, message };

    try {
      const response = await fetch("http://localhost:5000/api/capsules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCapsule),
      });

      if (!response.ok) throw new Error("Failed to add capsule");

      const savedCapsule = await response.json();
      setCapsules([...capsules, savedCapsule]);  // Frontend pe update
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error adding capsule:", error);
    }
  };

  // ✅ useEffect se page load hote hi data fetch hoga
  useEffect(() => {
    fetchCapsules();
  }, []);

  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <h1 className="text-primary mb-4">Digital Time Capsule</h1>

      {/* Capsule Input Form */}
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Enter Title"
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Message"
          className="form-control mb-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={addCapsule} className="btn btn-primary w-100">
          Add Capsule
        </button>
      </div>

      {/* Capsules List */}
      <div className="mt-4 w-100" style={{ maxWidth: "400px" }}>
        {capsules.length === 0 ? (
          <p className="text-muted text-center">No capsules found.</p>
        ) : (
          capsules.map((capsule) => (
            <div key={capsule.id} className="card p-3 shadow-sm mb-2">
              <h2 className="h5 text-dark">{capsule.title}</h2>
              <p className="text-muted">{capsule.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DigitalCapsule;
