import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './SumUp'


export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const newCount = useSelector((state) => state.newCounter.value)
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button 
                aria-label="Increment value"
                onClick={() => dispatch(increment())}> 
                    Increment
                </button>
                <span>{newCount}</span>
                <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    )
}
