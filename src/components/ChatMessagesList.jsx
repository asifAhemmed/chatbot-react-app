import React, { useEffect, useRef } from 'react';
import ChatMessagesCard from './ChatMessagesCard';

const ChatMessagesList = ({ messages, loading }) => {
    const messageContainerRef = useRef(null);

    useEffect(() => {
        const messageElem = messageContainerRef.current;
        if (messageElem) {
            messageElem.scrollTop = messageElem.scrollHeight;
        }
    }, [messages]);

    return (
        <div 
          className="chat-messages-container"
          ref={messageContainerRef}
        >
            {
                messages.map((message, index) => (
                    <ChatMessagesCard 
                        message={message} 
                        loading={loading} 
                        isLastMessage={index === messages.length - 1}
                        key={message.id}
                    />
                ))
            }
        </div>
    );
};

export default ChatMessagesList;