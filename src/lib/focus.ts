/** True when keyboard shortcuts should be ignored (text fields, menus, modals). */
export function isShortcutBlockedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false
  }

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) {
    return true
  }

  if (target instanceof HTMLElement && target.isContentEditable) {
    return true
  }

  if (
    target.closest('[data-shortcuts-blocked="true"], [role="menu"], [role="listbox"]')
  ) {
    return true
  }

  const dialog = target.closest('[role="dialog"]')
  if (dialog && dialog.getAttribute('data-canvas-panel') !== 'true') {
    return true
  }

  return false
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1,
  )
}
