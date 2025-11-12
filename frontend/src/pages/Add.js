// import {React,useState} from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const API='http://localhost:5000/api/Books/'

// export default function Add(){
//     const [form,setForm]=useState({
//         bookId:'',bookName:"",pubName:"",dop:"",noPages:"",yop:"",cost:""
//     });
//     const [msg,setMsg]=useState("");
//     const [data,setData]=useState(null);

//     const handleChange=(e)=>{
//         setForm({...form,[e.target.name]:e.target.value});
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//         try{
//             const data=await axios.post(API,form);
//             console.log(data);

//             setMsg(data.data.msg);
//             if(data.data){
//                 setData(data.data.data);
//             }
//             setForm({
//         bookId:'',bookName:"",pubName:"",dop:"",noPages:"",yop:"",cost:""
//     });
//         }catch(err){
//             console.log(data)
//             setMsg(data.msg);
//             console.log("ERROR");
//         }
        
//     }

//     return(
//         <div className='container'>
//         <form className="container p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
//             <h3 className="text-center mb-3">Add New Book</h3>

//             <div className="mb-3">
//                 <label className="form-label">Book Name</label>
//                 <input name="bookName" type="text" value={form.bookName}
//                 onChange={handleChange} className="form-control" placeholder="Enter book name" />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Book ID</label>
//                 <input name="bookId" type="number" value={form.bookId}
//                 onChange={handleChange} className="form-control" placeholder="Enter book ID" />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">Publisher</label>
//                 <input name="pubName" type="text" value={form.pubName}
//                 onChange={handleChange} className="form-control" placeholder="Publisher Name" />
//             </div>

//             <div className="mb-3">
//             <label className="form-label">Date of Publish</label>
//             <input name="dop" type="date" value={form.dop}
//                 onChange={handleChange} className="form-control" />
//             </div>

//             <div className="mb-3">
//             <label className="form-label">Year of Publish</label>
//             <input name="yop" type="date" value={form.yop}
//                 onChange={handleChange} className="form-control" />
//             </div>


        
//             <div className=" mb-3">
//             <label className="form-label">Pages</label>
//             <input name="noPages" type="number" value={form.noPages}
//                 onChange={handleChange} className="form-control" placeholder="Page Count" />
//             </div>

//             <div className="mb-3">
//             <label className="form-label">Cost</label>
//             <input name="cost" type="number" value={form.cost}
//                 onChange={handleChange} className="form-control" placeholder="Cost" />
//             </div>

//             <button type="submit" className="btn btn-primary">Submit</button>
//         </form>

//             {msg && (
//             <div className="alert alert-info text-center mt-3" role="alert">
//                 {msg}
//             </div>
//             )}

//             {data && (
//             <div className="container mt-4 p-3 border rounded">
//                 <h5 className="text-center text-primary mb-3">Book Details</h5>

//                 <p><strong>Book ID:</strong> {data.bookId}</p>
//                 <p><strong>Book Name:</strong> {data.bookName}</p>
//                 <p><strong>Publisher Name:</strong> {data.pubName}</p>
//                 <p><strong>Date of Publish:</strong> {data.dop}</p>
//                 <p><strong>Year of Publish:</strong> {data.yop}</p>
//                 <p><strong>No. of Pages:</strong> {data.noPages}</p>
//                 <p><strong>Cost:</strong> {data.cost}</p>
//             </div>
//             )}

//         </div>
//     );
// }


import {React} from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useForm} from 'react-hook-form';

const API = 'http://localhost:5000/api/Books';

export default function Add(){
    const {register,handleSubmit,reset,formState:{errors}}=useForm();
    const [books,setBooks]=useState([]);
    const onSubmit = async (formData) => {
        try{
            const res=await axios.post(API,formData);
            alert(res.data.msg);
            reset();
        }catch(err){
            alert("Error in Creating ")
        }
    };
    const fetchAll=async ()=>{
        try{
            const data=await fetch('http://localhost:5000/api/Books/all');
            const res=await data.json();
            
            if(res){
                setBooks(res.data);
                
            }
        }catch(err){
            console.log("ERROR",err.message)
        }
    }

    useEffect(
      ()=>{
        fetchAll();
      }
    )

      return (
    <div className="container mt-4 p-4 border rounded bg-light shadow-sm">
      <h4 className="text-center mb-4 text-primary">Add New Book</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Book ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Book ID"
            {...register("bookId", {
              required: "Book ID is Required",
              min: { value: 1, message: "Book ID must be positive" },
            })}
          />
          {errors.bookId && (
            <small className="text-danger">{errors.bookId.message}</small>
          )}
        </div>

    
        <div className="mb-3">
          <label className="form-label">Book Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Book Name"
            {...register("bookName", {
              required: "Book Name is Required",
              minLength: { value: 3, message: "At least 3 characters" },
              maxLength: { value: 40, message: "Max 40 characters allowed" },
            })}
          />
          {errors.bookName && (
            <small className="text-danger">{errors.bookName.message}</small>
          )}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Publisher Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Publisher Name"
            {...register("pubName", {
              required: "Publisher Name is Required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabets allowed",
              },
            })}
          />
          {errors.pubName && (
            <small className="text-danger">
              {errors.pubName.message}
            </small>
          )}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Date of Publish</label>
          <input
            type="date"
            className="form-control"
            {...register("dop", { required: "Date of Publish is Required" })}
          />
          {errors.dop && (
            <small className="text-danger">{errors.dop.message}</small>
          )}
        </div>

       
        <div className="mb-3">
          <label className="form-label">Year of Publish</label>
          <input
            type="date"
            className="form-control"
            {...register("yop", {
              required: "Year of Publish is Required",
            })}
          />
          {errors.yop && (
            <small className="text-danger">{errors.yop.message}</small>
          )}
        </div>

        
        <div className="mb-3">
          <label className="form-label">No. of Pages</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Page Count"
            {...register("noPages", {
              required: "Page Count is Required",
              min: {
                value: 100,
                message: "Minimum 100 Pages Required",
              },
              max: {
                value: 1000,
                message: "Maximum 1000 Pages Allowed",
              },
            })}
          />
          {errors.noPages && (
            <small className="text-danger">{errors.noPages.message}</small>
          )}
        </div>

       
        <div className="mb-3">
          <label className="form-label">Cost (₹)</label>
          <input 
            type="number"
            className="form-control"
            placeholder="Enter Book Cost"
            {...register("cost", {
              required: "Cost is Required",
              min: { value: 1, message: "Cost must be positive" },
              max: { value: 10000, message: "Maximum ₹10,000 allowed" },
            })}
          />
          {errors.cost && (
            <small className="text-danger">{errors.cost.message}</small>
          )}
        </div>

        
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>

      {books.length > 0 ? (
        <table border="1" cellPadding="8" className='table table-bordered table-striped table-hover'>
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
            {books.map((book, index) => (
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
        !books && <p>No records found.</p>
      )}
    </div>
  );

}