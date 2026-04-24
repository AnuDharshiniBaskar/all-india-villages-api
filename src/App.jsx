import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/states")
      .then(res => setStates(res.data));
  }, []);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);

    axios.get(`http://localhost:5000/districts?stateId=${stateId}`)
      .then(res => {
        setDistricts(res.data);
        setVillages([]); // reset villages
      });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    axios.get(`http://localhost:5000/villages?districtId=${districtId}`)
      .then(res => setVillages(res.data));
  };

  return (
    <div>
      <h2>Select State</h2>
      <select onChange={handleStateChange}>
        <option>Select State</option>
        {states.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <h2>Select District</h2>
      <select onChange={handleDistrictChange}>
        <option>Select District</option>
        {districts.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <h2>Select Village</h2>
      <select>
        <option>Select Village</option>
        {villages.map(v => (
          <option key={v.id}>{v.name}</option>
        ))}
      </select>
    </div>
  );
}

export default App;