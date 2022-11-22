import React from 'react'
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from './api'
import { useNavigate } from 'react-router-dom'
export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
    
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [erro, setErro] = React.useState(false)
    const navigate = useNavigate();

    const userLogout = React.useCallback( async () => {
        setData(null)
        setErro(null)
        setLoading(false)
        setLogin(false)
        window.localStorage.removeItem('token')
        navigate('/login')
    },[navigate])
    
    React.useEffect(() => {
        const autoLogin = async () => {
            const token = window.localStorage.getItem('token')
            if (token) {
                try {
                    setErro(null)
                    setLoading(true)
                    const { url, options } = TOKEN_VALIDATE_POST(token)
                    const response = await fetch(url, options);
                    if(!response.ok){
                        throw new Error('Token Inválido')
                    }
                    await getUser(token)
                }
                catch (err) {
                    userLogout()
                }
                finally{
                     setLoading(false)
                }

            }
        }
        autoLogin()
    }, [userLogout])




    async function getUser(token) {
        const { url, options } = USER_GET(token);

        const response = await fetch(url, options)
        const json = await response.json()
        setData(json)
        setLogin(true)
    }

    async function userLogin(username, password) {
        try{
            setErro(null)
            setLoading(true)
            const { url, options } = TOKEN_POST({ username, password })
            const tokenRes = await fetch(url, options);

            if(!tokenRes.ok){
                throw new Error(`Error: Usuário não encontrado !`)
            } 
            const { token } = await tokenRes.json();
            window.localStorage.setItem('token', token)
                  await  getUser(token)
                  navigate('/conta')
        }
        catch(err){
                setErro(err.message)
                setLogin(false)
        }

        finally{
            setLoading(false)
        }
    }

    return <UserContext.Provider value={{ userLogin, data, login,userLogout,erro,loading }}>{children}</UserContext.Provider>
}
