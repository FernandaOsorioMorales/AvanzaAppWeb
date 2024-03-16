import { staticEndpoint } from "../const";
import { navigate } from "../navigate";

export function Login (){
    return (
        <>
            <h1>Login!</h1>
            <p> Log in or go to hell!</p>
            <button onClick={() => navigate(staticEndpoint)}> Go home? </button>
        </>
    )
}