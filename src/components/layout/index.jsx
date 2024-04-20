import { Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children, name}) {
  return (
    <HStack w="100vw" h="100vh">
      <Sidebar />
      <VStack h="100%" bg="gray.200" flex={1}>
        <Header name={name} />
        <Box w="100%" overflowY="auto" >
          {children}
        </Box>
        {/* <Footer /> */}
      </VStack>
    </HStack>
  );
}
