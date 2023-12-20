import { useUserStore } from '@store/user'
function About() {
  const [pageTitle] = useState('About page')
  const { num, changeNum } = useUserStore()
  return (
    <div>
      <h1>{pageTitle}</h1>
      <h2>Number score: {num}</h2>
      <button onClick={changeNum}>Click to change the number using the store provided by zustand</button>
    </div>
  )
}

export default About
