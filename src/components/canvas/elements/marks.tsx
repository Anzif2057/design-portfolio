import type { CSSProperties, ReactNode } from 'react'
import { placeStyle } from './place'
import type { WorldPlacement } from './types'

interface MarkProps {
  placement?: WorldPlacement
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
}

function MarkShell({
  placement,
  className = '',
  style,
  width = 80,
  height = 40,
  children,
}: MarkProps & { children: ReactNode }) {
  return (
    <span
      className={['sketch-mark', className].filter(Boolean).join(' ')}
      style={{
        ...(placement ? placeStyle(placement) : { display: 'inline-block' }),
        width: placement?.width ?? width,
        height: placement?.height ?? height,
        ...style,
      }}
      aria-hidden
    >
      {children}
    </span>
  )
}

export function Arrow({
  placement,
  className,
  style,
  width = 120,
  height = 60,
}: MarkProps) {
  return (
    <MarkShell
      placement={placement}
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <svg viewBox="0 0 120 60" width="100%" height="100%" fill="none">
        <path
          d="M8 42 C 36 8, 78 8, 104 28"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M92 18 L108 30 L90 38"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </MarkShell>
  )
}

export function Squiggle({
  placement,
  className,
  style,
  width = 160,
  height = 28,
}: MarkProps) {
  return (
    <MarkShell
      placement={placement}
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <svg viewBox="0 0 160 28" width="100%" height="100%" fill="none">
        <path
          d="M4 16 C 20 4, 36 28, 52 14 S 84 4, 100 18 S 132 28, 156 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </MarkShell>
  )
}

export function Star({
  placement,
  className,
  style,
  width = 36,
  height = 36,
}: MarkProps) {
  return (
    <MarkShell
      placement={placement}
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <svg viewBox="0 0 36 36" width="100%" height="100%" fill="currentColor">
        <path d="M18 3 l3.5 9.5 H32 l-8 6.2 3 9.8L18 23.5 9 28.5l3-9.8L4 12.5h10.5z" />
      </svg>
    </MarkShell>
  )
}

export function Bracket({
  placement,
  className,
  style,
  width = 28,
  height = 80,
}: MarkProps) {
  return (
    <MarkShell
      placement={placement}
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <svg viewBox="0 0 28 80" width="100%" height="100%" fill="none">
        <path
          d="M22 6 H10 C6 6 4 10 4 16 V64 C4 70 6 74 10 74 H22"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </MarkShell>
  )
}

export function Pushpin({
  placement,
  className,
  style,
  width = 22,
  height = 28,
}: MarkProps) {
  return (
    <MarkShell
      placement={placement}
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <svg viewBox="0 0 22 28" width="100%" height="100%" fill="currentColor">
        <circle cx="11" cy="8" r="6" />
        <path
          d="M11 14 V26"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </MarkShell>
  )
}

export function ScribbleUnderline({
  placement,
  className,
  style,
  width = 200,
  height = 18,
}: MarkProps) {
  return (
    <MarkShell
      placement={placement}
      className={className}
      style={style}
      width={width}
      height={height}
    >
      <svg viewBox="0 0 200 18" width="100%" height="100%" fill="none">
        <path
          d="M3 11 C 30 5, 55 15, 80 9 S 130 3, 155 12 S 185 16, 197 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </MarkShell>
  )
}
