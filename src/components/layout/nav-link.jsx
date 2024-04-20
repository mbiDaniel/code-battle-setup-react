import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ path, name, icon }) {
  const pathname = window.location.pathname;
  const isAction = pathname.includes(path);
  const Icon = () => icon;
  return (
    <Link to={path} style={{ width: "100%" }}>
      <HStack
        w="100%"
        p="2"
        px="4"
        bg={isAction ? "primary" : "white"}
        rounded="md"
        className="group"
        _hover={{ bg: "primary", color: "white" }}
        transition="0.2s ease"
        cursor="pointer"
      >
        <Text
          fontSize="2xl"
          _groupHover={{ color: "white" }}
          color={isAction ? "white" : "primary"}
        >
          <Icon />
        </Text>
        <Text
          fontSize="xl"
          _groupHover={{ color: "white" }}
          color={isAction ? "white" : "black"}
          fontWeight="700"
        >
          {name}
        </Text>
      </HStack>
    </Link>
  );
}
