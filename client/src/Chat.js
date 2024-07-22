import {useState, useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";


export function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState(''); 
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
         if (currentMessage !== '') {
            const messageData = {      
                room: room,
                author: username,
                message: currentMessage,    //Date.now() ---the static method in the Date class -----representing the current time in 
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()    //implicit data type conversion 
            }

            await socket.emit('send_message', messageData);
            setMessageList((prev) => {
                return [...prev, messageData];
            });
            setCurrentMessage('');
         }
    }


    useEffect(() => {
            socket.off("receive_message").on("receive_message", (data) => {   
                setMessageList((list) => [...list, data]);
            });
    }, [socket]);   //the useEffect can listen the change to both the states and the local variable




     return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>Live Chat with <Name_adding messageList={messageList} username={username}/></p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                    {messageList.map((message) => {
                        return  (
                        <div className='message' id={username === message.author ? 'you' : 'other'}>
                            <div>
                                <div className='message-content'>
                                    <p>{message.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{message.time}</p>
                                    <p id='author'>{message.author}</p>
                                </div>
                            </div>
                        </div>);
                    })}
                </ScrollToBottom>    
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Start typing...." value={currentMessage} onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        sendMessage();
                    }
                }} onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
     )
}


function Name_adding({messageList, username}) {
    let guestName = "";
    for (let i = 0; i < messageList.length; ++i) {
        if (messageList[i].author !== username) {
            guestName = messageList[i].author;
        }
    }

    return <>{guestName}</>;
}



export default Chat;