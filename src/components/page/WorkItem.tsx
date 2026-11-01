import { Link } from 'react-router-dom'
import { Handwritten } from '@/components/canvas/elements'
import type { ShowcaseProject } from '@/types'
import { FrameHover } from './FrameHover'

/** One pinned mockup + handwritten caption; the whole item is a single link. */
export function WorkItem({ project }: { project: ShowcaseProject }) {
  const { slug, title, role, year, cover, outcomeLine } = project
  const label = [
    `${title} — ${role}, ${year}.`,
    outcomeLine && `${outcomeLine}.`,
    'View project',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <FrameHover label={title} className="work-item">
      <Link to={`/work/${slug}`} className="work-item__link" aria-label={label}>
        <span className="work-item__media">
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="work-item__img"
          />
          {outcomeLine ? (
            <span className="work-item__pin" aria-hidden>
              {outcomeLine}
            </span>
          ) : null}
        </span>
        <div className="work-item__caption">
          <Handwritten as="h3" size={36} className="work-item__name">
            {title}
          </Handwritten>
          <p className="work-item__meta">
            {role} · {year}
          </p>
        </div>
      </Link>
    </FrameHover>
  )
}
