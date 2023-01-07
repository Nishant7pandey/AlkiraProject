// import logo from './logo.svg';
import {useState,useEffect} from "react";
import './App.css';
import SearchBox from './components/SearchBox';
import TableBox from './components/Table';
import axios from "axios";


function App() {
  const[data,setData] = useState([]);
  const[filtereddata,setfilteredData] = useState();
  const[input,SetInputVal] = useState("");

  const setInput=(value)=>{
    SetInputVal(value);
      const filterData = data.filter((element)=>{
        if(element.name.toLowerCase().includes(value.toLowerCase())){

          return element
        }})
        setfilteredData(filterData);
    
    }
  
  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get("https://www.balldontlie.io/api/v1/teams")

      setData(response.data.data);
      setfilteredData(response.data.data);
    }
    fetchData();
    // setfilteredData(data);

  },[])

  

  return (
    <div className="App">
      
      <h3>NBA TEAM</h3>
      <SearchBox  setInput={setInput}/>
      <TableBox data={filtereddata}/>

      
    </div>
  );
}

export default App;
