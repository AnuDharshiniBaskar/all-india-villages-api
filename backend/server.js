const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "YOUR_NEON_DB_URL",
  ssl: { rejectUnauthorized: false }
});

// 👇 INGA ADD PANNUNGA
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

app.get("/states", async (req, res) => {
  const result = await pool.query("SELECT * FROM State");
  res.json(result.rows);
});

app.get("/districts", async (req, res) => {
  const stateId = req.query.stateId;

  const result = await pool.query(
    "SELECT * FROM District WHERE state_id = $1",
    [stateId]
  );

  res.json(result.rows);
});

app.get("/villages", async (req, res) => {
  const districtId = req.query.districtId;

  const result = await pool.query(
    "SELECT * FROM Village WHERE district_id = $1",
    [districtId]
  );

  res.json(result.rows);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});