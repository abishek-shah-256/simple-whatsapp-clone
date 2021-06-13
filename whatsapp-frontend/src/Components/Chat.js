import React, { useEffect, useState } from 'react';
import './chat.css';
import { Avatar ,IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../axios';

function Chat({messages, username}) {
    const [input, setinput] = useState("");
    const [activeUser, setactiveUser] = useState(false);

    useEffect(() => {
        messages.map((message) => {
            // console.log('wowowow',message.name)
            if(message.name === username){
                return setactiveUser(true);
            }
            else{
                return setactiveUser(false);
            }
        })
    }, [messages,username])

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            message: input,
            name: username,
            timestamp: "12:00 pm",
            received: activeUser,
        });

        setinput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
                <div className="chat__body">
                    {messages.map((message) => (

                    <p className={`chat__message ${(message.name === username) && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                    ))}

                </div>

                <div className="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input value={input} onChange={e => setinput(e.target.value)} type="text" placeholder="Send a message..." />
                        <button onClick={sendMessage} type="Type a message">Send a message</button>
                    </form>
                    <MicIcon />
                </div>
        </div>
    )
}

export default Chat
