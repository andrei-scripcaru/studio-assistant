import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Heading,
  HStack,
  Box,
} from '@chakra-ui/core'

import { HiOutlineViewGrid, HiOutlineUserGroup } from 'react-icons/hi'

import { withApollo } from '../lib/apollo'

const Cabinet = (): JSX.Element => {
  const tabProps = {
    width: 64,
    height: 16,
  }

  const boxProps = {
    width: '50%',
    border: '1px solid',
    borderColor: 'gray.200',
  }

  return (
    <Tabs variant="enclosed-colored" marginLeft="-1px">
      <TabList>
        <Tab {...tabProps}>
          <Icon as={HiOutlineViewGrid} boxSize={8} />
        </Tab>

        <Tab {...tabProps}>
          <Icon as={HiOutlineUserGroup} boxSize={8} />
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HStack spacing={8}>
            <Box {...boxProps}>Author</Box>

            <Box {...boxProps}>Participant</Box>
          </HStack>
        </TabPanel>

        <TabPanel>
          <Heading>Under construction!</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default withApollo()(Cabinet)
