import React from "react";

const RegisterForm : React.FC =() =>{
    return(
        <div>
            <form className="p-56">
                <h1 className="text-5xl text-center">Regístrate</h1>
                <h2 className="text-2xl text-center text-white">Tu nombre</h2>
                <div className="input-box flex justify-center">
                    <input type= "text" placeholder="Nombres" required/>
                </div>
                <h2 className="text-2xl text-center text-white">Tu apellido paterno</h2>
                <div className="input-box flex justify-center">
                    <input type= "text" placeholder="Apellido paterno" required/>
                </div>
                <h2 className="text-2xl text-center text-white">Tu apellido materno</h2>
                <div className="input-box flex justify-center">
                    <input type= "text" placeholder="Apellido materno" required/>
                </div>
                <h2 className="text-2xl text-center text-white">Tu correo</h2>
                <div className="input-box flex justify-center">
                    <input type= "mail" placeholder="Correo@example.com" required/>
                </div>
                <div className="flex justify-center">
                <button type="submit" className="text-black text-1xl text-center bg-white p-2 rounded-sm">Registrar</button>
                </div>
                
            </form>
        </div>
    )
}
 export default RegisterForm;