import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'

import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
import { Metadata } from 'next'


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
      <body>
        <Topbar />

        <main className='flex flex-row'>
          <LeftSidebar />
          <section className='main-container'>
            <div className='w-full max-w-4xl'>
              {children}
            </div>
          </section>
          <RightSidebar />
        </main>

        <Bottombar />
      </body>
    </html>
    </ClerkProvider>
  )
}
