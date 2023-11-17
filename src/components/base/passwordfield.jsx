import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  useBoolean,
  useColorModeValue,
  Text,
  InputRightElement,
  Icon,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

export default function PasswordField({
  label,
  hideLabel,
  required,
  placeholder,
  name,
  error,
  ...rest
}) {
  const [show, setShow] = useBoolean();

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  return (
    <FormControl>
      {!hideLabel && (
        <FormLabel
          display="flex"
          color={textColor}
        >
          {label} {required && <Text color={brandStars}>*</Text>}
        </FormLabel>
      )}
      <Box >
        <InputGroup size="md">
          <ChakraInput
            isRequired={required}
            placeholder={placeholder}
            name={name}
            type={show ? "text" : "password"}
            variant="auth"
            {...rest}
          />
          <InputRightElement display="flex" alignItems="center">
            <Icon
              color={textColorSecondary}
              _hover={{ cursor: "pointer" }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={setShow.toggle}
            />
          </InputRightElement>
        </InputGroup>
        {error && <FormHelperText color="red.500">{error}</FormHelperText>}
      </Box>
    </FormControl>
  );
}
