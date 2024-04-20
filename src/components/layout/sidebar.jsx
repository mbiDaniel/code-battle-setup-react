import { Box, VStack } from '@chakra-ui/react'
import Logo from 'components/logo'
import React from 'react'
import NavLink from './nav-link'
import { BsFillAwardFill, BsFillPeopleFill } from "react-icons/bs";
import mainRoutes from 'routes/main.routes';
export default function Sidebar() {
  return (
    <VStack spacing="10" w="300px" alignItems="start" h="100vh" bg="white">
        <Box p="4" pt="8">
            <Logo />
        </Box>
        
        <VStack w="100%" pl="2">
            <NavLink name="Cases" path={mainRoutes.Cases.path} icon={<BsFillPeopleFill />} />
            <NavLink name="Lawyers" path={mainRoutes.Laywers.path}  icon={<BsFillAwardFill />} />
        </VStack>
    </VStack>
  )
}
