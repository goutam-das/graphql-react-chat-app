import React, { useState, useRef, useContext } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import AuthContext from '../contexts/AuthContext';

const POST_MESSAGES = gql`
mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
}
`;

const MessageForm = () => {
    const { user } = useContext(AuthContext);
    const messageForm = useRef(null);
    const [content, setContent] = useState('');
    const [postMessage] = useMutation(POST_MESSAGES);

    const onSend = () => {
        if (content.trim()) {
            // event.preventDefault();
            // const form = messageForm.current;
            // console.log(form['content'].value);
            console.log('onSend');
            // form['content'].value = '';
            postMessage({ variables: { user, content } });
            // input.value = '';
            setContent('');
        }
    }
    console.log('MessageForm')
    return (
        // <form ref={messageForm} onSubmit={onSend}>
        <Row>
            <Col span={24} style={{
                display: 'flex'
            }}>

                <Input size="large"
                    name="content"
                    style={{
                        borderRadius: '15px',
                        marginRight: '15px'
                    }}
                    placeholder="Type a message..."
                    value={content}
                    onChange={({ target: { value } }) => setContent(value)}
                    onKeyUp={(event) => {
                        if (event.keyCode === 13) {
                            onSend();
                        }
                    }}
                />
                <Button
                    type="primary"
                    size="large"
                    shape="circle"
                    icon={<SendOutlined />}
                    onClick={() => onSend()}
                />
            </Col>
        </Row>
        // </form>
    )
}

export default MessageForm;