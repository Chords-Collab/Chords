import React,{ useState, useEffect } from 'react'
import db from "./firebase";
import { useHistory } from "react-router-dom";
import "./SearchResults.css";
function SearchResults( {title, id}) {
    const history = useHistory();
    const selectChannel = () => {
        if (id) {
          history.push(`/room/${id}`);
      }
    };
    return(
        <div className = "SearchResult">
            <div className="SearchChannel" onClick = {selectChannel}>{title}</div>
        </div>      
    );   
}

export default SearchResults