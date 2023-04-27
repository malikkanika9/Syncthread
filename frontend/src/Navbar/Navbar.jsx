import {
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

import { HamburgerIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  let navigate = useNavigate();
  let Token = localStorage.getItem("token");
  let logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Flex
      w={"100%"}
      height={"80px"}
      align={"center"}
      justifyContent="space-evenly"
    >
      <Box w={{ sm: "15%", md: "10%", lg: "5%" }} h={"100%"} p={2}>
        <Link to={"/"}>
          <Image w={"100%"} h={"100%"} src="./home-page.png" />
        </Link>
      </Box>
      <Flex
        display={["none", "none", "none", "flex"]}
        align={"center"}
        justifyContent="space-evenly"
        width={"70%"}
        fontSize={["10px", "14px", "16px", "16px"]}
        color="teal.900"
        fontWeight={500}
      >
        <Box>
          <Link to={"/dashboard"}>Dashboard</Link>
        </Box>
        <Box>
          <Link to={"/map"}>Maps</Link>
        </Box>

        {!Token ? (
          <Box>
            <Link to={"/signup"}>SignUp</Link>
          </Box>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<VscAccount />}
            />
            <MenuList>
              <MenuItem onClick={() => logOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          display={["flex", "flex", "flex", "none"]}
        />
        <MenuList zIndex={700}>
          <MenuItem>
            <Box>
              <Link to={"/dashboard"}>Dashboard</Link>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Link to={"/map"}>Maps</Link>
            </Box>
          </MenuItem>
          <MenuItem>
            {!Token ? (
              <Box>
                <Link to={"/signup"}>SignUp</Link>
              </Box>
            ) : (
              <Box onClick={() => logOut()}>Logout</Box>
            )}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
