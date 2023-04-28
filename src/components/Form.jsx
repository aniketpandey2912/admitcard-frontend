import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { admitCardApi } from "./apis";

const initState = {
  name: "",
  phone: "",
  school: "",
  _class: "",
  roll_no: "",
  address: "",
};

const Form = () => {
  const [formData, setFormData] = useState(initState);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const formInputs = [
    {
      id: 1,
      type: "text",
      name: "name",
      placeholder: "name",
      value: formData.name,
    },
    {
      id: 2,
      type: "tel",
      name: "phone",
      placeholder: "phone no.",
      value: formData.phone,
    },
    {
      id: 3,
      type: "text",
      name: "school",
      placeholder: "school",
      value: formData.school,
    },
    {
      id: 4,
      type: "text",
      name: "_class",
      placeholder: "class",
      value: formData._class,
    },
    {
      id: 5,
      type: "number",
      name: "roll_no",
      placeholder: "roll no.",
      value: formData.roll_no,
    },
    {
      id: 6,
      type: "text",
      name: "address",
      placeholder: "address",
      value: formData.address,
    },
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    setFormData({
      ...formData,
      [name]: type === "number" || type === "tel" ? +value : value,
    });
  };

  const handleSubmit = () => {
    let valid = formValidation(formData);
    if (valid.status) {
      setLoading(true);
      admitCardApi(formData)
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Account created.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }, 3000);
    } else {
      toast({
        title: valid.mssg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const formValidation = (data) => {
    for (let k in data) {
      if (data[k] === "") {
        return { status: false, mssg: "All fields are required" };
      }
    }

    return { status: true };
  };

  return (
    <Box w="100%" textAlign="center">
      <Heading size="lg">Generate Admitcard</Heading>
      <VStack
        w="30%"
        m="auto"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p="40px 20px"
      >
        {formInputs?.map((el) => (
          <Input
            key={el.id}
            type={el.type}
            name={el.name}
            placeholder={el.placeholder}
            value={el.value}
            onChange={handleChange}
          />
        ))}
        <Button
          isLoading={loading}
          loadingText="Please wait"
          colorScheme="green"
          width="100%"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default Form;
