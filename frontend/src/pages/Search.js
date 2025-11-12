import {React,useState} from 'react';

const API='http://localhost:5000/api/Books'

export default function Search(){
    const [bookId,setBookId]=useState("");
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
            setBook(data.data);
            console.log(data.data);
        }catch(err){
            console.log(err);
            setMsg("ERROR");
        }
    }

    return(
    <>
        <form onSubmit={handleSearch} className='container border shadow bg-light mt-3 p-4'>
            <input type='number' name='bookId' value={bookId} onChange={handleChange} placeholder='Enter Book Id to Search'></input><br/><br/>
            <button type='submit' className='btn btn-primary'>SEARCH</button>
        </form>
        {msg && <p>{msg}</p>}
        {book &&(
            <div className='card shadow-sm mb-3'>
                <p><strong>Book ID:</strong> {book.bookId}</p>
                <p><strong>Book Name:</strong> {book.bookName}</p>
                <p><strong>Publisher Name:</strong> {book.pubName}</p>
                <p><strong>Date of Publish:</strong> {book.dop}</p>
                <p><strong>Year of Publish:</strong> {book.yop}</p>
                <p><strong>No. of Pages:</strong> {book.noPages}</p>
                <p><strong>Cost:</strong> {book.cost}</p>
            </div>
        )}
    </>
    )
}