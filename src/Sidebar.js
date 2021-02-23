import React, { useState, useEffect } from "react";
import './Sidebar.css'; 
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SideOption from './SideOption';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { Modal } from './Modal';
import styled from 'styled-components';
import Channel from "./Channel";


function Sidebar() {

    const [channels, setChannels] = useState([]);
    const [{ user }] = useStateValue();
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
      setShowModal(prev => !prev);
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

    const deleteChannel = (event) => {
      db.collection('rooms').doc(event.currentTarget.id)
          .delete()
          .then(() => console.log('Channel successfully deleted!'))
          .catch(err => console.log(err));
  }



    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__info'>
                <h1>CHORDS</h1>
                <h3>
                  <FiberManualRecordIcon />
                    <div onClick={openModal}>
                      <h2>
                    {user?.displayName}
                    </h2>
                    </div>
                    <Modal showModal={showModal} setShowModal={setShowModal} />
                </h3>
                </div>
                <BorderColorIcon /> 
            
            </div>
            {/* <SideOption Icon={InsertCommentIcon} title="Threads" />
            <SideOption Icon={InsertCommentIcon} title="Threads" />
      <SideOption Icon={InboxIcon} title="Mentions & reactions" />
      <SideOption Icon={DraftsIcon} title="Saved items" />
      <SideOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SideOption Icon={PeopleAltIcon} title="People & user groups" />
      <SideOption Icon={AppsIcon} title="Apps" />
      <hr />
      <SideOption Icon={FileCopyIcon} title="File browser" />
      <SideOption Icon={ExpandLessIcon} title="Show less" />
      <SideOption Icon={ExpandMoreIcon} title="Show more" />
      <hr /> */}
      <SideOption Icon={AddIcon} addChannelOption title="Add Channel" />

     {/* Connect to dB and list all the channels */}
      {/* <SidebarOption ... /> */}
      {channels.map((channel) => (
        <Channel
        key={channel.id}
        title={channel.name} 
        id={channel.id}
        deleteChannel={deleteChannel} />
      ))}
        </div>
    )
}

export default Sidebar
