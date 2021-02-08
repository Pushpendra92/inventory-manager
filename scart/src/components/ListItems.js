import { Badge, Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, grid, Grid, Heading, IconButton, Image, Input, useDisclosure } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GrFilter } from 'react-icons/gr'
import * as withConstant from '../static/consts';


const ListItems = (props) => {
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
                        <DrawerHeader>Create your account</DrawerHeader>

                        <DrawerBody>
                            <Input placeholder="Type here..." />
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
              </Button>
                            <Button color="blue">Save</Button>
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
