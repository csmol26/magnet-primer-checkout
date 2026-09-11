import type { ReactNode } from 'react';
import './MerchantFields.css';

/**
 * Magnet's own form fields. These are plain merchant inputs, not Primer
 * components: they carry no card data, so they stay outside PCI scope and stay
 * fully under Magnet's control.
 */

interface FieldProps {
  label: string;
  children: ReactNode;
  htmlFor?: string;
}

export function MerchantField({ label, children, htmlFor }: FieldProps) {
  return (
    <div className="magnet-field">
      <label className="magnet-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function MerchantTextField({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
}: TextFieldProps) {
  return (
    <MerchantField label={label} htmlFor={id}>
      <input
        id={id}
        className="magnet-field__input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </MerchantField>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function MerchantSelectField({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <MerchantField label={label} htmlFor={id}>
      <div className="magnet-field__select-wrap">
        <select
          id={id}
          className="magnet-field__input magnet-field__select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="m7 10 5 5 5-5Z" />
        </svg>
      </div>
    </MerchantField>
  );
}
