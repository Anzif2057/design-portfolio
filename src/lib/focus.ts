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

  return Boolean(
    target.closest(
      '[role="dialog"], [role="menu"], [role="listbox"], [data-shortcuts-blocked="true"]',
    ),
  )
}
