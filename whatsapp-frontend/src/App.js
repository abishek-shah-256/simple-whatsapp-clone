import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import axios from './axios';
import Login from './Components/Login';
import { auth ,provider } from "./firebase";


function App() {
  const [messages, setMessages] = useState([]);
  const [isuser, setIsuser] = useState(null);

  //lifting the state up from child to parent
  const signIn = () => {
    auth.signInWithPopup(provider)
      // auth.getRedirectResult()
      .then((res) => { setIsuser(res) })
      .catch((error) => { alert(error.message) });
  }

// console.log(isuser.user.displayName);
// console.log(isuser);


  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher('d8c2d21f3b4a651b5773', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      // alert(JSON.stringify(data));
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // console.log(messages);
// console.log('user infoo',isuser);


  return (
    <div className="app">
      { isuser ?
        <div className="app__body">
          <Sidebar />
          <Chat messages={messages} username={isuser.user.displayName}/>
        </div> :

        <Login signIn={signIn}/>
      }


    </div>
  );
}

export default App;
