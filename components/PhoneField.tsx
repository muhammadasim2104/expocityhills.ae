"use client";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type PhoneFieldProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
};

export default function PhoneField({
  id,
  name = "phone",
  value,
  onChange,
  onBlur,
  disabled,
  required,
}: PhoneFieldProps) {
  return (
    <div className="phone-field-root">
      <PhoneInput
        name={name}
        defaultCountry="ae"
        value={value}
        onChange={(next) => onChange(next)}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        forceDialCode
        preferredCountries={["ae", "sa", "gb", "in", "us", "qa", "kw", "om", "bh", "pk"]}
        countrySelectorStyleProps={{
          buttonClassName: "phone-field-country-btn",
          dropdownStyleProps: {
            className: "phone-field-country-dropdown",
            listItemClassName: "phone-field-country-option",
          },
        }}
        inputProps={{
          id,
          required,
          autoComplete: "tel",
          "aria-required": required || undefined,
          className: "phone-field-input",
        }}
        className="phone-field-wrap"
      />
    </div>
  );
}
