import { Button as ChakraButton, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Button({ href, ...rest }) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <ButtonComponent {...rest} />
        </Link>
      ) : (
        <ButtonComponent {...rest} />
      )}
    </>
  );
}

const ButtonComponent = ({
  onClick,
  loading,
  loadingText,
  children,
  disabled,
  ...rest
}) => {
  return (
    <ChakraButton
      variant="brand"
      onClick={onClick}
      isDisabled={loading || disabled}
      {...rest}
    >
      <Flex gap="2" alignItems="center">
        {loading && <Spinner color="#ffffff" />}
        {loading ? loadingText : children}
      </Flex>
    </ChakraButton>
  );
};
