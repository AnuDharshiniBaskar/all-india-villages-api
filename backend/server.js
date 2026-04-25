const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// STATIC DATA
const states = [
  { id: 1, name: "Tamil Nadu" },
  { id: 2, name: "Maharashtra" },
  { id: 3, name: "Karnataka" }
];

const districts = [
  { id: 1, name: "Chennai", stateId: 1 },
  { id: 2, name: "Coimbatore", stateId: 1 },
  { id: 3, name: "Mumbai", stateId: 2 },
  { id: 4, name: "Pune", stateId: 2 },
  { id: 5, name: "Bangalore", stateId: 3 }
];

const villages = [
  { id: 1, name: "Tambaram", districtId: 1 },
  { id: 2, name: "Velachery", districtId: 1 },
  { id: 3, name: "Pollachi", districtId: 2 },
  { id: 4, name: "Andheri", districtId: 3 },
  { id: 5, name: "Baner", districtId: 4 }
];

// ROUTES
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/states", (req, res) => {
  res.json(states);
});

app.get("/districts", (req, res) => {
  const stateId = parseInt(req.query.stateId);
  const filtered = districts.filter(d => d.stateId === stateId);
  res.json(filtered);
});

app.get("/villages", (req, res) => {
  const districtId = parseInt(req.query.districtId);
  const filtered = villages.filter(v => v.districtId === districtId);
  res.json(filtered);
});

// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});