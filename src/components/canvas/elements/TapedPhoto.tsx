import { ImageFrame } from './ImageFrame'
import type { WorldPlacement } from './types'

interface TapedPhotoProps {
  placement: WorldPlacement
  src: string
  alt: string
  caption?: string
}

/** Polaroid photo with tape accents — convenience wrapper. */
export function TapedPhoto({ placement, src, alt, caption }: TapedPhotoProps) {
  return (
    <div
      className="taped-photo"
      style={{ position: 'absolute', left: placement.x, top: placement.y }}
    >
      <span className="taped-photo__tape taped-photo__tape--left" aria-hidden />
      <span className="taped-photo__tape taped-photo__tape--right" aria-hidden />
      <ImageFrame
        placement={{
          x: 0,
          y: 0,
          width: placement.width,
          height: placement.height,
          rotation: placement.rotation,
        }}
        variant="polaroid"
        src={src}
        alt={alt}
        caption={caption}
      />
    </div>
  )
}
