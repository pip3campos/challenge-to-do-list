import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To Do App',
  description: 'Organize your tasks, set reminders, and stay on top of deadlines with our easy-to-use To-Do List app. Boost productivity on any device.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='h-full bg-white' lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
