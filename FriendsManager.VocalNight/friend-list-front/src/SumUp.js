import { createSlice } from '@reduxjs/toolkit'

export const SumUp = createSlice({
    name: 'newCounter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 5
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = SumUp.actions

export default SumUp.reducer
