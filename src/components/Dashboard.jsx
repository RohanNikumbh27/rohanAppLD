import { notification, Button, Skeleton } from "antd";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";
import styled from 'styled-components';

export default function Dashboard({ user, onLogout }) {
  const { roleBasedAccess } = useFlags(); // Fetch feature flag
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Show skeleton for 500ms

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (user && roleBasedAccess && !loading) {
      notification.success({
        message: `Signed in as ${user.role}`,
        description: roleBasedAccess, // Display LaunchDarkly flag message
      });
    }
  }, [roleBasedAccess, user, loading]);

  const getContainerBackgroundColor = (role) => {
    switch (role) {
      case 'developer':
        return 'linear-gradient(135deg,rgb(41, 50, 66) 0%,rgb(0, 94, 255) 100%)';
      case 'tester':
        return 'linear-gradient(135deg,rgb(0, 179, 255) 0%,rgb(121, 115, 0) 100%)';
      case 'user':
        return 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)';
      default:
        return 'linear-gradient(135deg, #232526 0%, #414345 100%)';
    }
  };

  const getBackgroundColor = (role) => {
    switch (role) {
      case 'developer':
        return 'linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%)';
      case 'tester':
        return 'linear-gradient(135deg, #ff3d00 0%, #ff9100 100%)';
      case 'user':
        return 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';
      default:
        return 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
    }
  };

  const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: ${props => getBackgroundColor(props.role)};
  `;

  const Container = styled.div`
    margin: 20px;
    text-align: center;
    padding: 20px 40px;
    background: ${props => getContainerBackgroundColor(props.role)};
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s, box-shadow 0.3s;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    }
  `;

  const Title = styled.h2`
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    font-size: 26px;
    margin-bottom: 10px;
  `;

  const Description = styled.p`
    color: #d1d1d1;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
  `;

  const LogoutButton = styled(Button)`
    margin: 20px;
    padding: 20px;
    padding-bottom: 25px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    border: none;
    &:hover {
        background: #000 !important;
        color: #999 !important;
    }
  `;

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <CenteredContainer role={user.role}>
      {loading ? (
        <Skeleton.Node
          active
          style={{
            width: '50vw',
            height: '50vh',
            borderRadius: '15px',
          }}
        />
      ) : (
        <Container>
          <Title>Welcome, {user.email}</Title>
          <Description>roleBasedAccess Flag is {roleBasedAccess?.includes("You are") ? "ON" : "OFF"}.</Description>
          <Description>{roleBasedAccess || "Access not defined"}</Description>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Container>
      )}
    </CenteredContainer>
  );
}
