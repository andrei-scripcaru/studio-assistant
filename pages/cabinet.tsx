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
  IconButton,
} from '@chakra-ui/core'

import {
  HiOutlineViewGrid,
  HiOutlineUserGroup,
  HiOutlinePlus,
} from 'react-icons/hi'

import { withApollo } from '../lib/apollo'

import useProjectModal from '../hooks/useProjectModal'

import ProjectList from '../components/Project/ProjectList'
import ProjectModal from '../components/Project/ProjectModal'

const Cabinet = (): JSX.Element => {
  const { onOpen: openModal } = useProjectModal()

  const flexProps = {
    width: '50%',
    height: 'full',
    border: '1px solid',
    borderColor: 'gray.200',
  }

  const headingProps = {
    paddingY: 4,
    borderBottom: '1px solid',
    borderBottomColor: 'gray.100',
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
          <Flex {...flexProps} direction={'column'}>
            <Heading {...headingProps} textAlign={'center'}>
              Authoring
            </Heading>

            <Box padding={4} overflow={'auto'}>
              <ProjectList />
            </Box>

            <Box
              padding={4}
              borderTop={'1px solid'}
              borderTopColor={'gray.100'}
            >
              <ProjectModal />

              <IconButton
                aria-label={'Create Project'}
                variant={'outline'}
                width={'full'}
                height={16}
                fontSize={'3xl'}
                icon={<HiOutlinePlus />}
                onClick={() => openModal()}
              />
            </Box>
          </Flex>

          <Flex {...flexProps} direction={'column'}>
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
