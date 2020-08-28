import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/core'

import { HiOutlineChevronDown } from 'react-icons/hi'

import useFetchUser from '../hooks/useFetchUser'

const Header: React.FC = () => {
  const { user, loading } = useFetchUser()

  return (
    <Flex
      as="header"
      alignItems="center"
      gridArea="header"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      height={20}
      paddingX={6}
    >
      <Stack alignItems="center" spacing={3} isInline>
        <SkeletonCircle size="14" isLoaded={!loading}>
          <Avatar name={user?.name} src={user?.picture} />
        </SkeletonCircle>

        <Stack spacing={null}>
          <Text fontWeight="medium">{user?.nickname}</Text>
          <Text color="gray.500">{user?.name}</Text>
        </Stack>
      </Stack>

      {!loading && user && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Profile Actions"
            variant="ghost"
            fontSize="lg"
            size="sm"
            icon={<HiOutlineChevronDown />}
            marginLeft={1}
          />

          <MenuList>
            <MenuItem as="a" href="/api/logout">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}

export default Header
