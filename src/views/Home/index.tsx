import reactLogo from '@assets/react.svg'
import viteLogo from "@assets/vite.svg"
import { useUserStore } from '@store/user'
import { useNavigate } from 'react-router-dom'
import HomeStyle from './index.module.scss'

const publicPath = import.meta.env.VITE_PUBLIC_PATH
function Home() {
  const { num, changeNum } = useUserStore()
  const navigate = useNavigate()
  const goAboutPage = () => {
    navigate('/about')
  }

  return (
    <div className={HomeStyle.home}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={HomeStyle.logo} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={`${HomeStyle.logo} ${HomeStyle.react}`} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={HomeStyle.card}>
        <button onClick={changeNum}>UserStore's count is {num}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <button onClick={goAboutPage}>About</button>
    </div>
  )
}

export default Home
