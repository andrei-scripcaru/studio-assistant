import theme, { Theme } from '@chakra-ui/theme'
import { Styles } from '@chakra-ui/theme-tools'

const styles: Styles = {
  ...theme.styles,

  global: () => ({
    ...theme.styles.global,
  }),
}

const customTheme: Theme = {
  ...theme,

  styles,
}

export default customTheme
