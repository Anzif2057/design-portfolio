interface SectionSelectionChromeProps {
  label: string
}

/** Dashed accent outline + corner handles + floating label. */
export function SectionSelectionChrome({ label }: SectionSelectionChromeProps) {
  return (
    <div className="section-selection" aria-hidden>
      <span className="section-selection__label">{label}</span>
      <span className="section-selection__handle section-selection__handle--tl" />
      <span className="section-selection__handle section-selection__handle--tr" />
      <span className="section-selection__handle section-selection__handle--bl" />
      <span className="section-selection__handle section-selection__handle--br" />
    </div>
  )
}
