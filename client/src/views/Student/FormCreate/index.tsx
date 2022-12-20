import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col } from '../../../components/containers/Col'
import { Row } from '../../../components/containers/Row'
import { WithHeader } from '../../../components/containers/WithHeader'
import { AvatarPicker } from '../../../components/form/AvatarPicker'
import { Button } from '../../../components/form/Button'
import { FormField } from '../../../components/form/FormField'
import { Loading } from '../../../components/placeholders/Loading'
import { Text } from '../../../components/text/Text'
import { useMediaUploadMutation } from '../../../hooks/mutations/Media'
import { useStudentInsertMutation } from '../../../hooks/mutations/Student'
import { colors } from '../../../theme'
import { success } from '../../../utils/Result'

export const StudentFormView = () => {
  const navigate = useNavigate()
  const insertMutation = useStudentInsertMutation()
  const uploadMutation = useMediaUploadMutation()
  const [image, setImage] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [nameError, setNameError] = useState<string>()

  const onSave = async () => {
    if (name.length === 0) return setNameError('Campo obrigatório')
    const uploadRes = image
      ? await uploadMutation.execute(image)
      : success({ id: null })
    if (!uploadRes.success) {
      return toast(
        'Não foi possível gravar a imagem.\nVerifique sua conexão com a internet e tente novamente.',
        { progressStyle: { backgroundColor: colors.error[500] } },
      )
    }
    const insertRes = await insertMutation.execute({
      name,
      phone,
      address,
      imageId: uploadRes.value.id,
    })
    if (!insertRes.success) {
      return toast(
        'Não foi possível gravar os dados.\nVerifique sua conexão com a internet e tente novamente.',
        { progressStyle: { backgroundColor: colors.error[500] } },
      )
    }
    return navigate('/students')
  }

  return (
    <WithHeader title="Novo aluno">
      {insertMutation.fetching || uploadMutation.fetching ? (
        <Loading />
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
            src={image ? URL.createObjectURL(image) : '../user-placeholder.png'}
            onChange={setImage}
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
            <Button style={{ margin: 8, width: 100 }} onClick={onSave}>
              Gravar
            </Button>
          </Row>
        </Col>
      )}
    </WithHeader>
  )
}
