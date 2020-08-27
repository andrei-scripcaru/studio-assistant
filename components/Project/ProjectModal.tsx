import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  IconButton,
  Fade,
  SlideFade,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  Input,
} from '@chakra-ui/core'

import { HiOutlinePlus } from 'react-icons/hi'

const ProjectModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        aria-label={'Create Project'}
        variant={'outline'}
        width={'full'}
        height={16}
        fontSize={'3xl'}
        icon={<HiOutlinePlus />}
        onClick={onOpen}
      />

      <Fade timeout={300} in={isOpen}>
        {(styles) => (
          <Modal size={'xl'} onClose={onClose} isOpen={true}>
            <ModalOverlay style={styles}>
              <SlideFade timeout={150} in={isOpen} unmountOnExit={false}>
                {(styles) => (
                  <ModalContent style={styles}>
                    <ModalHeader>Create Project</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                      <form>
                        <FormControl id="email">
                          <FormLabel>Email address</FormLabel>
                          <Input type="email" />
                        </FormControl>
                      </form>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>

                      <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                )}
              </SlideFade>
            </ModalOverlay>
          </Modal>
        )}
      </Fade>
    </>
  )
}

export default ProjectModal
