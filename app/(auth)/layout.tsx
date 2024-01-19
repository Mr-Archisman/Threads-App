import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'a Next.js 13 meta threads app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      
      <body className={`${inter.className} bg-dark-1`}>
        <div className='w-full flex justify-center items-center min-h-screen'>
        {children}
        </div>
      </body>
    </html>
    </ClerkProvider>
  )
}
