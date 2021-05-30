import { IconButton } from '@material-ui/core';
import { Message, MicNone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MessagesShow from '../MessagesShow/MessagesShow';

import './ChatBox.css'
import firebase from "firebase"
import 'firebase/firestore';
// import db from '../firebase';
import { selectUser } from '../features/userSlice';
import { selectChatName , selectChatId } from '../features/chatSlice';
import 'firebase/firebase-app';
import 'firebase/firebase-storage';
const db = firebase.firestore;
const ChatBox = () => {
    const user = useSelector(selectUser);
    


    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId=useSelector(selectChatId)
    console.log(chatId);
    console.log(chatName);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (chatId) {
            
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapShot(function (snapshot) {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            }
            )

        };
    }, [chatId]);
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection("messages").add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp,
            message: input,
            uid: user.uid,
            photo: user.photoURL,
            email: user.email,
            displayName: user.displayName,
        })
        setInput("");
    }
    return (

        <div className="chatBox">

            <div className="chat__header">
                <h4>To: <span className="chat__name ">{chatName}</span></h4>
                <strong>Details</strong>
            </div>
            <div className="chat__messages">
                {messages.map(({ id, data }) => {
                    <MessagesShow key={id} contents={data} />
                })}

            </div>

            <div className="chat__input">
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="AnyTalk"
                        type="text"
                    />
                    <button onClick={sendMessage}>Send</button>
                </form>
                <IconButton>
                    <MicNone></MicNone>
                </IconButton>
            </div>

        </div>

    );
};

export default ChatBox;