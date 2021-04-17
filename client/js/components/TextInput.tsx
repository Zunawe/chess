import React, { FC, useCallback } from 'react'

interface TextInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export const TextInput: FC<TextInputProps> = ({ value, defaultValue, onChange }) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    onChange?.(event.target.value)
  }, [onChange])

  return (
    <input type='text' onChange={handleChange} value={value ?? defaultValue ?? ''} />
  )
}
