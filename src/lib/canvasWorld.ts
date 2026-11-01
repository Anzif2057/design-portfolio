/** Fixed world size for composed canvas sections (phase foundation). */
export const SECTION_WORLD = { width: 1400, height: 900 } as const

/**
 * About Me mobile crop — sized so 24px world body ≈ 14px+ on a ~390px screen
 * when fitted by width (~0.62× → ~15px). Stickies live outside this crop.
 */
export const ABOUT_MOBILE_BOUNDS = {
  x: 40,
  y: 8,
  width: 560,
  height: 870,
} as const

export const WELCOME_SIZE = { width: 360, height: 280 } as const
