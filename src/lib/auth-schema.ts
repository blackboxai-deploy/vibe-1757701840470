import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Digite um email válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Função para simular autenticação
export const authenticateUser = async (data: LoginFormData): Promise<{
  success: boolean
  message: string
  user?: { id: string; email: string; name: string }
}> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Simula credenciais válidas para demo
  const validCredentials = {
    email: 'usuario@exemplo.com',
    password: '123456'
  }
  
  if (data.email === validCredentials.email && data.password === validCredentials.password) {
    return {
      success: true,
      message: 'Login realizado com sucesso!',
      user: {
        id: '1',
        email: data.email,
        name: 'Usuário Exemplo'
      }
    }
  }
  
  return {
    success: false,
    message: 'Email ou senha incorretos. Tente: usuario@exemplo.com / 123456'
  }
}