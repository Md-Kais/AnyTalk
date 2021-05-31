import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import { RateReviewOutlined } from '@material-ui/icons';
import './Sidebar.css'
import SidebarChat from '../SidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth, provider } from '../firebase';
const useStyles = makeStyles({
    root: {
        "&:hover": {

            borderRadius: '20%'
        }
    }
});
const Sidebar = () => {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        db.collection("chats").onSnapshot((snapshot) => {
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })

                )
            )
        })
    }, [])
    const addChat = () => {
        
        const chatName = prompt("Please enter a chat name");
        if (chatName) {
            db.collection("chats").add({
                chatName: chatName,
            });
        }
    }
    return (
        <div className="sidebar" >
            <div className="sidebarChat">
               
                    <IconButton className={classes.root}>
                    <Avatar onClick={() => auth.signOut()} src={user.photo} className="iconSize" fontSize="large" />
                    </IconButton>
               
                <div className="sidebarChat__info">
                    <h3>{user.displayName}</h3>
                </div>
            </div>
            <div className="sidebarChat" onClick={addChat}>
                <div className="iconBar"  >
                    <IconButton className={classes.root}>
                        <RateReviewOutlined className="iconSize" fontSize="large" />
                    </IconButton>
                </div>
                <div className="sidebarChat__info" >
                    <h3>Start new Chat</h3>
                </div>
            </div>
            <div className="sidebar__chats">
                {chats.map(({ id, data: { chatName } }) => (
                    <SidebarChat key={id} id={id} chatName={chatName} />
                ))};




            </div>

        </div>

    );
};

export default Sidebar;