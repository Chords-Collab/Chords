import React, { useState, useEffect, useRef } from "react";
import './Chat.css';
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import db from "./firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";
import firebase from "firebase";
import Modal from 'react-modal'; 

function Chat() {
    const chatRef = useRef(null);
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const [attach, setAttach] = useState(null);
    const [isChannelShown, setChannelShown] = useState(false);
    const [fileURL, setFileURL] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [modalIsOpen,setIsOpen] = useState(false);
    const [filesModalIsOpen,filesSetIsOpen] = useState(false);
  
    useEffect(() => {
        if (roomId) {
          db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
        }
    
        db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setRoomMessages(snapshot.docs.map((doc) => doc.data()))
          );

        }, [roomId]);

      useEffect(()=>{
        chatRef?.current?.scrollIntoView({behavior: "smooth",});
      });


      console.log(roomDetails);
      console.log("MESSAGES >>> ", roomMessages);

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
    
      const attachFile = (e) =>{
        e.preventDefault();
        openModal();
      }
    
      const uploadFile = (e) =>{
        e.preventDefault(); 
        let  bucketName = roomId;
        let file = attach[0];
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
        let uploadTask = storageRef.put(file);
        closeModal();
      }

      function filesOpenModal() {
        filesSetIsOpen(true);
      }
      function filesCloseModal(){
        filesSetIsOpen(false);
      }

      const listAllFiles = (e) =>{
        e.preventDefault();
        filesOpenModal();
        setFileName([]);
        setFileURL([]);
        firebase.storage().ref().child(roomId+"/").listAll().then(function(result){
          result.items.forEach(function(fileRef){
            displayFileNames(fileRef)
          })
        });
      }

      function displayFileNames(fileRef){
        console.log( fileRef);
        fileRef.getDownloadURL().then(function(url){
          setFileURL(oldURL => [...oldURL, url]);
          setFileName(oldName => [...oldName, fileRef.name]);
        });        
      }

    return (
        <div className='chat'>
            
            <div className='chat__header'>
                <div className='chat__headerLeft'>

                  <h4 className='chat__channelName'>
                  <strong>#{roomDetails?.name}</strong>
                  <StarBorderOutlinedIcon />
                  </h4>
                </div>
                <div className='chat__headerRight'> 
                  <button onClick={listAllFiles}>Files</button>
		  <div className='chat__headerRight'>
                    <p>
                    <a href="https://pace.zoom.us/my/chords" class="button">Join Meeting</a>
                    </p>
                </div>

                  <Modal
                    isOpen={filesModalIsOpen}
                    onRequestClose={filesCloseModal}
                    style={customStyles}
                    contentLabel="File Listing">
                    <div className="attachModalDiv">
                      <b>All Files</b>
                      {fileName.map((item, index) => (
                        <a href={fileURL[index]} download>{item}</a>
                      ))}
                    </div>         
                  </Modal>
                </div>
            </div> 
            <div className="chat__messages">
              {roomMessages.map(({ message, timestamp, user, userimage }) => (
                <Message
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userimage={userimage}
                />
              ))}      
        
      </div>
      <div className="chat_bottom_container">
        <div className="chat_bottom" ref={chatRef}></div>
          <ChatInput
          chatRef={chatRef}
          channelName={roomDetails?.name} channelId={roomId} />
          <button className = "attachButton" id="attach" type = "file" onClick={attachFile}   >
            Attach
          </button>
      </div>   
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Attach File">
          <div className="attachModalDiv">
            <b>Upload File</b>
            <input type = "file"  className = "attachFileInput" onChange = {(e) => setAttach(e.target.files)} />        
            <button className="upload" onClick= {uploadFile}>Upload</button>
          </div>         
      </Modal>
    </div>      
    )
}

export default Chat 
