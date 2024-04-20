import {
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import apiClient from "api";
import Button from "components/base/button";
import Input from "components/base/input";
import PasswordField from "components/base/passwordfield";
import Layout from "components/layout";
import Table from "components/table";
import useDispatcher from "hooks";
import useApiClinet from "hooks/api";
import React from "react";

export default function Lawyers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useDispatcher();
  const toast = useToast();

  const createLawer = async (values) => {
    try {
      console.log(values);
      dispatch({ loading: true });
      delete values.cpassword;
      await apiClient("/auth/signup-lawyer", "post", {
        password: values.password,
        role: values.rolse,
        displayName: values.displayName+"",
        email: values.email + "",
        firstName: values.firstName + "",
        lastName: values.lastName,
        phone: values.phone,
        status: values.status,
      });
      dispatch({ loading: false });
      onClose();
      toast({ title: "Lawyer successfully created" });
    } catch (error) {
      console.log(error);
      dispatch({ loading: false });
      toast({ title: "An error occured", status: "error" });
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("This field is required"),
    password: yup.string().required("This field is required"),
    cpassword: yup.string().required("This field is required"),
    confirmPassword: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref("password")], "Password do not match"),
    displayName: yup.string().required("This field is required"),
    phone: yup.string().required("This field is required"),
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: { role: "user", status: "unverified" },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: createLawer,
  });

  const headers = [
    { header: "Case ID", accessorKey: "id", id: "id" },
    { header: "First Name", accessorKey: "firstName", id: "firstName" },
    { header: "Last Name", accessorKey: "lastName", id: "lastName" },
    { header: "Display Name", accessorKey: "displayName", id: "displayName" },
    { header: "Email", accessorKey: "authEmail", id: "authEmail" },
    { header: "Phone", accessorKey: "phone", id: "phone" },
  ];

  const { loading, data } = useApiClinet("/admin/get-lawyers");
  return (
    <Layout name="Lawyers">
      <VStack p="4" pb="1" w="100%">
        <HStack w="100%" justifyContent="end">
          <Button onClick={onOpen}>Create Lawyer</Button>
        </HStack>
        <Table loading={loading} columns={headers} data={data.docs || []} />
      </VStack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a lawyer</DrawerHeader>
          <DrawerBody>
            <VStack spacing="20px">
              <Input
                name="firstName"
                disabled={state.loading}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.errors.firstName}
                label="First Name"
              />
              <Input
                name="lastName"
                disabled={state.loading}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.errors.lastName}
                label="Last Name"
              />
              <Input
                name="displayName"
                disabled={state.loading}
                value={formik.values.displayName}
                onChange={formik.handleChange}
                error={formik.errors.displayName}
                label="Display Name"
              />
              <Input
                name="email"
                disabled={state.loading}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                label="Email"
              />
              <Input
                name="phone"
                disabled={state.loading}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}
                label="Phone"
              />
              <PasswordField
                name="password"
                disabled={state.loading}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                label="Password"
              />
              <PasswordField
                name="cpassword"
                disabled={state.loading}
                value={formik.values.cpassword}
                onChange={formik.handleChange}
                error={formik.errors.cpassword}
                label="Confirm Password"
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="light" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={formik.submitForm} loading={state.loading}>
              Create Lawyer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
}
