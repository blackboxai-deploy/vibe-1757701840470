'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { loginSchema, type LoginFormData, authenticateUser } from '@/lib/auth-schema'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const rememberMe = watch('rememberMe')

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setAuthMessage(null)
    
    try {
      const result = await authenticateUser(data)
      
      if (result.success) {
        setAuthMessage({ type: 'success', text: result.message })
        // Aqui você redirecionaria o usuário para o dashboard
        console.log('Login successful:', result.user)
      } else {
        setAuthMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      setAuthMessage({ 
        type: 'error', 
        text: 'Erro interno do servidor. Tente novamente.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border-white/20 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
        <CardDescription>
          Digite suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Opções */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                Lembrar de mim
              </Label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              disabled={isLoading}
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Mensagem de autenticação */}
          {authMessage && (
            <div className={`p-3 rounded-md text-sm ${
              authMessage.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {authMessage.text}
            </div>
          )}

          {/* Botão de submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </div>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-gray-600">
          <p>Credenciais para demo:</p>
          <p className="text-blue-600 font-medium">usuario@exemplo.com / 123456</p>
        </div>
      </CardFooter>
    </Card>
  )
}