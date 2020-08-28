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
  const flexProps = {
    direction: 'column',
    width: '50%',
    height: 'full',
    border: '1px solid',
    borderColor: 'gray.200',
  }

  const headingProps = {
    paddingY: 4,
    borderBottom: '1px solid',
    borderBottomColor: 'gray.100',
    textAlign: 'center',
    size: 'lg',
    fontWeight: 'normal',
  }

  return (
    <Tabs
      as={Flex}
      direction={'column'}
      height={'full'}
      marginLeft={'-1px'}
      variant={'enclosed-colored'}
    >
      <TabList>
        <Tab width={64} height={16}>
          <Icon as={HiOutlineViewGrid} boxSize={8} />
        </Tab>

        <Tab width={64} height={16}>
          <Icon as={HiOutlineUserGroup} boxSize={8} />
        </Tab>
      </TabList>

      <TabPanels overflow="hidden" height="full">
        <TabPanel as={HStack} height="full" spacing={4}>
          <Flex {...flexProps}>
            <Heading {...headingProps}>Authoring</Heading>

            <Box padding={4} overflow={'auto'}>
              <ProjectList />
            </Box>

            <Box
              padding={4}
              borderTop={'1px solid'}
              borderTopColor={'gray.100'}
            >
              <ProjectModal />
            </Box>
          </Flex>

          <Flex {...flexProps}>
            <Heading {...headingProps}>Participating</Heading>
          </Flex>
        </TabPanel>

        <TabPanel>
          <Heading>Under construction!</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default withApollo()(Cabinet)
