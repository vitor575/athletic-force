import React from 'react'
import './styles.css'
import logoDois from "../../img/logo2.png"
import IconsFooter from './icons'

const Footer = () => {
  return (
  <main>
    <div className="logo-dois">
      <img src={logoDois} alt="segunda logo zenfit" />
    </div>
    <div>
      <IconsFooter/>
    </div>
  </main>
  )
}

export default Footer
