import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import { Box} from '@mui/material'
// import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import ProfitTable from './ProfitTable';
import { ProfitData } from '../../Utils/TrialData';

const ProfitPage = () => {

      var dateVal = 0
      var dateVal2 = 0
      const handleDate=(e)=>{
        dateVal = new Date((e.target.value));
        dateVal2 = `${dateVal.getFullYear()}-${dateVal.getMonth()+1}-${dateVal.getDate()}`;
        // console.log(dateVal2);
        sortByDate();
  }
  var ddate = 0
  var ddate2 = 0
  const [DateSortedArray2, setDateSortedArray2] = useState(ProfitData)
  var DateSortedArray = ProfitData;
  const sortByDate= ()=>{
    DateSortedArray =[];
      ProfitData.forEach(element => {
         ddate= new Date(element.date);
        ddate2= `${ddate.getFullYear()}-${ddate.getMonth()+1}-${ddate.getDate()}`;
        if(ddate2 === dateVal2){
          DateSortedArray.push(element);
        }
      });
setDateSortedArray2(DateSortedArray)
    // console.log(DateSortedArray)
    // console.log(DateSortedArray2)
  }
  // sortByDate();

  return (
    <>
      <Box>
        <AdminHeader/>
        
<ProfitTable DataArray={DateSortedArray2} handleDate={handleDate}/>
      </Box>
    </>
  )
}

export default ProfitPage
