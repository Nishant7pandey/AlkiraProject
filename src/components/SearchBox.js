import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({setInput}) => {
    return (
      <TextField
              placeholder="Search teamname , city or division"
              sx={{
                border: "none",
                outline: "none",
                width: "55%",


                "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid blue",
                  },
                },
              }}
              size="small"
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                startAdornment: (<SearchIcon/>
                  
                ),
              }}
              onChange={(event)=>setInput(event.target.value)}
            />
    
    );
}

export default SearchBox;
