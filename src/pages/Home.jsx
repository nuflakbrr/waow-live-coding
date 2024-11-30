import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuth } from "@/hooks/useAuth"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'

const Home = () => {
  const [count, setCount] = useState(0)

  const { isLoading, user } = useAuth()
  const navigate = useNavigate()

  const handleReset = () => {
    setCount(0)
  }

  return (
    <main className="container w-full flex flex-col items-center justify-center mx-auto min-h-screen">
      <h1 className="text-4xl font-bold">{isLoading ? "Vite + React" : user.username}</h1>

      <Card className="w-[350px] mt-5">
        <CardHeader>
          <CardTitle>👋🏻 Hello From React!</CardTitle>
          <CardDescription>Ayo belajar React.js</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="flex items-center justify-center mx-auto mb-6" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>

          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={() => handleReset()}>Reset State Button</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Home