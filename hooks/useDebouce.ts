import { useEffect, useState } from "react"



export const useDebouce =  <T>(value : T, delay : number) => {
    const [deboucedValue, setDeboucedValue] = useState(value)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDeboucedValue(value)
        },delay)

        return () => clearTimeout(timerId)
    },[value])
    return deboucedValue
}