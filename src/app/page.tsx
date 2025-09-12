import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redireciona automaticamente para a página de login
  redirect('/login')
}