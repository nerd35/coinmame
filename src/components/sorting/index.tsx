import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
interface IProps {
  filterByName: (query: string)  => any
}
const Sorting:FC<IProps> = ({filterByName}) => {
    
  
    return (
      <Box sx={{ minWidth: 120, width: '200px',  background: 'white',  }}>
        {/* <button onClick={() => filterBy("name")}>Sort name</button> */}
       

        <TextField id="outlined-basic" fullWidth label="Sort by Asset name" variant="outlined" onChange={e => filterByName(e.target.value)} style={{marginRight: '80px'}}/>
        
        
      </Box>
    );
}

export default Sorting;
