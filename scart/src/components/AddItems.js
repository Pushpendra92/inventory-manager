import { Box, Button, Container, Flex, Heading, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { css, keyframes } from '@emotion/css'
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import * as withConstant from '../static/consts';

const AddItems = (props) => {
    const { listItems, setListItems } = props
    const [isUpdate, setIsUpdate] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState()

    useEffect(() => {
        fetchApi()
    }, [])


    const fetchApi = () => {
        axios.get(`${withConstant.API_URL}/api/product-list/`)
            .then((resp) => {
                console.log(resp.data);
                setListItems(resp.data)
            })
            .catch(function (error) {
            })
    }


    const deleteItem = (id) => {
        console.log(id);
        axios.post(`${withConstant.API_URL}/api/product-delete/`,
            {
                id: id
            }
        )
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log("deleted!");
                    fetchApi()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -3px, 0);
  }

  70% {
    transform: translate3d(0, -2px, 0);
  }

  90% {
    transform: translate3d(0,-1px,0);
  }
`

    const validateSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Name field is manfatory'),
        productDescription: Yup.string()
            .required('Description field is manfatory'),
        productPrice: Yup.number().required('Cost field is manfatory').positive().integer(),
    });

    const changeFn = (e, fieldVal) => {
        console.log(e.target);
        fieldVal(e.target.name, e.target.value)
        // setFieldValue()
    }

    const [file, setFile] = useState("")



    return (
        <div>
            <>
                <Heading>Add in inventory</Heading>
                <Formik
                    initialValues={{ productName: '', productDescription: '', productPrice: '', productImage: '' }}
                    validationSchema={validateSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log('vals', values);
                        let api_call = ''
                        api_call = !isUpdate ? `${withConstant.API_URL}/api/product-create/` : `${withConstant.API_URL}/api/product-update/`

                        let data = new FormData();
                        // data = {
                        //     "product_name": values.productName,
                        //     "product_description": values.productDescription,
                        //     "product_cost": parseInt(values.productPrice),
                        // }
                        data.append(
                            "product_name", values.productName
                        )
                        data.append(
                            "product_description", values.productDescription
                        )
                        data.append(
                            "product_cost", parseInt(values.productPrice)
                        )

                        if (file) {
                            console.log(file);
                            data.append(
                                "product_image", file, file.name
                            )
                        }
                        // data.append();

                        if (isUpdate) {
                            // data['id'] = selectedItemId
                            data.append(
                                "id", selectedItemId
                            )
                            
                        }
                        console.log("api", api_call);
                        axios.post(api_call,
                            data
                        )
                            .then(function (response) {
                                console.log(response);
                                if (response.status == 200) {
                                    console.log("success");
                                    fetchApi()
                                    setFile("")
                                    resetForm({ values: "" })
                                    {
                                        isUpdate && setIsUpdate(false)
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                >
                    {({ values, isValid, dirty, isSubmitting, setFieldValue, resetForm }) => (
                        <Form>
                             <Text pt={10} fontSize="md">* fields are mandatory</Text>
                            {/* <Input
                                type="file"
                                name="productImage"
                                value={values.productImage}
                                onChange={(event) => {
                                    setFieldValue("productImage", event.target.files[0]);
                                }}

                            /> */}
                            {
                                !isUpdate && (
                                    <Box py={5}>
                                        <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                                    </Box>

                                )
                            }
                            <Field placeholder="Enter product name *" my={1} value={values.productName} name="productName" as={Input} onChange={(e) => changeFn(e, setFieldValue)} />
                            <ErrorMessage name="email" component="div" />
                            <div
                                className={css`
                            height: 20px;
                            border-radius: 50%;
                            animation: ${bounce} 1s ease infinite;
                            transform-origin: center bottom;
                          `}>
                                <ErrorMessage name="productName" />
                            </div>
                            <Field placeholder="Enter product description *" my={1} value={values.productDescription} name="productDescription"
                                onChange={(e) => changeFn(e, setFieldValue)}
                                as={Textarea}
                            />
                            <div
                                className={css`
                            height: 20px;
                            border-radius: 50%;
                            animation: ${bounce} 1s ease infinite;
                            transform-origin: center bottom;
                          `}>
                                <ErrorMessage name="productDescription" />
                            </div>
                            <Field name="productPrice" my={1}
                            placeholder="Enter cost *"
                                as={Input}
                            />
                            <div
                                className={css`
                            height: 20px;
                            border-radius: 50%;
                            animation: ${bounce} 1s ease infinite;
                            transform-origin: center bottom;
                          `}>
                                <ErrorMessage name="productPrice" />
                            </div>

                            {
                                !isUpdate ? (
                                    <Button type="submit" colorScheme="teal" my={5}
                                        disabled={!(isValid && dirty)}
                                    >
                                        Add
                                    </Button>
                                ) : (
                                        <React.Fragment>
                                            <Button type="submit" colorScheme="teal" my={5}
                                                disabled={!(isValid && dirty)}
                                            >
                                                Update
                                        </Button>
                                            <Button onClick={() => {
                                                setIsUpdate(false);
                                                resetForm({ values: "" })


                                            }} type="cancel" my={5}
                                            >
                                                Cancel
                                        </Button>
                                        </React.Fragment>
                                    )
                            }

                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Product Name</Th>
                                        <Th>Description</Th>
                                        <Th isNumeric>Cost</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        listItems.map((item) => (
                                            <Tr ley={item.id}>
                                                <Td>{item.product_name}</Td>
                                                <Td>{item.product_description}</Td>
                                                <Td isNumeric>{item.product_cost}</Td>
                                                <Td>
                                                    <IconButton onClick={() => {
                                                        setIsUpdate(true);
                                                        setSelectedItemId(item.id);
                                                        setFieldValue("productName", item.product_name)
                                                        setFieldValue("productDescription", item.product_description)
                                                        setFieldValue("productPrice", item.product_cost)

                                                    }} colorScheme="teal" mr="4" aria-label="Edit" icon={<AiFillEdit />} />
                                                    <IconButton onClick={() => deleteItem(item.id)} colorScheme="teal" aria-label="Delete" icon={<AiFillDelete />} />
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </Form>

                    )}

                </Formik>
            </>

        </div>
    )
}

export default AddItems
