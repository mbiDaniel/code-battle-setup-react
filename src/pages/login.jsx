import {
  Alert,
  Box,
  Card,
  Checkbox,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Button from "components/base/button";
import Input from "components/base/input";
import PasswordField from "components/base/passwordfield";
import Logo from "components/logo";
import React, { useState } from "react";
import mainRoutes from "routes/main.routes";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Login() {
  const account = [
    { email: "nanoadmin@stealth.com", password: "123456"},
    { email: "nano@abc.com", password: "123456"},
    { email: "test@abc.com", password: "123456"},
  ];
  const [loading, setState] = useState(false);
  const [error, setError] = useState();
  const login = (values) => {
    setState(true);
    setTimeout(() => {
      setState(false)
      const acc = account.find(c => c.email === values.email)

      if (acc && acc.password === values.password) {
        window.location = mainRoutes.Cases.path;
        setState(false);
      } else  {
        setError("Invalid credentials")
      }
    }, 2000);
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: { },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: login,
  });

  return (
    <Box h="100vh" w="100vw" bg="gray.200">
      <VStack
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="10"
      >
        <Flex w="100%">
          <Logo />
        </Flex>
        <Card w="full" maxW="600px" p="6" bg="white" mt="40">
          <VStack w="100%" spacing="30px" alignItems="start">
            <Box>
              <Heading fontSize="4xl">Sign In</Heading>
              <Text>Enter your credentials to signin to your account.</Text>
            </Box>

            {error && <Alert status="error">{error}</Alert>}
            <VStack w="full" spacing="20px" alignItems="start">
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                type="email"
                name="email"
                label="Email Address"
              />
              <PasswordField
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                label="Password"
              />
              <Checkbox>Remember me</Checkbox>
              <Button loading={loading} onClick={formik.submitForm} w="full">
                {" "}
                Login{" "}
              </Button>
            </VStack>
          </VStack>
        </Card>
      </VStack>
    </Box>
  );
}
