import React from "react";
import { Link } from "react-router-dom";

const LoginForm : React.FC =() =>{
    return(
        <div className="wrapper flex justify-center items-center p-72">
            <form action="">
                <h1 className="text-2xl text-center">Login</h1>
                <div className="input-box flex justify-center">
                    <input type= "text" placeholder="Usuario" required/>
                </div>
                <div className="input-box flex justify-center">
                    <input type= "password" placeholder="Contraseña" required/>
                </div>
                <div className="remember-forgot">
                    <label><input type= "checkbox" /> Recuérdame  </label>
                    <a href="#" className="underline">Olvidaste tu contraseña?</a>
                </div>

                <button type="submit" className="text-black text-1xl text-center bg-white p-2 rounded-sm">Login</button>

                <div className="register-link">
                    <Link to="/register">¿No tienes cuenta?Regístrate aquí</Link>
                </div>

            </form>
        </div>
    )
}

export default LoginForm;