import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
interface IProps {
  filterByPrice: (query: string)  => any
}
const FilterByPrice:FC<IProps> = ({filterByPrice}) => {
    
  
    return (
      <Box sx={{ minWidth: 120, width: '200px',  background: 'white',  }}>
        {/* <button onClick={() => filterBy("name")}>Sort name</button> */}
       

        <TextField id="outlined-basic" fullWidth label="Sort by Asset Price" variant="outlined" onChange={e => filterByPrice(e.target.value)} style={{marginRight: '80px'}}/>
        
        
      </Box>
    );
}

export default FilterByPrice;
