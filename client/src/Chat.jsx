import React, { Fragment, useContext } from 'react';
import { Layout, Modal, Button, Card } from 'antd';
import AuthContext from './contexts/AuthContext';
import MessageDisplay from './components/MessageDisplay';
import MessageForm from './components/MessageForm';
import GetStarted from './components/GetStarted';

const Chat = () => (
    <Layout>
        <Layout.Sider width={250} style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}>Sider</Layout.Sider>
        <Layout style={{
            marginLeft: '250px'
        }}>
            <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

            </Layout.Header>
            <Layout.Content style={{
                height: 'calc(100vh - 64px - 70px)',
                marginTop: '64px',
                padding: '15px'
            }}
                className="container"
            >
                <MessageDisplay user="goutam" />
            </Layout.Content>
            <Layout.Footer style={{ position: 'fixed', zIndex: 1, width: 'calc(100% - 250px)', bottom: 0, padding: '15px 50px' }}>
                <MessageForm />
            </Layout.Footer>
        </Layout>
    </Layout >
);

export default () => {
    const { user } = useContext(AuthContext);
    return (
        <Fragment>
            {user === '' ? <GetStarted /> : <Chat />}
        </Fragment>
    )
}
// export default Chat;