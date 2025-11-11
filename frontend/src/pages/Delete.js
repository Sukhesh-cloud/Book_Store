import { useState,React } from "react";
const API="http://localhost:5000/api/Books";

export default function Delete(){
    const [bookId,setBookId]=useState("");
    const [msg,setMsg]=useState("");
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`${API}/${bookId}`,{
                method:"DELETE"
            });
            const data=await res.json();
            setMsg(data.msg)
        }catch(err){
            console.log("ERRR");
        }
    }


    const handleChange=(e)=>{
        setBookId(e.target.value);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="number" name="bookId" value={bookId} onChange={handleChange} />
            <button type="submit">Delete</button>
        </form>
        {msg && <p>{msg}</p>}
        </>
    )
}