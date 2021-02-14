import { Box, Center, Container, Heading, Image, Square, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Flex, Spacer } from "@chakra-ui/react"
import * as withConstant from '../static/consts';
import { useHistory } from "react-router-dom";


const DetailsPage = (props) => {
    let history = useHistory();
    const [detailedProductInfo, setDetailedProductInfo] = useState([])
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    console.log('p', props);
    useEffect(() => {
        if (props.location.state != undefined) {
            setDetailedProductInfo(props.location.state.items.item);
        }
        else {
            history.push('/')
        }
    }, [props])
    const style = isImageLoaded ? {} : { visibility: 'hidden' }
    return (
        <div>

            <Container>
                <Heading>Product Details</Heading>
                <Flex >
                    <Center >
                    </Center>
                    <Box bg="teal" p={4} color="white">
                        <Center py={4}>
                            <Image style={style} onLoad={() => setIsImageLoaded(true)} src={withConstant.API_URL + detailedProductInfo.product_image} alt="" />
                        </Center>
                        <Heading>{detailedProductInfo.product_name}</Heading>
                        <Text>{detailedProductInfo.product_description}</Text>
                        <Heading color="green.400">{detailedProductInfo.product_cost}$</Heading>
                    </Box>
                </Flex>
            </Container>

        </div>
    )
}

export default DetailsPage
