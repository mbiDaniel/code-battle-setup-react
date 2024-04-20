import { Avatar, HStack, Heading } from "@chakra-ui/react";
import React from "react";

export default function Header({ name }) {
  return (
    <HStack justifyContent="space-between" w="100%" h="60px" bg="#DADEFA" px="4">
      <Heading fontSize="xl">{name}</Heading>
      <HStack justifyContent="end">
        <Heading fontSize="lg">Daniel Mbi</Heading>
        <Avatar size="md" name="Dnaiel Mbi"></Avatar>
      </HStack>
    </HStack>
  );
}
