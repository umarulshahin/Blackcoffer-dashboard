import { createSlice } from "@reduxjs/toolkit";




const start_yearSlice = createSlice({
    name:"start_year",
    initialState:{
        data:{},
    },
    reducers:{
        addstart_year:(state,action)=>{
            state.data=action.payload
        },
    },
    
});


export const {addstart_year}=start_yearSlice.actions;

export default start_yearSlice.reducer;