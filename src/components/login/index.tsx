import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { login } from "../../utils/login";

interface IProps {
  user: any;
  setUser: any;
  handleClose: any
}
const Login: FC<IProps> = ({ user, setUser, handleClose }) => {
    const InitialData = {
        email: 'test@test.com',
        password: '1234567'
    }

    const [users, setUsers] = useState(InitialData)

    const handleLogin =  async  () => {
            const user = await login();
            setUser(user);
            handleClose(true)
    }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Login Here
      </Typography>
      <TextField
        id="outlined-basic"
        type="email"
        label="Email"
        value={users.email}
        variant="outlined"
        style={{ width: "100%", marginBottom: "20px" }}
        onChange={e => setUsers((e as any).target.value)}
      />
      <br />
      <TextField
        id="outlined-basic"
        type="password"
        label="Password"
        value={users.password}
        variant="outlined"
        style={{ width: "100%", marginBottom: "20px" }}
      />
      <br />
      <Button
        style={{ background: "red", width: "100%", color: "white" }}
        onClick={handleLogin}
        disabled={!users}
      >
        Button
      </Button>
    </Box>
  );
};

export default Login;
