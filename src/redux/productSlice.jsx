import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProduct = createAsyncThunk(
    'products/all',
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products?limit=14`)
        return data
    }
)

export const fetchCategoryItems = createAsyncThunk(
    'products/categoryitems',
    async (item, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${item}`)
        return data
    }
)

const initialState = {
    product: {},
    category: [],
    categoryitems: {},
    categoryimage: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getCategory: (state, action) => {
            state.category = action.payload
        },
        getCategoryImages: (state, action) => {
            state.categoryimage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.product = action.payload
            })
            .addCase(fetchCategoryItems.fulfilled, (state, action) => {
                state.categoryitems = action.payload
            })
    },
})

export const { getCategory, getCategoryImages } = productSlice.actions

export default productSlice.reducer