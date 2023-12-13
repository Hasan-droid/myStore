import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiLogOut, BiLogIn, BiSolidArchiveOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFromHomePage } from "../Redux/features/LoginInSlicer";

const hoverStyle = {
  bg: "black",
  //make font color white
  color: "white",
};

interface ITypes {
  props: {
    handleLogOut: () => void;
    userToken: string;
  };
}

const UserMenu: React.FC<ITypes["props"]> = ({ handleLogOut, userToken, isAdmin }) => {
  const pageDocument = document.location.pathname.split("/")[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box ml="7" mr={"4"}>
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
        <MenuList bg={"white"}>
          {userToken && (
            <MenuItem
              bg={"white"}
              color={"black"}
              _hover={{ ...hoverStyle }}
              icon={<BiLogOut size={30} />}
              onClick={() => handleLogOut()}
            >
              Logout
            </MenuItem>
          )}
          {!userToken && (
            <MenuItem
              bg={"white"}
              color={"black"}
              _hover={{ ...hoverStyle }}
              icon={<BiLogIn size={30} />}
              onClick={() => {
                navigate("/signin");
                dispatch(loginFromHomePage(pageDocument));
              }}
            >
              Login
            </MenuItem>
          )}
          {!isAdmin && (
            <MenuItem
              bg={"white"}
              color={"black"}
              _hover={hoverStyle}
              icon={<BiSolidArchiveOut size={30} />}
              onClick={() => {
                navigate("/orders");
              }}
            >
              orders
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserMenu;
