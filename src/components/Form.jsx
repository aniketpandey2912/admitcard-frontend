import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { admitCardApi } from "./apis";
import { formValidation } from "./utils";
import Admitcard from "./Admitcard";

import { PDFDownloadLink } from "@react-pdf/renderer";

const initState = {
  name: "",
  phone: "",
  school: "",
  _class: "",
  roll_no: "",
  address: "",
};

const Form = () => {
  const [admitcardInfo, setAdmitcardInfo] = useState({});
  const [formData, setFormData] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState(false);
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
      type: "text",
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
    const val = type === "number" ? +value : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async () => {
    let valid = formValidation(formData);
    if (valid.status) {
      setLoading(true);
      admitCardApi(formData)
        .then((res) => {
          // console.log("response", res);
          if (res.status) {
            toast({
              title: res.mssg,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            setAdmitcardInfo(res.admitcardInfo);
            setGenerate(true);
          } else {
            toast({
              title: res.mssg,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
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

  useEffect(() => {
    setGenerate(false);
  }, []);

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

      {generate && (
        <Box my="20px">
          <PDFDownloadLink
            document={<Admitcard {...admitcardInfo} />}
            fileName="admitcard.pdf"
          >
            {({ loading, error }) =>
              loading ? (
                <Button colorScheme="gray">Documnet Loading...</Button>
              ) : (
                <Button colorScheme="blue">Download</Button>
              )
            }
          </PDFDownloadLink>
        </Box>
      )}

      {generate && <Admitcard {...admitcardInfo} />}
    </Box>
  );
};

export default Form;
