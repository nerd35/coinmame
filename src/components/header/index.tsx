import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Login from "../login";
import { NavLink } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  user: any;
  setUser: any;
}

const Header: FC<IProps> = ({ user, setUser }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar shadow fixed-top navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand " href="/">
          <strong className="logo">Cryptomining</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink exact  activeClassName="active-link" to={'/'} className="nav-link" >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact  activeClassName="active-link"  to={'/trade'} className="nav-link" >
                Trade
              </NavLink>
            </li>
          </ul>
          <div className="ml-auto">
            {user ? (
              <Button
                style={{ background: "red", color: "white" }}
                onClick={() => {
                  // call logout
                  setUser(null);
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                style={{ background: "red", color: "white" }}
                onClick={handleOpen}
              >
                Login
              </Button>
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Login user={user} setUser={setUser} handleClose={handleClose}  />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
