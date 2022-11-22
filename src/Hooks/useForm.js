import React from 'react'


const types = {
   email : {
        regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
        message: 'Preencha corretamento o campo email'
   },
   password:{
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ ,
        message:'A senha precisa 1 caracter maiusculo, 1 minúsculo e 1 digito. Com no minímo 8 caracteres'

   }
}


const useForm = (type) => {
    const[value,setValue] = React.useState('')
    const[error,setError] = React.useState(null)

    
    function validate(value){
        if(type === false) return true
        else if(value.length === 0){
            setError('Preencha um valor')
            return false;
        }
        else if(types[type] && !types[type].regex.test(value)){
            setError(types[type].message)
            return false
        }
        else{
            setError(null)
            console.log(error)
            return true
        }
        
    }

    function onChange({target}){
        if(error) {
            validate(target.value)
        } 
        setValue(target.value)
    }

  return {value,setValue,onChange,validate: () => validate(value),error,onBlur: ()=> validate(value)}
}

export default useForm