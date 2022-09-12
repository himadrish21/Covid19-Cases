import axios from "axios";
import React, { useEffect, useState } from "react";
import './Covid19S.css'

function Covid19S() {
  const [cases, setCases] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
      let fetchData = async () => {
        try{
        let responce = await axios.get("https://data.covid19india.org/data.json");
        setCases(responce.data.statewise);
      }catch(error){
      console.log(error);
    }
  }
    fetchData();
  }, [search]);

  let filterData = cases.filter((ele) => {
    return ele.state.toLowerCase().includes(search);//includes search if the state is present if pressent returns true elese false
  });
  return (
    <div className="covid-container">
      <div className="covid-heading">
      <h1>Coid19 Cases INDIA</h1>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
          placeholder="Search State"
      />
      </div>
      <table>
        <thead>
            <tr>
                <th>SL</th>
                <th>State</th>
                <th>Active</th>
                <th>Confirmed</th>
                <th>Deaths</th>
                <th>Recovred</th>
            </tr>
        </thead>
        {filterData.map(({ active, confirmed, state, deaths,recovered }, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{index+1}</td>
                <td>{state}</td>
                <td>{active}</td>
                <td>{confirmed}</td>
                <td>{deaths}</td>
                <td>{recovered}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Covid19S;
