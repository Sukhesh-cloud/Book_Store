import { Link } from "react-router-dom";
import React from 'react';

export default function Home(){
    return (
        <>
        <Link to="/add">ADD BOOK</Link><br/><br/>
        <Link to="/srch">SEARCH</Link><br/><br/>
        <Link to="/get">VIEW ALL</Link><br/><br/>
        </>
    );
}