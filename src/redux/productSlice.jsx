import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchProduct = createAsyncThunk(
    'products/all',
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products`)
        return data
    }
)

export const fetchCategory = createAsyncThunk(
    'products/category',
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products/categories`)
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

export const fetchCategoryImage = createAsyncThunk(
    'products/categoryimage',
    async (item, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${item}`)
        return (data.products.slice(1,2))
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
        increment: (state) => {
            state.value += 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.product = action.payload
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.category = action.payload.slice(0, 4)
            })
            .addCase(fetchCategoryImage.fulfilled, (state, action) => {
                state.categoryimage.push(...action.payload)
            })
            .addCase(fetchCategoryItems.fulfilled, (state, action) => {
                state.categoryitems = action.payload
            })
    },
})

export const { increment } = productSlice.actions

export default productSlice.reducer