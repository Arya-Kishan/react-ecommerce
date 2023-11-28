import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { value: null }

export const fetchSearchItem = createAsyncThunk(
    'search/items',
    async (userId, thunkAPI) => {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${userId}`)
      return response.data.products;
    }
  )


const searchSlice = createSlice({
  name: 'getSearch',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchSearchItem.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

export const { increment } = searchSlice.actions
export default searchSlice.reducer