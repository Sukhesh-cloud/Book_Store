import {React,useState} from 'react';

const API='http://localhost:5000/api/Books'

export default function Search(){
    const [bookId,setBookId]=useState(0);
    const [book,setBook]=useState(null);
    const [msg,setMsg]=useState("");

    const handleChange=(e)=>{
        setBookId(e.target.value);
    }

    const handleSearch=async (e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`${API}/${bookId}`);
            const data=await res.json();
            setMsg(data.msg);
            setBook(data.data[0]);
            console.log(data.data[0]);
        }catch(err){
            console.log(err);
            setMsg("ERROR");
        }
    }

    return(
        <>
        <form onSubmit={handleSearch} className='container border shadow bg-light'>
            <input type='number' name='bookId' value={bookId} onChange={handleChange} placeholder='Enter Book Id to Search'></input><br/><br/>
            <button type='submit'>SEARCH</button>
        </form>
        {msg && <p>{msg}</p>}
        {book &&(
            <div className='card shadow-sm mb-3'>
                <p>{book.bookName}</p>
                <p>{book.bookId}</p>
                <p>{book.pubName}</p>
                <p>{book.dop}</p>
                <p>{book.yop}</p>
                <p>{book.noPages}</p>
                <p>{book.cost}</p>
            </div>
        )}
        </>
    )
}