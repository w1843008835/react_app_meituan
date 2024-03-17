import { CreateSlice, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name:"foods",
    initialState:{
        //商品列表
        foodsList:[],
        //菜单激活下标值
        activeIndex:0,
        //购物车列表
        cartList:[]

    },
    reducers:{
        //更改商品列表
        setFoodsList(state,action){
            state.foodsList = action.payload;
        },
        //更改activeIndex
        changeActiveIndex(state,action){
            state.activeIndex = action.payload;
        },
        addCart(state,action){
            //以action.payload.id在cartList是否能匹配到判断是否添加过
            const item = state.cartList.find(item => item.id === action.payload.id)
            if(item){
                item.count++
            }else{
                state.cartList.push(action.payload)
            }

        },
        //count增
        increCount(state,action){
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },

        //count减
        decreCount(state,action){
            const item = state.cartList.find(item => item.id === action.payload.id)
            if(item.count === 0){
                return
            }
            item.count--
        },
        //清除购物车
        clearCart(state){
            state.cartList = []

        }


    },
});

const {setFoodsList,changeActiveIndex,addCart,increCount,decreCount,clearCart} = foodsStore.actions;
const fetchFoodsList = () =>{
    return async (dispatch) =>{
        const res = await axios.get("http://localhost:3004/takeaway");
        dispatch(setFoodsList(res.data));
    };
};

export {fetchFoodsList,changeActiveIndex,addCart,increCount,decreCount,clearCart}

const reducer = foodsStore.reducer;
export default reducer;