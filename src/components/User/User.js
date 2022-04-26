import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import KeyIcon from "@mui/icons-material/Key";
import MDButton from "components/MDButton";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import LogoutIcon from "@mui/icons-material/Logout";
import Style from "./User.module.css";
import img from "../../assets/images/apple-icon.png";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Avatar from "react-avatar";
import { useEffect } from "react";
import AddEmployee from "components/Model/AddEmployee";
import UserEdit from "components/Model/UserEdit";
import { IconButton, Tooltip } from "@mui/material";
import PasswordEdit from "components/Model/PasswordEdit";
import { useSelector } from "react-redux";
import { userSelector } from "redux/reducers/user";
import { BASE_URL } from "redux/services";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Edit } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  myClassName: {
    fontSize: "22px !important",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function User() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [action, setAction] = React.useState({ state: false, type: "", data: null });
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event?.currentTarget);
  };
  const [openModel, setOpenModel] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const { user } = useSelector(userSelector);

  const handlelogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.clear();
        navigate("/authentication/sign-in");
      }
    } catch (e) {
      // return
    }
  };

  const handleClickOpen = () => {
    setOpenModel(!openModel);
  };
  const handleClickAway = () => {
    // setOpenModel(false);
    handleClick();
  };

  let { name, role, email } = user;
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <UserEdit Open={openModel} Edit={true} handleClickOpen={handleClickOpen} Employee={user} />
        <PasswordEdit
          {...action}
          handleClose={() => setAction({ state: false, type: "", data: null })}
        />
        <IconButton onClick={handleClick}>
          <Avatar
            name={name}
            size="50"
            round={true}
            aria-describedby={id}
            type="button"
            className={Style.profileBtn}
          />
        </IconButton>
        {/* <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className={Style.profileBtn}
      >
        Profile
      </button> */}
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Card className={Style.card}>
            <div className={Style.cover}>
              <span className={Style.name}>{name}</span>
              <img src={img} alt="image" className={Style.image} />
            </div>
            <div className={Style.detail}>
              <h2>{role} </h2>
              <h3>{email}</h3>
              <div className={Style.icons_wrapper}>
                <Tooltip title="Change password" placement="left">
                  <div className={Style.icon}>
                    <KeyIcon
                      className={classes.myClassName}
                      onClick={() =>
                        setAction({
                          state: true,
                          type: "Change Password",
                          data: user,
                        })
                      }
                    />
                  </div>
                </Tooltip>
                <Tooltip title="Edit profile">
                  <div className={Style.icon}>
                    <Edit className={classes.myClassName} onClick={handleClickOpen} />
                  </div>
                </Tooltip>
                <Tooltip title="Log Out" placement="right">
                  <div className={Style.icon}>
                    <LogoutIcon className={classes.myClassName} onClick={handlelogout} />
                  </div>
                </Tooltip>
              </div>
            </div>
          </Card>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
