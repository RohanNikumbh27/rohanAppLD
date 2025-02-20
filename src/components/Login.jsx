import { useState } from "react";
import { Button, Input, Card, Form, Typography } from "antd";
import styled from "styled-components";
import { users } from "../config/credentials";

const { Title } = Typography;

// Styled Container
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
`;

// Glassmorphic Card
const StyledCard = styled(Card)`
    width: 350px;
    padding: 30px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    color: #ecf0f1;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Styled Input
const StyledInput = styled(Input)`
    height: 45px;
    border-radius: 8px;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #ecf0f1;
    border: none;
    transition: 0.3s ease-in-out;
    
    &:focus {
        border: 1px solid #3498db;
        box-shadow: 0 0 8px rgba(52, 152, 219, 0.8);
        background-color: rgba(255, 255, 255, 0.3);
    }
    
    &::placeholder {
        color: #bdc3c7;
    }
`;

// Styled Button
const StyledButton = styled(Button)`
    width: 100%;
    height: 45px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    padding:5px;
    padding-bottom:10px;
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #ffffff;
    border: none;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: linear-gradient(135deg, #2980b9, #3498db);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(52, 152, 219, 0.6);
    }
`;

export default function Login({ setUser }) {
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        const foundUser = Object.values(users).find((u) => u.email === email);
        if (foundUser) {
            setUser(foundUser); // Set user in state
        } else {
            alert("User not found!");
        }
    };

    return (
        <LoginContainer>
            <StyledCard>
                <Title level={2} style={{ color: "#ffffff" }}>Welcome to Rohan LD trial</Title>
                <p style={{ color: "#bdc3c7", marginBottom: "20px" }}>
                    Enter your email to sign in.
                </p>
                
                <Form layout="vertical">
                    <Form.Item>
                        <StyledInput
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    
                    <StyledButton type="primary" onClick={handleLogin}>
                        Login
                    </StyledButton>
                </Form>
            </StyledCard>
        </LoginContainer>
    );
}
