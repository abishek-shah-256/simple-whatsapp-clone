import React from 'react'
import {Avatar} from '@material-ui/core';
import './SidebarChat.css';


function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>Abishek shah</h2>
                <p>This is message template </p>
            </div>
        </div>
    )
}

export default SidebarChat
