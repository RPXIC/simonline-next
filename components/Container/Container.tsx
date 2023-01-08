export default function Container({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '.5rem' }}>{children}</div>
}
