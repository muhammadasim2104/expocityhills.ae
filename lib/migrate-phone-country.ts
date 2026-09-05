import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

function extractNationalNumber(value: string): string | undefined {
  const parsed = parsePhoneNumberFromString(value);
  if (parsed?.nationalNumber) return parsed.nationalNumber;

  const asYouType = new AsYouType();
  asYouType.input(value);
  const national = asYouType.getNationalNumber();
  return national || undefined;
}

/** Keep national digits when the visitor switches dial country. */
export function migratePhoneNumberToCountry(
  value: string,
  newCountry: CountryCode,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed || !newCountry) return undefined;

  const nationalNumber = extractNationalNumber(trimmed);
  if (!nationalNumber) return undefined;

  const callingCode = getCountryCallingCode(newCountry);
  const migrated = `+${callingCode}${nationalNumber}`;
  if (migrated === trimmed) return undefined;
  return migrated;
}
