import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setChat } from '../features/chatSlice';
import * as timeago from 'timeago.js';
import db from '../firebase';
import './SidebarChat.css'


const useStyles = makeStyles({
    root: {
        "&:hover": {

            borderRadius: '20%'
        }
    }
});
const SidebarChat = ({id,chatName}) => {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() => {
        db.collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setChatInfo(snapshot.docs.map((doc) => doc.data()))
            );
    }, [id]);
    return (
        <div
            onClick={() =>
                dispatch(
                    setChat({
                        chatId: id,
                        chatName: chatName,
                    })
                )
            }
            className="sidebarChat">
            <IconButton>
                <Avatar src={chatInfo[0]?.photo} />
            </IconButton>
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>


    );
};

export default SidebarChat;