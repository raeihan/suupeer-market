// import React from 'react'
// import { useState } from 'react'

// const CounterApp = () => {

//     const [count, setCount] = useState(0)

//   return (
//     <>
//     <h2>Counter</h2>
//     <Minus count={count} setCount={setCount}/>
//     <h2>{count}</h2>
//     <Plus count={count} setCount={setCount}/>
//     </>
//   )
// }

// export default CounterApp

// const Minus = ({count,setCount}) => {
//     return (
//         <>
//         <button onClick={() => setCount(count - 1)}>-</button>
//         </>
//     )
// }

// const Plus = ({count,setCount}) => {
//     return (
//         <>
//         <button onClick={() => setCount(count + 1)}>+</button>
//         </>
//     )
// }

import React from 'react'
import { useCounter } from '../utils/store/userCounter'

const CounterApp = () => {

    const {count} = useCounter()

  return (
    <>
    <h2>Counter</h2>
    <Minus/>
    <h2>{count}</h2>
    <Plus/>
    </>
  )
}

export default CounterApp

const Minus = () => {

    const {btnMinus} = useCounter()

    return (
        <>
        <button onClick={btnMinus}>-</button>
        </>
    )
}

const Plus = () => {

    const {btnPlus} = useCounter()

    return (
        <>
        <button onClick={btnPlus}>+</button>
        </>
    )
}