import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import comSlice from "./comSlice";

const store = configureStore({
    reducer:{
        task : taskSlice,
        com : comSlice
    }
})

export default store