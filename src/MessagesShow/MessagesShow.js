import { Avatar } from '@material-ui/core';
import React from 'react';
import './MessagesShow.css'
const MessagesShow = ({id,content}) => {
    return (
        <div className="message">
            <Avatar/>
            <p></p>
        </div>
    );
};

export default MessagesShow;