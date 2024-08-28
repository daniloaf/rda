import { TextField, TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface DateFieldProps extends Omit<TextFieldProps, 'variants'> {
  name: string
}

export default function RHFDateField({ name, ...rest }: DateFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField fullWidth type='date' {...field} {...rest} />}
    />
  )
}
