import { Container } from "@material-ui/core";
import React from "react";
import { useFirebase } from "../services/AuthService/Firebase";

const Profile = () => {
  const { loading, user } = useFirebase();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Profile</h2>
      <h4>Email: {user.email}</h4>
    </Container>
  );
};

export default Profile;
