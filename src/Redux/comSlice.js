import { createSlice } from "@reduxjs/toolkit";

const comSlice = createSlice({
    name :  "completed",
    initialState : [],
    reducers :{
        addCompleted : (state,action)=>{
            state.push(action.payload)
        },
        deleteCompleted :(state,action)=>{
            const {id} = action.payload;
            const update = state.find(task => task.id === parseInt(id));
            if(update){
                return state.filter(task => task.id !== parseInt(id))
            }
        }
    }
})

export const {addCompleted, deleteCompleted} = comSlice.actions
export default comSlice.reducer