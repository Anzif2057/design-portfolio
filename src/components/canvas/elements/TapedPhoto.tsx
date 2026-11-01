import { ImageFrame } from './ImageFrame'
import { flowStyle } from './place'
import type { WorldPlacement } from './types'

interface TapedPhotoProps {
  /** Omit to render in normal flow (size it with `className`). */
  placement?: WorldPlacement
  /** Tilt in degrees when rendered in flow; tape tilts with the photo. */
  rotation?: number
  src: string
  alt: string
  caption?: string
  className?: string
}

/** Polaroid photo with tape accents — convenience wrapper. */
export function TapedPhoto({
  placement,
  rotation,
  src,
  alt,
  caption,
  className = '',
}: TapedPhotoProps) {
  return (
    <div
      className={['taped-photo', className].filter(Boolean).join(' ')}
      style={
        placement
          ? {
              position: 'absolute',
              left: placement.x,
              top: placement.y,
              width: placement.width,
            }
          : flowStyle(rotation)
      }
    >
      <span className="taped-photo__tape taped-photo__tape--left" aria-hidden />
      <span className="taped-photo__tape taped-photo__tape--right" aria-hidden />
      <ImageFrame
        placement={
          placement
            ? {
                x: 0,
                y: 0,
                width: placement.width,
                height: placement.height,
                rotation: placement.rotation,
              }
            : undefined
        }
        variant="polaroid"
        src={src}
        alt={alt}
        caption={caption}
      />
    </div>
  )
}
