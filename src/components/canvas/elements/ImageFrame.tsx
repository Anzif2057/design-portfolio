import { elementStyle } from './place'
import type { WorldPlacement } from './types'

export type ImageFrameVariant = 'polaroid' | 'browser' | 'phone'

interface ImageFrameProps {
  /** Omit to render in normal flow. */
  placement?: WorldPlacement
  /** Tilt in degrees when rendered in flow. */
  rotation?: number
  variant?: ImageFrameVariant
  src: string
  alt: string
  caption?: string
  className?: string
}

export function ImageFrame({
  placement,
  rotation,
  variant = 'polaroid',
  src,
  alt,
  caption,
  className = '',
}: ImageFrameProps) {
  return (
    <figure
      className={['image-frame', `image-frame--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      style={elementStyle(placement, rotation)}
    >
      {variant === 'browser' ? (
        <div className="image-frame__chrome" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      ) : null}
      <div className="image-frame__viewport">
        <img src={src} alt={alt} draggable={false} />
      </div>
      {caption || variant === 'polaroid' ? (
        <figcaption className="font-hand image-frame__caption">
          {caption ?? ''}
        </figcaption>
      ) : null}
    </figure>
  )
}
