import React from 'react';
import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import { RateReviewOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { setChat } from '../features/chatSlice';




const useStyles = makeStyles({
    root: {
        "&:hover": {

            borderRadius: '20%'
        }
    }
});
const SidebarChat = ({id,chatName}) => {
    const classes = useStyles();
    const dispatch= useDispatch();
    return (
        <div>
            <div
            onClick = {()=>dispatch(
                setChat({
                    chatId:id,
                    chatName:chatName,
                })
            )} 
            className="sidebarChat">

                <div className="iconBar">
                    <IconButton className={classes.root}>
                        <Avatar className="iconSize" fontSize="large" />
                    </IconButton>
                </div>
                <div className="sidebarChat__info">
                    <h3>{chatName}</h3>
                    <p>Last sent message</p>
                    <small>timestamp</small>
                </div>
            </div>
        </div>


    );
};

export default SidebarChat;