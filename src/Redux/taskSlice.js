import { createSlice } from "@reduxjs/toolkit";
import { taskList } from "../db/db";

const taskSlice = createSlice({
    name: "task",
    initialState: taskList,
    reducers:{
        addTask: (state,action)=>{
            state.push(action.payload)
            
        },
        deleteTask: (state,action)=>{
            const {id} = action.payload;
            const update = state.find(task => task.id === parseInt(id));
            if(update){
                return state.filter(task => task.id !== parseInt(id))
            }
        },
        updateTask :(state,action)=>{
            const {id,task} = action.payload
            const update = state.find(task => task.id === parseInt(id))
            if(update){
                update.task = task
            }
        }
    }
})

export const {addTask, deleteTask, updateTask} = taskSlice.actions
export default taskSlice.reducer