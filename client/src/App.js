import './App.css';
import io from 'socket.io-client';     
import {useState} from 'react';
import {Chat} from './Chat';                

const socket = io.connect('http://localhost:3001');      


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit("join_room", room);
      setShowChat(true);  
    }
  }


  return (
      <div className="App">
        { !showChat ?
          (<div className='joinChatContainer'>
            <h3>Join A new Chat!</h3>
            <input type='text' placeholder='Tony Shi...' onChange={(event) => {
              setUsername(event.target.value);
            }}/>
            <input type='text' placeholder='Enter the room id...' onChange={(event) => {
              setRoom(event.target.value);
            }}/>
            <button onClick={joinRoom}>Join the room!</button>
          </div>) :
          (<Chat socket={socket} username={username} room={room}/>)
        }  
      </div>

  );
}

export default App;
