import { navigate } from "../navigate";
import { staticEndpoint } from "../const";


export function LandingPage (){
    return (
        <>
            <h1>HOME</h1>
            <p> Welcome to the Landing Page</p>
            <button onClick={() => navigate(staticEndpoint + '/login')}>Log in</button>
        </>
    )
}