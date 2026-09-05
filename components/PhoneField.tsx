"use client";

import { useCallback, useEffect, useRef } from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { migratePhoneNumberToCountry } from "@/lib/migrate-phone-country";
import { markPhoneCountrySelectInteraction } from "@/lib/phone-country-select-guard";
import { DEFAULT_PHONE_COUNTRY } from "@/lib/visitor-country";

type PhoneFieldProps = {
  id?: string;
  name?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  defaultCountry?: Country;
  required?: boolean;
  "aria-invalid"?: boolean;
};

export default function PhoneField({
  id,
  name = "phone",
  value,
  onChange,
  onBlur,
  disabled,
  className = "",
  defaultCountry = DEFAULT_PHONE_COUNTRY,
  required,
  "aria-invalid": ariaInvalid,
}: PhoneFieldProps) {
  const hasInteractedRef = useRef(false);
  const inputKeyRef = useRef(`phone-${defaultCountry}`);
  const lastKnownValueRef = useRef(value);
  const pendingCountryRef = useRef<Country | undefined>(undefined);
  const suppressNextClearRef = useRef(false);

  if (!hasInteractedRef.current && !value) {
    inputKeyRef.current = `phone-${defaultCountry}`;
  }

  useEffect(() => {
    if (value) {
      lastKnownValueRef.current = value;
    }
  }, [value]);

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true;
  }, []);

  const armCountryChange = useCallback(
    (newCountry: Country | undefined) => {
      pendingCountryRef.current = newCountry;
      suppressNextClearRef.current = true;
      if (value) {
        lastKnownValueRef.current = value;
      }
      markPhoneCountrySelectInteraction(800);
    },
    [value],
  );

  const handleChange = useCallback(
    (next: string | undefined) => {
      markInteracted();

      if (suppressNextClearRef.current && lastKnownValueRef.current) {
        suppressNextClearRef.current = false;
        const newCountry = pendingCountryRef.current;
        pendingCountryRef.current = undefined;
        if (newCountry) {
          const migrated = migratePhoneNumberToCountry(
            lastKnownValueRef.current,
            newCountry,
          );
          if (migrated) {
            lastKnownValueRef.current = migrated;
            onChange(migrated);
            return;
          }
        }
      }

      suppressNextClearRef.current = false;
      pendingCountryRef.current = undefined;
      if (next) {
        lastKnownValueRef.current = next;
      } else {
        lastKnownValueRef.current = undefined;
      }
      onChange(next);
    },
    [markInteracted, onChange],
  );

  const handleCountryChange = useCallback(() => {
    markInteracted();
    markPhoneCountrySelectInteraction(800);
  }, [markInteracted]);

  const handleCountrySelectPointer = useCallback(() => {
    markPhoneCountrySelectInteraction();
  }, []);

  const handleCountrySelectCapture = useCallback(
    (event: React.ChangeEvent<HTMLDivElement>) => {
      const target = event.target;
      if (
        target instanceof HTMLSelectElement &&
        target.classList.contains("PhoneInputCountrySelect")
      ) {
        armCountryChange(target.value as Country);
      }
    },
    [armCountryChange],
  );

  const invalidClass = ariaInvalid ? "phone-field-invalid" : "";

  return (
    <div
      className="phone-field-root"
      onMouseDown={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLSelectElement &&
          target.classList.contains("PhoneInputCountrySelect")
        ) {
          handleCountrySelectPointer();
        }
        event.stopPropagation();
      }}
      onPointerDown={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLSelectElement &&
          target.classList.contains("PhoneInputCountrySelect")
        ) {
          handleCountrySelectPointer();
        }
        event.stopPropagation();
      }}
      onFocusCapture={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLSelectElement &&
          target.classList.contains("PhoneInputCountrySelect")
        ) {
          handleCountrySelectPointer();
        }
      }}
      onChangeCapture={handleCountrySelectCapture}
      onClick={(event) => event.stopPropagation()}
    >
      <PhoneInput
        id={id}
        name={name}
        key={inputKeyRef.current}
        international
        defaultCountry={defaultCountry}
        countryCallingCodeEditable={false}
        focusInputOnCountrySelection={false}
        value={value || undefined}
        onChange={handleChange}
        onCountryChange={handleCountryChange}
        onBlur={onBlur}
        disabled={disabled}
        numberInputProps={{
          "aria-invalid": ariaInvalid,
          "aria-required": required || undefined,
          required,
          onFocus: markInteracted,
          className: "PhoneInputInput",
        }}
        className={`PhoneInput phone-field-input-wrap ${invalidClass} ${className}`.trim()}
      />
    </div>
  );
}
