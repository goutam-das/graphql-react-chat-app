import React, { Fragment, useEffect, useRef, useContext } from 'react';
import { useSubscription, gql } from '@apollo/client';
import AuthContext from '../contexts/AuthContext';

const GET_MESSAGES = gql`
subscription {
    messages {
      id
      user
      content
    }
  }
`;

const MessageDisplay = () => {
    const { user } = useContext(AuthContext);
    const messagesEndRef = useRef(null);
    const { data } = useSubscription(GET_MESSAGES);

    const scrollToBottom = () => {
        messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [data]);
    
    if (!data)
        return null;
    // console.log(data);
    return (
        <Fragment>
            {data.messages.map(({ id, user: messsageUser, content }) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: user === messsageUser ? 'flex-end' : 'flex-start',
                        paddingBottom: '1em'
                    }}
                    key={id}
                >
                    {user !== messsageUser && (
                        <div
                            style={{
                                height: '50px',
                                width: '50px',
                                borderRadius: '25px',
                                marginRight: '0.5em',
                                border: '2px solid #e5e6ea',
                                textAlign: 'center',
                                fontSize: '18pt',
                                lineHeight: '50px',
                                color: 'gray'
                            }}
                        >
                            {messsageUser.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div
                        style={{
                            backgroundColor: user === messsageUser ? '#58bf56' : '#e5e6ea',
                            color: user === messsageUser ? '#ffffff' : '#000000',
                            padding: '1em',
                            borderRadius: '1em',
                            maxWidth: '60%'
                        }}
                    >
                        {content}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </Fragment>
    )
}

export default MessageDisplay;