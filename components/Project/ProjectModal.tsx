import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Fade,
  SlideFade,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Stack,
} from '@chakra-ui/core'

import { useForm } from 'react-hook-form'

import useProjectModal from '../../hooks/useProjectModal'

import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  ListProjectsDocument,
} from '../../graphql/.generated'

const ProjectModal: React.FC = () => {
  const { project, isOpen, onClose } = useProjectModal()

  const toast = useToast()

  const { handleSubmit, errors, register, setValue } = useForm()

  const [
    createProject,
    { loading: createProjectLoading },
  ] = useCreateProjectMutation({
    update(cache, { data }) {
      const { project: existingProjects } = cache.readQuery({
        query: ListProjectsDocument,
      })

      const newProject = data.insert_project_one

      cache.writeQuery({
        query: ListProjectsDocument,
        data: { project: [newProject, ...existingProjects] },
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

      onClose()
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

  const [
    updateProject,
    { loading: updateProjectLoading },
  ] = useUpdateProjectMutation({
    onCompleted({ update_project_by_pk: { title } }) {
      toast({
        title: 'Yay!',
        description: `${title} successfully updated.`,
        status: 'success',
        position: 'top',
        duration: 2500,
        isClosable: true,
      })

      onClose()
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

  if (project) {
    setValue('title', project.title)
    setValue('description', project.description)
  }

  return (
    <Fade timeout={300} in={isOpen}>
      {(styles) => (
        <Modal size={'xl'} onClose={onClose} isOpen={true}>
          <ModalOverlay style={styles}>
            <SlideFade timeout={150} in={isOpen} unmountOnExit={false}>
              {(styles) => (
                <ModalContent style={styles}>
                  <ModalHeader>
                    {project ? 'Edit Project' : 'Create Project'}
                  </ModalHeader>

                  <ModalCloseButton />

                  <ModalBody>
                    <form
                      id={'project-form'}
                      onSubmit={handleSubmit(({ title, description }) => {
                        project
                          ? updateProject({
                              variables: { id: project.id, title, description },
                            })
                          : createProject({
                              variables: { title, description },
                            })
                      })}
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
                      form={'project-form'}
                      type={'submit'}
                      colorScheme={'green'}
                      isLoading={createProjectLoading || updateProjectLoading}
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
  )
}

export default ProjectModal
