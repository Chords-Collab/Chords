import React, { useState, useEffect } from 'react'
import './Header.css';
import SearchResults from './SearchResults.js';
import { Avatar } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import Modal from 'react-modal';  


function Header() {
  
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [isChannelShown, setChannelShown] = useState(false);
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);

    const [channels, setChannels] = useState([]);
    const searchGroups = (e) => {
        e.preventDefault(); 
        console.log(input)
        if(input === ""){
            setChannelShown(false); 
        }
        else{
            setChannelShown(true); 
        } 
        openModal();
         
    }
    
    return (
      <div className = 'headSection'>
        <div className='header'>
            <div className='header__left'>
                <Avatar 
                className='header__avatar' 
                alt={user?.displayName}
          src={user?.photoURL}
        />
                <AccessTimeIcon />
            </div>
            <form onSubmit = {searchGroups} className='header__search'>
                 <SearchIcon onClick = {searchGroups}/>
                <input placeholder="Search Group Name" 
                    onChange={(e) => setInput(e.target.value)}/>
             </form>
             <div className='header__right'>
                <HelpOutlineIcon />     
                </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Search Modal"
            >
              <b>Search Result(s):</b>
              <div className = "results_div">
                  <ul>
                      <li onClick={closeModal}>
                      {channels.map((channel) => (
                          isChannelShown && channel.name.includes(input) && <SearchResults className = "searchResults" title={channel.name} id = {channel.id} />
                          ))}
                      </li>
                  </ul>         
             </div>
             </Modal>              
        </div>
    )
}

export default Header

