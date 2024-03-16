import { useEffect, useState } from 'react'
import './App.css'
import { EVENTS, staticEndpoint } from './const'
import { LandingPage } from './components/landingPage'
import { Login } from './components/login'




function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
        }
    }, [])
  return (
    <main>
      {currentPath === staticEndpoint && <LandingPage />}
      {currentPath === staticEndpoint + '/login' && <Login/>}
    </main>
  )
}

export default App
