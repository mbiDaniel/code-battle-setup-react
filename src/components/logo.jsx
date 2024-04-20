import { HStack, Heading, Img } from '@chakra-ui/react'
import React from 'react'

export default function Logo() {
  return (
    <HStack>
      <Img w="50px" src="/logo.png" />
      <Heading fontSize="xl" fontWeight="800">STEALTH</Heading>
    </HStack>
  )
}
