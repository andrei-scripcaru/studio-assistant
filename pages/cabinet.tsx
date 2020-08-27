import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Heading,
  HStack,
} from '@chakra-ui/core'

import { HiOutlineViewGrid, HiOutlineUserGroup } from 'react-icons/hi'

import { withApollo } from '../lib/apollo'

import ProjectList from '../components/Project/ProjectList'
import ProjectModal from '../components/Project/ProjectModal'

const Cabinet = (): JSX.Element => {
  const tabProps = {
    width: 64,
    height: 16,
  }

  const boxProps = {
    overflow: 'auto',
    width: '50%',
    height: 'full',
    padding: 4,
    border: '1px solid',
    borderColor: 'gray.200',
  }

  return (
    <Tabs
      as={Flex}
      flexDirection="column"
      height="full"
      marginLeft="-1px"
      variant="enclosed-colored"
    >
      <TabList>
        <Tab {...tabProps}>
          <Icon as={HiOutlineViewGrid} boxSize={8} />
        </Tab>

        <Tab {...tabProps}>
          <Icon as={HiOutlineUserGroup} boxSize={8} />
        </Tab>
      </TabList>

      <TabPanels overflow="hidden" height="full">
        <TabPanel as={HStack} height="full" spacing={4}>
          <Box {...boxProps}>
            <Heading textAlign="center">
              <ProjectList />
              <ProjectModal />
            </Heading>
          </Box>

          <Box {...boxProps}>
            <Heading textAlign="center">Participant</Heading>
          </Box>
        </TabPanel>

        <TabPanel>
          <Heading>Under construction!</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default withApollo()(Cabinet)
