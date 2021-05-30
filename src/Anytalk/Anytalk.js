import { AppBar } from '@material-ui/core';

import React from 'react';
import AppNavbar from '../AppNavbar';
import ChatBox from '../ChatBox/ChatBox';
import Sidebar from '../Sidebar/Sidebar';

const Anytalk = () => {
    return (
        <div >
            {/* <AppNavbar></AppNavbar> */}
            <div style={{display:'flex'}}>
                <Sidebar />
                <ChatBox />
            </div>

        </div>
    );
};

export default Anytalk;