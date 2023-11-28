import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategoryItems = createAsyncThunk(
    'item/categoryitems',
    async (item, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${item}`)
        return data.products
    }
)

export const getRelatedItems = createAsyncThunk(
    'item/relateditems',
    async (category, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${category.category}`)
        return (data.products.filter((e) => (
            e.id !== category.product.id

        )))
    }
)

const initialState = {
    singleitem: null,
    categoryitems: null,
    relateditems: null,
}

export const categorySlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getsingleproduct: (state, action) => {
            state.singleitem = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryItems.fulfilled, (state, action) => {
                state.categoryitems = action.payload
            })
            .addCase(getRelatedItems.fulfilled, (state, action) => {
                state.relateditems = action.payload
            })
    },

})

export const { getsingleproduct } = categorySlice.actions

export default categorySlice.reducer