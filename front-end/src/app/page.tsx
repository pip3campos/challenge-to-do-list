
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const token = cookies().get('token')
  if (token) {
    redirect('/todo-list')
  } else {
    redirect('/sign-in')
  }

  return (
    <div><h1>Cheking for logged user...</h1></div>
  )
}
