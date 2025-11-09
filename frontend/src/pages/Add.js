import {React,useState} from 'react';

const API='http://localhost:5000/api/Books'

export default function Add(){
    const [form,setForm]=useState({
        bookId:'',bookName:"",pubName:"",dop:"",noPages:"",yop:"",cost:""
    });
    const [msg,setMsg]=useState("");
    const [data,setData]=useState(null);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(API,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(form)
            });

            const data=await res.json();
            setMsg(data.msg);
            setData(data.data);
        }catch(err){
            setMsg(data.msg);
            console.log("ERROR");
        }
        
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input name="bookName" type="text" value={form.bookName} onChange={handleChange} placeholder="Book Name" />
            <input name="bookId" type="number" value={form.bookId} onChange={handleChange} placeholder="Book ID" />
            <input name="pubName" type="text" value={form.pubName} onChange={handleChange} placeholder="Publisher Name" />
            <input name="dop" type="date" value={form.dop} onChange={handleChange} placeholder="Date of Publish" />
            <input name="noPages" type="number" value={form.noPages} onChange={handleChange} placeholder="Page Count" />
            <input name="yop" type="date" value={form.yop} onChange={handleChange} placeholder="Year of Publish" />
            <input name="cost" type="number" value={form.cost} onChange={handleChange} placeholder="Cost" />
            <button type="submit">SUBMIT</button>
        </form>
        {msg&&<p>{msg}</p>}
        {data&& (
            <div>
                <p>{data.bookName}</p>
                <p>{data.bookId}</p>
                <p>{data.pubName}</p>
                <p>{data.dop}</p>
                <p>{data.yop}</p>
                <p>{data.noPages}</p>
                <p>{data.cost}</p>
            </div>
        )}
        </>
    );
}