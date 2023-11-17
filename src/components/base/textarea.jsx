import {
    FormControl,
    FormLabel,
    Textarea as ChakraTextarea,
    useColorModeValue,
    Text,
    FormHelperText,
    Box,
  } from "@chakra-ui/react";
  import React from "react";
  
  export default function Textarea({
    label,
    hideLabel,
    required,
    placeholder,
    name,
    error,
    type = "",
    ...rest
  }) {
    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    return (
      <FormControl>
        {!hideLabel && (
          <FormLabel display="flex" color={textColor}>
            {label} {required && <Text color={brandStars}>*</Text>}
          </FormLabel>
        )}
        <Box>
            <ChakraTextarea
              isRequired={required}
              variant="auth"
              name={name}
              placeholder={placeholder}
              type={type}
              {...rest}
            />
          {error && <FormHelperText color="red.500">{error}</FormHelperText>}
        </Box>
      </FormControl>
    );
  }
  