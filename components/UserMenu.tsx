import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiLogOut, BiSolidArchiveOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const hoverStyle = {
  bg: "black",
  //make font color white
  color: "white",
};

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box ml="7" mr={"4"}>
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
        <MenuList bg={"white"}>
          <MenuItem bg={"white"} color={"black"} _hover={{ ...hoverStyle }} icon={<BiLogOut size={30} />}>
            logout
          </MenuItem>
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
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserMenu;
