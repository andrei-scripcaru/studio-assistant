import {
  useDisclosure,
  useToast,
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
  FormErrorMessage,
  Input,
  Textarea,
  Stack,
} from '@chakra-ui/core'

import { HiOutlinePlus } from 'react-icons/hi'

import { useForm } from 'react-hook-form'

import {
  useCreateProjectMutation,
  ListProjectsDocument,
} from '../../graphql/.generated'

const ProjectModal: React.FC = () => {
  const toast = useToast()

  const {
    isOpen: modalIsOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure()

  const { handleSubmit, errors, register } = useForm()

  const [createProject, { loading }] = useCreateProjectMutation({
    update(cache, { data }) {
      const existingProjects = cache.readQuery({
        query: ListProjectsDocument,
      })

      const newProject = data.insert_project_one

      cache.writeQuery({
        query: ListProjectsDocument,
        data: { project: [newProject, ...existingProjects.project] },
      })
    },

    onCompleted({ insert_project_one: { title } }) {
      toast({
        title: 'Yay!',
        description: `${title} successfully created.`,
        status: 'success',
        position: 'top',
        duration: 2500,
        isClosable: true,
      })

      closeModal()
    },

    onError(error) {
      toast({
        title: 'Whoops!',
        description: error.message,
        status: 'error',
        duration: 2500,
        isClosable: true,
      })
    },
  })

  return (
    <>
      <IconButton
        aria-label={'Create Project'}
        variant={'outline'}
        width={'full'}
        height={16}
        fontSize={'3xl'}
        icon={<HiOutlinePlus />}
        onClick={openModal}
      />

      <Fade timeout={300} in={modalIsOpen}>
        {(styles) => (
          <Modal size={'xl'} onClose={closeModal} isOpen={true}>
            <ModalOverlay style={styles}>
              <SlideFade timeout={150} in={modalIsOpen} unmountOnExit={false}>
                {(styles) => (
                  <ModalContent style={styles}>
                    <ModalHeader>Create Project</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                      <form
                        id={'create-project'}
                        onSubmit={handleSubmit(
                          async ({ title, description }) => {
                            await createProject({
                              variables: { title, description },
                            })
                          }
                        )}
                      >
                        <Stack spacing={4}>
                          <FormControl isInvalid={errors.title}>
                            <FormLabel>Title</FormLabel>

                            <Input
                              type={'text'}
                              name={'title'}
                              ref={register({ required: true })}
                            />

                            <FormErrorMessage>
                              {errors.title && 'Title is required.'}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl isInvalid={errors.description}>
                            <FormLabel>Description</FormLabel>

                            <Textarea
                              name={'description'}
                              ref={register({ required: true })}
                            />

                            <FormErrorMessage>
                              {errors.description && 'Description is required.'}
                            </FormErrorMessage>
                          </FormControl>
                        </Stack>
                      </form>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        form={'create-project'}
                        type={'submit'}
                        colorScheme={'green'}
                        isLoading={loading}
                        loadingText={'Submitting'}
                      >
                        Submit
                      </Button>
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
