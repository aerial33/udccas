import Image from 'next/image'
import logoSrc from '@/graphics/Logo-udccas.svg'

type UdLogoProps = {
  className?: string
  width?: number
  height?: number
}

export const UdLogo = ({ className, width = 225, height = 129 }: UdLogoProps) => {
  return (
    <Image
      src={logoSrc}
      alt="UDCCAS"
      width={width}
      height={height}
      className={className}
    />
  )
}

export const UdIcon = ({ className, width = 40, height = 40 }: UdLogoProps) => {
  return (
    <Image
      src={logoSrc}
      alt="UDCCAS"
      width={width}
      height={height}
      className={className}
    />
  )
}
