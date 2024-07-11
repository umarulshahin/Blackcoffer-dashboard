import axios from "axios"
import { reduce } from "d3";
import {useDispatch} from "react-redux"
import { addintensity } from "../Redux/intensitySlice";
import { addstart_year } from "../Redux/start_yearSlice";

const useGetdata = () => {
 
  const dispatch = useDispatch();
    
    const getdata= async ()=>{
     try{
        const response= await axios.get("http://127.0.0.1:8000/Api/dashboard/",{
            headers:{
                'Content-Type' : 'application/json'
    
            }
         })

         if (response.status===200){

          //* intensity storing

            console.log(response.data)
            const{intensity_count,
              year_count
              }=response.data
            dispatch(addintensity(intensity_count))
            dispatch(addstart_year(year_count))

         }

     }catch(error){
       console.log(error)
     }  
 

    }

    return {getdata}
}

export default useGetdata