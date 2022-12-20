import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { mediaUrl } from '../../../api/Media'
import { Center } from '../../../components/containers/Center'
import { Col } from '../../../components/containers/Col'
import { Row } from '../../../components/containers/Row'
import { WithHeader } from '../../../components/containers/WithHeader'
import { AvatarPicker } from '../../../components/form/AvatarPicker'
import { Button } from '../../../components/form/Button'
import { FormField } from '../../../components/form/FormField'
import { ErrorFeedback } from '../../../components/placeholders/ErrorFeedback'
import { Loading } from '../../../components/placeholders/Loading'
import { Text } from '../../../components/text/Text'
import { useMediaUploadMutation } from '../../../hooks/mutations/Media'
import {
  useStudentDeleteByIdMutation,
  useStudentUpdateMutation,
} from '../../../hooks/mutations/Student'
import { useStudentGetByIdQuery } from '../../../hooks/queries/Student'
import { colors } from '../../../theme'
import { success } from '../../../utils/Result'

export const StudentItemView = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = +(params.id || '')
  const studentQuery = useStudentGetByIdQuery(id)
  const updateMutation = useStudentUpdateMutation()
  const deleteMutation = useStudentDeleteByIdMutation()
  const uploadMutation = useMediaUploadMutation()
  const [image, setImage] = useState<
    { type: 'id'; id: string | null } | { type: 'file'; file: File }
  >({ type: 'id', id: null })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [nameError, setNameError] = useState<string>()

  useEffect(() => {
    if (!studentQuery.success) return
    setName(studentQuery.value.name)
    setPhone(studentQuery.value.phone)
    setAddress(studentQuery.value.address)
    setImage({ type: 'id', id: studentQuery.value.imageId })
  }, [studentQuery.success])

  const onSave = async () => {
    if (name.length === 0) return setNameError('Campo obrigatório')
    const uploadRes =
      image.type === 'file'
        ? await uploadMutation.execute(image.file)
        : success({ id: image.id })
    if (!uploadRes.success) {
      return toast(
        'Não foi possível gravar a imagem.\nVerifique sua conexão com a internet e tente novamente.',
        { progressStyle: { backgroundColor: colors.error[500] } },
      )
    }
    const updateRes = await updateMutation.execute({
      id,
      name,
      phone,
      address,
      imageId: uploadRes.value.id,
    })
    if (!updateRes.success) {
      return toast(
        'Não foi possível gravar os dados.\nVerifique sua conexão com a internet e tente novamente.',
        { progressStyle: { backgroundColor: colors.error[500] } },
      )
    }
    return navigate('/students')
  }

  const onDelete = () => {
    deleteMutation.execute(id).then(r => {
      if (r.success) {
        navigate('/students')
      } else {
        toast(
          'Não foi possível remover os dados.\nVerifique sua conexão com a internet e tente novamente.',
          { progressStyle: { backgroundColor: colors.error[500] } },
        )
      }
    })
  }

  return (
    <WithHeader title="Aluno">
      {!studentQuery.loaded ||
      updateMutation.fetching ||
      deleteMutation.fetching ||
      uploadMutation.fetching ? (
        <Loading />
      ) : !studentQuery.success ? (
        studentQuery.error.type === 'ApiFailureStatusError' &&
        studentQuery.error.status === 404 ? (
          <Center>
            <Col>
              <Text style={{ padding: 16, textAlign: 'center' }}>
                Aluno não encontrado
              </Text>
              <Button onClick={() => navigate('./..')}>Voltar</Button>
            </Col>
          </Center>
        ) : (
          <ErrorFeedback />
        )
      ) : (
        <Col
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            alignSelf: 'center',
            width: '100%',
            maxWidth: 800,
          }}
        >
          <AvatarPicker
            alt="imagem"
            size={160}
            src={
              image.type === 'file'
                ? URL.createObjectURL(image.file)
                : image.id
                ? `${mediaUrl}/${image.id}`
                : '../user-placeholder.png'
            }
            onChange={file =>
              setImage(file ? { type: 'file', file } : { type: 'id', id: null })
            }
          />
          <FormField
            title="Nome *"
            value={name}
            onChange={t => {
              setName(t)
              setNameError(undefined)
            }}
            autoFocus
          />
          {nameError && (
            <Text
              style={{
                marginLeft: 8,
                marginTop: -8,
                fontSize: 14,
                fontWeight: 600,
                color: colors.error[700],
              }}
            >
              {nameError}
            </Text>
          )}
          <FormField title="Telefone" value={phone} onChange={setPhone} />
          <FormField title="Endereço" value={address} onChange={setAddress} />
          <Row style={{ justifyContent: 'center' }}>
            <Button
              style={{ margin: 8, width: 100 }}
              onClick={() => navigate('/students')}
            >
              Voltar
            </Button>
            <Button
              style={{
                margin: 8,
                width: 100,
                backgroundColor: colors.error[500],
                borderColor: colors.error[400],
              }}
              onClick={onDelete}
            >
              Remover
            </Button>
            <Button style={{ margin: 8, width: 100 }} onClick={onSave}>
              Gravar
            </Button>
          </Row>
        </Col>
      )}
    </WithHeader>
  )
}
