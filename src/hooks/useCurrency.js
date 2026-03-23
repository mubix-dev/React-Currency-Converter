import { useState,useEffect } from "react";

function useCurrency(currency){
    const [data,setData] = useState({})
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

    useEffect(()=>{
        fetch(url)
        .then((res)=> res.json())
        .then((res)=>setData(res[currency]))
    },[currency])
    console.log(data);   
    return data;
}

export default useCurrency;