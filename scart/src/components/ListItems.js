import { Badge, Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, grid, Grid, Heading, IconButton, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GrFilter } from 'react-icons/gr'
import * as withConstant from '../static/consts';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { css, keyframes } from '@emotion/css'
import * as Yup from 'yup';



const ListItems = (props) => {

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

    const { listItems, setListItems } = props

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    useEffect(() => {
        axios.get(`${withConstant.API_URL}/api/product-list/`)
            .then((resp) => {
                console.log(resp.data);
                setListItems(resp.data)
            })
            .catch(function (error) {
            })
    }, [])

    const validateFilterSchema = Yup.object().shape({
        filterProductMinPrice: Yup.number().positive().integer(),
        filterProductMaxPrice: Yup.number().positive().integer(),
    });


    const changeFn = (e, fieldVal) => {
        console.log(e.target.value);
        fieldVal(e.target.name, e.target.value)
    }

    return (
        <>
            <Box p="6">
                <Flex>
                    <Heading mr="4">Apply filters</Heading>
                    <IconButton ref={btnRef} onClick={onOpen} colorScheme="teal" aria-label="Search database" icon={<GrFilter />} />
                </Flex>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Search here</DrawerHeader>

                        <DrawerBody>
                            <Formik
                                initialValues={{ filterProductName: '', filterProductMinPrice: '', filterProductMaxPrice: '' }}
                                validationSchema={validateFilterSchema}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    console.log("hi");
                                    let api_call;
                                    api_call = `${withConstant.API_URL}/api/product-filter/`

                                    let data = {};
                                    data.name = values.filterProductName
                                    data.minPrice = values.filterProductMinPrice
                                    data.maxPrice = values.filterProductMaxPrice

                                    console.log('data', data);
                                    console.log('data', api_call);

                                    axios.post(api_call,
                                        data
                                    )
                                        .then(function (response) {
                                            console.log(response);
                                            if (response.status == 200) {
                                                console.log("success");
                                                setListItems(response.data)
                                                resetForm({ values: "" })
                                            }
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                }}
                            >
                                {({ values, isValid, dirty, isSubmitting, setFieldValue, resetForm }) => (
                                    <Form>
                                        <Field placeholder="Enter product name *" my={1} value={values.filterProductName} name="filterProductName" as={Input} onChange={(e) => changeFn(e, setFieldValue)} />
                                        <ErrorMessage name="filterProductName" component="div" />
                                        <div
                                            className={css`
                            height: 20px;
                            border-radius: 50%;
                            animation: ${bounce} 1s ease infinite;
                            transform-origin: center bottom;
                          `}>
                                            <ErrorMessage name="filterProductName" />
                                        </div>
                                        <Field placeholder="Enter Min Price" my={1} value={values.filterProductMinPrice} name="filterProductMinPrice"
                                            onChange={(e) => changeFn(e, setFieldValue)}
                                            as={Input}
                                        />
                                        <div
                                            className={css`
                            height: 20px;
                            border-radius: 50%;
                            animation: ${bounce} 1s ease infinite;
                            transform-origin: center bottom;
                          `}>
                                            <ErrorMessage name="filterProductMinPrice" />
                                        </div>
                                        <Field name="filterProductMaxPrice" my={1}
                                            value={values.filterProductMaxPrice}
                                            placeholder="Enter max price"
                                            as={Input}
                                        />
                                        <div
                                            className={css`
                            height: 20px;
                            border-radius: 50%;
                            animation: ${bounce} 1s ease infinite;
                            transform-origin: center bottom;
                          `}>
                                            <ErrorMessage name="filterProductMaxPrice" />
                                        </div>
                                        <Button type="submit"
                                            disabled={!(isValid && dirty)}
                                            color="orange">Search</Button>

                                    </Form>

                                )}

                            </Formik>
                        </DrawerBody>
                        <DrawerFooter>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>

            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {
                    listItems.map((item, index) => (
                        <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Image src={withConstant.API_URL + item.product_image} alt="" />

                            <Box p="6">
                                {
                                    index <= 2 && (<Box>
                                        <Badge borderRadius="full" px="2" colorScheme="teal">
                                            New
                                        </Badge>

                                    </Box>)
                                }


                                <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated
                                >
                                    {item.product_name}
                                </Box>

                                <Box>
                                    {item.product_cost} $
                                </Box>

                            </Box>
                        </Box>
                    ))
                }
            </Grid>
        </>
    )


}

export default ListItems
