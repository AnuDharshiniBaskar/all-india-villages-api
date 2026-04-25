import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const BASE_URL = "https://all-india-villages-api-72wx.onrender.com";

  useEffect(() => {
    axios.get(`${BASE_URL}/states`)
      .then(res => setStates(res.data));
  }, []);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);

    axios.get(`${BASE_URL}/districts?stateId=${stateId}`)
      .then(res => {
        setDistricts(res.data);
        setVillages([]);
      });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    axios.get(`${BASE_URL}/villages?districtId=${districtId}`)
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