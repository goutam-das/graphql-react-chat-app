import React, { useState, useContext } from 'react';
import { Card, Row, Col, Input, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import AuthContext from '../contexts/AuthContext';

const GetStarted = () => {
    const { setUser } = useContext(AuthContext);
    const [name, setName] = useState('');

    const onGetStarted = () => {
        if (name.trim() !== '') {
            setUser(name);
            setName('');
        }
    }

    return (
        <div className="get-started">
            <Card title="Welcome Back !" bordered={false} style={{ width: 300 }}>
                <Row>
                    <Col span={24}>
                        <div className="input-container">
                            <Input
                                placeholder="Name"
                                size="large"
                                value={name}
                                onChange={({ target: { value } }) => setName(value)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={24}>
                        <div className="button-container">
                            <Button
                                type="primary"
                                icon={<CaretRightOutlined />}
                                size="large"
                                // loading={true}
                                onClick={onGetStarted}
                            >Get Started</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default GetStarted;