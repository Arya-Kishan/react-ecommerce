import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getFirestore, doc, addDoc, setDoc, getDoc, collection, getDocs, where, query } from 'firebase/firestore'
import { app } from '../firebase/Firebase'

const db = getFirestore(app);

export const getFirebaseData = createAsyncThunk(
    'firebase/get',
    async (userId, thunkAPI) => {
        const collection_ref = collection(db, "message");
        const q = query(collection_ref, where('title', '==', `${userId}`))
        const snap = await getDocs(q)
        console.log(snap.docs.map((e) => (e.data())));
        return (snap.docs.map((e) => (e.data())))

    }
)

export const addFirebaseData = createAsyncThunk(
    'firebase/add',
    async (userId, thunkAPI) => {
        console.log("addFirebaseData");
        const response = await addDoc(collection(db, 'message'), userId)
        console.log(response);
        console.log("addFirebaseData");
        return "nothing just chill guys"
    }
)


const initialState = {
    value: 0,
    getMessage: null,
    addMessage: null,
}

export const fireSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFirebaseData.fulfilled, (state, action) => {
                state.getMessage = action.payload
            })
            .addCase(addFirebaseData.fulfilled, (state, action) => {
                state.addMessage = action.payload
            })
    },
})

export const { increment } = fireSlice.actions

export default fireSlice.reducer