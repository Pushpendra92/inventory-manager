import { Button, Heading, Switch, Tab, Flex, TabList, TabPanel, TabPanels, Tabs, useColorMode, Box, Spacer, Center } from '@chakra-ui/react'
import React, { useState } from 'react'
import ListItems from './components/ListItems'
import AddItems from './components/AddItems'
import { FaBoxOpen } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import DetailsPage from './components/DetailsPage'
import { Route } from 'react-router-dom'

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [listItems, setListItems] = useState([])

  return (
    <>

      <Route exact path="/details" component={DetailsPage}>
      </Route>
      <Route exact path="/">
        <header>
          <Flex bgGradient="linear(to-r, teal.900,teal.600)" w="100%" p={4} color="white">
            <Box p="4">
              Welcome to Dashboard
  </Box>
            <Spacer />
            <Box p="4" bg="teal.400">
              <Switch onChange={toggleColorMode} colorScheme="teal" size="sm" />
            </Box>
          </Flex>

          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab py={5}>

                <Flex>
                  <Center>
                    <Heading as="h4" size="md">Show inventory items</Heading>
                  </Center>
                  <Center w="50px">
                    <FaBoxOpen />
                  </Center>
                </Flex>
              </Tab>
              <Tab py={5}>
                <Center>
                  <Heading as="h4" size="md">Add items in inventory</Heading>
                </Center>
                <Center w="50px">
                  <IoMdAddCircleOutline />
                </Center>
              </Tab>

            </TabList>
            <TabPanels>
              <TabPanel>
                <ListItems
                  listItems={listItems}
                  setListItems={setListItems}
                />
              </TabPanel>
              <TabPanel>
                <AddItems
                  listItems={listItems}
                  setListItems={setListItems} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </header>
      </Route></>
  )
}

export default App
