import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { useColorMode, Flex, IconButton, Tooltip } from '@chakra-ui/core'

import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineCog,
} from 'react-icons/hi'

const Navigation: React.FC = () => {
  const router = useRouter()

  const { colorMode, toggleColorMode } = useColorMode()

  const links = [
    { href: '/cabinet', icon: <HiOutlineUser /> },
    { href: '/board', icon: <HiOutlinePhotograph /> },
    { href: '/settings', icon: <HiOutlineCog /> },
  ]

  const iconButtonProps = {
    variant: 'ghost',
    height: 24,
    borderY: '1px solid transparent',
    borderRadius: 0,
    fontSize: '4xl',
  }

  return (
    <Flex
      as="nav"
      direction="column"
      gridArea="navigation"
      borderRight="1px solid"
      borderRightColor="gray.200"
      width={24}
      marginRight={4}
    >
      <Tooltip label="Toggle Color Mode" hasArrow>
        <IconButton
          {...iconButtonProps}
          aria-label="Cabinet"
          icon={colorMode === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
          height={24}
          onClick={toggleColorMode}
        />
      </Tooltip>

      {links.map((link) => (
        <NextLink key={link.href} href={link.href}>
          <IconButton
            {...iconButtonProps}
            aria-label="Cabinet"
            icon={link.icon}
            width={router.pathname === link.href ? '7rem' : 24}
            backgroundColor={
              router.pathname === link.href ? 'white !important' : 'transparent'
            }
            borderColor={
              router.pathname === link.href ? 'gray.200' : 'transparent'
            }
            color={router.pathname === link.href ? 'blue.600' : 'currentColor'}
            pointerEvents={router.pathname === link.href ? 'none' : 'auto'}
          />
        </NextLink>
      ))}
    </Flex>
  )
}

export default Navigation
