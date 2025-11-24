import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '智能语言转换工具 - 直白与委婉表达互转',
  description: 'AI智能沟通顾问，帮助用户优化语言表达，提供委婉转直白和直白转委婉的智能转换服务',
  keywords: '语言转换,情商语言,表达转换,职场沟通',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
