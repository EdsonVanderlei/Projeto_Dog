import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { UserContext } from '../../UserContext'
import Error from '../../Helpers/Error'
import styles from './LoginForm.module.css'
import stylesBtn from '../Forms/Button.module.css'
const LoginForm = () => {

  const username = useForm();
  const password = useForm();





  const { userLogin, erro, loading } = React.useContext(UserContext)


  async function handleSubmit(event) {
    event.preventDefault()

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)


    }
  }




  return (
    <section className='animeLeft'>
      <h1 className='title'>Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>

        <Input type="text" name='username' {...username} />
        {username.value}
        <Input type="password" name='password' {...password} />
        {loading ? <Button disabled='true'>Carregando...</Button> : <Button>Entrar</Button>}
        <Error error={erro} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">Perdeu a Senha?</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastra-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>

      </div>
      <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>


    </section>
  )
}

export default LoginForm