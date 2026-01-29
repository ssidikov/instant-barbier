import '../globals.css'

export default function HomeAltLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-cream text-navy font-body antialiased flex flex-col min-h-screen'>
      {children}
    </div>
  )
}
