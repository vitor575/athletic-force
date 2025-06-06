import { Form } from "react-router-dom";
import logo from "../../img/logo3.png";
 import { FiX } from "react-icons/fi";;

 
 const Login = () => {
   return (
     <main className='container-login'>
         <div className='main-container'>
             <div className='titulo-container'>
                 <h1 className='login-titulo' >Área do cliente</h1>
                 <div className='button-container'>
                     <FiX className='close-button'/>
                 </div>
             </div>
         </div>
         <div className='logo-container'>
             <img src={logo} alt='logo' className="logo-img"/>
         </div>
         <Form/>
     </main>
   );
 }
 
 export default Login;