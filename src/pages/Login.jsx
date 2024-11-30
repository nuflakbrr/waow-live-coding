import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAuth } from "@/hooks/useAuth"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const Login = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data) => {
    try {
      if (
        !['admin', 'guest'].includes(data.username) ||
        data.password !== 'password'
      ) {
        return alert('Invalid email or password!');
      }

      setUser(data);

      navigate('/');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="container w-full flex flex-col items-center justify-center mx-auto min-h-screen">
      <h1 className="text-4xl font-bold">Vite + React</h1>

      <Card className="w-[350px] mt-5">
        <CardHeader>
          <CardTitle>Silahkan Masuk</CardTitle>
          <CardDescription>Silahkan lengkapi formulir dibawah untuk login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} type="password" placeholder="**********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Login