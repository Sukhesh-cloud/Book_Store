import { Link } from "react-router-dom";
import React from 'react';

export default function Home(){
    return (
        <>
        <Link to="/add" className="btn btn-primary m-3">ADD BOOK</Link><br/>
        <Link to="/srch" className="btn btn-primary m-3">SEARCH</Link><br/>
        <Link to="/get" className="btn btn-primary m-3">VIEW ALL</Link><br/>
        <Link to="/delete" className="btn btn-primary m-3">DELETE BY ID</Link><br/>
        <Link to='/update' className="btn btn-primary m-3">Update By ID</Link>
        </>
    );
}