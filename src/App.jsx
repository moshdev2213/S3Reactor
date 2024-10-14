import { useState } from 'react'
import reactLogo from './assets/react.svg'
import s3 from './assets/s3.png'
import aws from './assets/aws.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={s3} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="" target="_blank">
          <img src={aws} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>S3 + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Click Me : {count}
        </button>
        
      </div>
      <p className="read-the-docs">
        Created In Order To Learn AWS Deployments
      </p>
      <p className="read-the-docs">
        made with ❤ <a target='_blank' href="https://github.com/moshdev2213">@moshdev2213</a>
      </p>
    </>
  )
}

export default App
