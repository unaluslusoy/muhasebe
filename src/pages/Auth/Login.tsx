import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAuth } from '@/contexts/AuthContext'
import { authService } from '@/services/authService'

const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  // useToast hook might not be set up yet in the codebase based on file list, 
  // but standard shadcn setup usually has it. I'll check if I need to create it or just use alert for now if it fails.
  // Looking at previous file lists, I didn't see use-toast.ts explicitly but components/ui usually has it.
  // To be safe, I'll use a simple error state for now or assume standard shadcn toast if available.
  // Let's check if components/ui/use-toast exists first? No, I'll just implement without toast first or use a local error state.
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.token, data.user)
      navigate('/dashboard')
    },
    onError: (err: any) => {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
      console.error(err)
    }
  })

  function onSubmit(data: LoginFormValues) {
    setError(null)
    loginMutation.mutate(data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>Hesabınıza erişmek için bilgilerinizi girin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
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
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-sm font-medium text-destructive text-center">
                  {error}
                </div>
              )}
              <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Giriş Yap
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Hesabınız yok mu? <Link to="/register" className="text-primary hover:underline">Kayıt Ol</Link>
          </div>
          <div className="text-xs text-center text-gray-400">
            Demo: admin@example.com / password
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
