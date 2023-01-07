import React,{useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import "./style.css";







const TableBox= ({data}) => {
    const[page,setPage] = useState(1);
    const handleChange =(e,value)=>{
        e.preventDefault();
        setPage(value)

    }
    
    const [show, setShow] = useState(false);
    const [gameData,setgameData] = useState([]);
    const [homeTeam, sethomeTeam] = useState([]);
    const [visitorTeam, setvisitorTeam] = useState([]);
    
    const handleShow = async(id) =>{
      // e.preventDefault();
      const response = await axios.get("https://www.balldontlie.io/api/v1/games")
      const fatchData = response.data.data.find(match => match.home_team.id === id);

      if(fatchData){

        setgameData(fatchData)
        sethomeTeam(fatchData.home_team);
        setvisitorTeam(fatchData.visitor_team)
        // console.log(fatchData.home_team.name)
        setShow(true);
      }else{
        alert("no data found")
      }
    }
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true)

  // console.log(visitorTeam.name)
    return (
      <div className='tableBox'>
        <div className='tablestyle'>
      <Table  bordereless hover >
        <thead >
          <tr >
            <td>Team Name</td>
            <td align="right">City</td>
            <td align="right">Abbreviation</td>
            <td align="right">Conference</td>
            <td align="right">Division</td>
          </tr>
        </thead>
        <tbody>
          {data && data.filter((e,i)=> {
        return i>= 7*(page-1) && i<= 7*(page-1)+6
        
      }).map((row,index) => (
        <tr  key={index} onClick={e=>handleShow(row.id)} >

              <td component="th" scope="row">
                {row.name}
              </td>
              <td align="right">{row.city}</td>
              <td align="right">{row.abbreviation}</td>
              <td align="right">{row.conference}</td>
              <td align="right">{row.division}</td>
            </tr>
          
          ))}
        </tbody>
      </Table>

        </div>
    
    {gameData && <Offcanvas show={show} onHide={handleClose} placement='end'>
      
          <Offcanvas.Header style={{backgroundColor:"rgb(168, 167, 163)",color:"black",fontWeight:"bold"}} closeButton>
            <Offcanvas.Title>{homeTeam.name}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <div style={{fontSize:"23px",margin:"30px"}}> */}
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px"}}>
                <div>
                  Team Full Name
                </div>
                <div>
                  {homeTeam.full_name}
                </div>
              </div>
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px"}}>
                <div>
                  Total Games in 2021
                </div>
                <div>
                  88
                </div>
              </div>
            
            <h5 style={{margin:"10px"}}>Random Games Details:</h5>
            
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px",fontWeight:"bold"}}>
                <div>Date</div>
                <div>{gameData.date ?gameData.date.slice(0,10) : ""}</div>
                
                
              </div>
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px",fontWeight:"bold"}}>
                <div>Home Team</div>
                <div>{homeTeam.name}</div>

                
              </div>
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px",fontWeight:"bold"}}>
                <div>Home Team Score</div>
                <div>{gameData.home_team_score}</div>

                
              </div>
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px",fontWeight:"bold"}}>
                <div>Visitor Team</div>
                <div>{visitorTeam.name}</div>

                
              </div>
              <div style={{display:"flex", justifyContent:"space-between",margin:"30px",fontWeight:"bold"}}>
                <div>Visitor Team Score</div>
                <div>{gameData.visitor_team_score}</div>

                
              </div>
            
          </Offcanvas.Body>
        </Offcanvas>
    }


    {data && <Pagination count={data && Math.ceil(data?.length/7)}   color="secondary" size="large" onChange={handleChange} page={page} variant="contained"   shape="rounded" />}
        </div>
    );
  }
  
  export default TableBox;
  
  
