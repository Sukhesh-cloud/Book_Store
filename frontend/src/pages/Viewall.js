import {React,useEffect,useState} from 'react';

export default function ViewAll(){
    const [data,setData]=useState([]);
    const [msg,setMsg]=useState("");

    const fetchAll=async ()=>{
        try{
            const data=await fetch('http://localhost:5000/api/Books/all');
            const res=await data.json();

            if(res){
                setData(res.data);
                setMsg(res.msg);
            }
            setMsg(res.msg);
        }catch(err){
            setMsg("ERROR");
        }
    }

    useEffect(
        ()=>{
            fetchAll();
        },[]
    );
    return (
        <>
        {msg && <p>{msg}</p>}

      {data.length > 0 ? (
        <table border="1" cellPadding="8" className='table table-bordered table-striped table-hover table-success'>
          <thead className="table-dark">
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Publisher Name</th>
              <th>Date of Publish</th>
              <th>Year of Publish</th>
              <th>No. of Pages</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => (
              <tr key={index}>
                <td>{book.bookId}</td>
                <td>{book.bookName}</td>
                <td>{book.pubName}</td>
                <td>{book.dop}</td>
                <td>{book.yop}</td>
                <td>{book.noPages}</td>
                <td>{book.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
       ) : (
        !data && <p>No records found.</p>
      )}
      </>
    )
}