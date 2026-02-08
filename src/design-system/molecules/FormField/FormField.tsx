/**
 * FORM FIELD MOLECULE
 *
 * Combines label, input/textarea, and error message.
 * This is a reusable form field component.
 *
 * Atomic Design Level: MOLECULE (combination of atoms)
 *
 * Atoms used:
 * - Text (for label)
 * - Input or Textarea
 * - Text (for error message)
 *
 * Usage:
 *   <FormField
 *     label="Email"
 *     value={email}
 *     onChange={(e) => setEmail(e.target.value)}
 *     error="Invalid email"
 *   />
 */

import { Field } from '@chakra-ui/react';
import { Input, InputProps } from '../../atoms/Input';
import { Textarea, TextareaProps } from '../../atoms/Textarea';
import { COLORS, SPACING } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FormFieldProps {
  /**
   * Field label
   */
  label: string;

  /**
   * Field type (determines which input to render)
   */
  type?: 'text' | 'textarea' | 'email' | 'password' | 'number';

  /**
   * Input value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Required field indicator
   */
  required?: boolean;

  /**
   * Number of rows for textarea
   */
  rows?: number;

  /**
   * Additional input props
   */
  inputProps?: Partial<InputProps | TextareaProps>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const FormField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 3,
  inputProps = {},
}: FormFieldProps) => {
  const isTextarea = type === 'textarea';

  return (
    <Field.Root invalid={!!error}>
      <Field.Label
        color={COLORS.brand.text}            // Light text visible on dark background
        mb={SPACING.form.labelMarginBottom}
        fontWeight="medium"
      >
        {label}
        {required && (
          <span style={{ color: '#F87171' }}> *</span>  // Error red for required indicator
        )}
      </Field.Label>

      {isTextarea ? (
        <Textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          {...(inputProps as TextareaProps)}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...(inputProps as InputProps)}
        />
      )}

      {error && (
        <Field.ErrorText color={COLORS.brand.error}>
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};
