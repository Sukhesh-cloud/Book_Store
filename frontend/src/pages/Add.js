import {React,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const API='http://localhost:5000/api/Books/'

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
            const data=await axios.post(API,form);
            console.log(data);

            setMsg(data.data.msg);
            setData(data.data.data);
            setForm({
        bookId:'',bookName:"",pubName:"",dop:"",noPages:"",yop:"",cost:""
    });
        }catch(err){
            setMsg(data.msg);
            console.log("ERROR");
        }
        
    }

    return(
        <div className='container'>
        <form className="container p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
            <h3 className="text-center mb-3">Add New Book</h3>

            <div className="mb-3">
                <label className="form-label">Book Name</label>
                <input name="bookName" type="text" value={form.bookName}
                onChange={handleChange} className="form-control" placeholder="Enter book name" />
            </div>

            <div className="mb-3">
                <label className="form-label">Book ID</label>
                <input name="bookId" type="number" value={form.bookId}
                onChange={handleChange} className="form-control" placeholder="Enter book ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">Publisher</label>
                <input name="pubName" type="text" value={form.pubName}
                onChange={handleChange} className="form-control" placeholder="Publisher Name" />
            </div>

            <div className="mb-3">
            <label className="form-label">Date of Publish</label>
            <input name="dop" type="date" value={form.dop}
                onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
            <label className="form-label">Year of Publish</label>
            <input name="yop" type="date" value={form.yop}
                onChange={handleChange} className="form-control" />
            </div>


        
            <div className=" mb-3">
            <label className="form-label">Pages</label>
            <input name="noPages" type="number" value={form.noPages}
                onChange={handleChange} className="form-control" placeholder="Page Count" />
            </div>

            <div className="mb-3">
            <label className="form-label">Cost</label>
            <input name="cost" type="number" value={form.cost}
                onChange={handleChange} className="form-control" placeholder="Cost" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

            {msg && (
            <div className="alert alert-info text-center mt-3" role="alert">
                {msg}
            </div>
            )}

            {data && (
            <div className="container mt-4 p-3 border rounded">
                <h5 className="text-center text-primary mb-3">Book Details</h5>

                <p><strong>Book ID:</strong> {data.bookId}</p>
                <p><strong>Book Name:</strong> {data.bookName}</p>
                <p><strong>Publisher Name:</strong> {data.pubName}</p>
                <p><strong>Date of Publish:</strong> {data.dop}</p>
                <p><strong>Year of Publish:</strong> {data.yop}</p>
                <p><strong>No. of Pages:</strong> {data.noPages}</p>
                <p><strong>Cost:</strong> {data.cost}</p>
            </div>
            )}

        </div>
    );
}