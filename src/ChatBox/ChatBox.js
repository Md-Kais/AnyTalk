/* eslint-disable array-callback-return */
import { IconButton } from '@material-ui/core';
import {  MicNone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Message from '../MessagesShow/Message.js';

import './ChatBox.css'
import firebase from "firebase"
// import 'firebase/firestore';
import db from '../firebase';
import { selectUser } from '../features/userSlice';
import { selectChatName , selectChatId } from '../features/chatSlice';
import FlipMove from 'react-flip-move';
// import 'firebase/firebase-app';
// import 'firebase/firebase-storage';
// const db = firebase.firestore;
const ChatBox = () => {
  
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            db.collection("chats")
                .doc(chatId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    )

                );
        }
    }, [chatId]);
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        });

        setInput("");
    };
    return (
        <div className="chatBox">
            <div className="chat__header">
                <h4>
                    To: <span className="chat__name">{chatName}</span>
                </h4>
                <strong>Details</strong>
            </div>
            <div className="chat__messages">
                <FlipMove>
                    {messages.map(({ id, data }) => (
                        <Message key={id} contents={data}></Message>
                    ))}
                </FlipMove>
            </div>
            <div className="chat__input">
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter message" type="text" />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton>
                    <MicNone className="chat__mic" />
                </IconButton>
            </div>
        </div>
    );
  
};

export default ChatBox;