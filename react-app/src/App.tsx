import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// TODO - define Fruit interface properly
interface Fruit {
  id?: number
  name: string
  healthy?: boolean
}

function App() {
  const [fruits, setFruits] = useState<Fruit[]>([])

  const handlePostClick = () => {
    fetch('/.netlify/functions/fruits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Grape', healthy: true }),
    })
      .then(res => res.json())
      .then(result => {
        console.log('POST response data', result)
        // Update the fruits state with the new fruit added
        setFruits([...fruits, result[0]])
      })

  }

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const fruitsDataJson = await fetch('/.netlify/functions/fruits')
        console.log('fruitsDataJson', fruitsDataJson)
        const fruitsData = await fruitsDataJson.json()
        console.log('fruitsData', fruitsData)
        if (fruitsData) {
          setFruits(fruitsData)
        }
      } catch (error) {
        console.warn(error)
      }
    }

    componentDidMount()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handlePostClick}>
          POST /.netlify/functions/fruits
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="card">
        <ul>
          {fruits.map(fruit =>
            <li key={fruit.id}>
              {fruit.name}
            </li>
          )}
        </ul>
      </p>
    </>
  )
}

export default App
