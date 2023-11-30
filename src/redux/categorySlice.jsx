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

export const fetchSingleProduct = createAsyncThunk(
    'item/singleProduct',
    async (item, thunkAPI) => {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${item.category}`)
        let a = data.products.filter((e)=>(e.title == item.title) )
        return a[0];
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
    singleProduct:null,
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
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload
            })
    },

})

export const { getsingleproduct } = categorySlice.actions

export default categorySlice.reducer