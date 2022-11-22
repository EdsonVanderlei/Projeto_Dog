import React from 'react'
import { USER_POST } from '../../api'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { UserContext } from '../../UserContext'
import useFetch from '../../Hooks/useFetch'
import Error from '../../Helpers/Error'
const LoginCreate = () => {
  const { userLogin } = React.useContext(UserContext)
  const { loading, error, request } = useFetch()
  const username = useForm()
  const email = useForm('email')
  const password = useForm('password')



  async function handleSubmit(event) {


    event.preventDefault()

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value
    })
    const { response} = await request(url, options)
    if (response.ok) userLogin(username.value, password.value)




  }


  return (
    <section className="animeLeft">
      <h1 className='title'>Cadastra-se</h1>
      <form onSubmit={handleSubmit}>

        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />

        <Input label="senha" type="password" name="senha" {...password} />
        {loading ? <Button disabled={true}>Carregando </Button> : <Button>Cadastrar</Button>}
        <Error error={error}></Error>

      </form>

    </section>
  )
}

export default LoginCreate