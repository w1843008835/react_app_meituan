import { CreateSlice, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name:"foods",
    initialState:{
        //商品列表
        foodsList:[],
        //菜单激活下标值
        activeIndex:0

    },
    reducers:{
        //更改商品列表
        setFoodsList(state,action){
            state.foodsList = action.payload;
        },
        //更改activeIndex
        changeActiveIndex(state,action){
            state.activeIndex = action.payload;
        }
    },
});

const {setFoodsList,changeActiveIndex} = foodsStore.actions;
const fetchFoodsList = () =>{
    return async (dispatch) =>{
        const res = await axios.get("http://localhost:3004/takeaway");
        dispatch(setFoodsList(res.data));
    };
};

export {fetchFoodsList,changeActiveIndex}

const reducer = foodsStore.reducer;
export default reducer;