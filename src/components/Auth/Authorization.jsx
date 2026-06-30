// import { createContext, useState, useContext, useEffect } from "react";
// import RegisterForm from "./RegisterForm"
// import LoginForm from "./LoginFormForm"

{/*
  регистрация
  мыло пароль подтверждение пароля
  вход
  два поля, логин и пароль
  внизу кнопка, зарегестрироваться или войти
  пароль и логин сохраняются локально как в Todo

      при регистрации
  если мыло уже есть в базе, выводить текст, что такой user уже зарег
  если нет, то регистрация и на страницу входа

      при входе
  если неправильный логин и/ или пароль или не зарегистр 
  подсветить красным и label "неправильный логин или пароль и тд" 
  
  <Field_1 /> - email
  <Field_2 /> - pwd


*/}
// const [email, setEmail] = useState('')
// const [pwd, setPwd] = useState('')

// const CheckEmailExist = (email) => {

  // }
  
// import Field from "../Field";
// import Button from "../Button";
// import AuthButton from "../AuthButton";
// import './src/styles/components/Auth.css'
// import './src/styles/components/auth-buttons.css'
// import './styles'

const Authorization = () => {
  return (
    <>
      <div>
        <input placeholder = "enter email"></input>
      </div>
      <div>
        <ul>
          <li><input placeholder = "enter password"></input></li>
          <li><input placeholder = "enter password"></input></li>
          <li><input placeholder = "enter password"></input></li>
          <li>gsfgg</li>
          {/* <input placeholder = "enter password"></input>
          <input placeholder = "enter password"></input>
          <input placeholder = "enter password"></input>
          <input placeholder = "enter password"></input> */}
        </ul>
      </div>
    </>
  )
  
}

export default Authorization

// { 
//       <Field
//         label = "enter email"
//       />
//       <Field
//         label = "enter password"
//       />
      
//       <div>
//         <button
          
//         >Log in</button>
//       </div>
//       <div className = "register-wrapper">
//         <span>Dont have account?</span>
//         <button>Register</button>
//       </div>
// }