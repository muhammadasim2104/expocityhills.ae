const SUPPRESS_MS = 600;

let suppressOverlayDismissUntil = 0;

export function markPhoneCountrySelectInteraction(
  durationMs = SUPPRESS_MS,
): void {
  suppressOverlayDismissUntil = Date.now() + durationMs;
}

export function shouldSuppressOverlayDismiss(): boolean {
  if (Date.now() < suppressOverlayDismissUntil) return true;

  const active = document.activeElement;
  return (
    active instanceof HTMLSelectElement &&
    active.classList.contains("PhoneInputCountrySelect")
  );
}
