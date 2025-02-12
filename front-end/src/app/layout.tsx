import type { Metadata } from 'next'
import './globals.css'

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
      <body>
        <main className="max-w-4xl mx-auto mt-4">
          <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">To Do List App</h1>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
