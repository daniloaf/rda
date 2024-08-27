import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

const addSerieFormSchema = yup
  .object({
    month: yup.number().integer().required(),
    year: yup.number().integer().required(),
  })
  .required()

type AddSerieForm = yup.InferType<typeof addSerieFormSchema>

export default function AddSerieFormComponent({
  open = false,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) {
  const { register, handleSubmit } = useForm<AddSerieForm>({ resolver: yupResolver(addSerieFormSchema) })
  const router = useRouter()

  const { mutate: addSerie, isPending } = useMutation<{ _id: string }, unknown, AddSerieForm>({
    mutationKey: ['addSerie'],
    mutationFn: async (data: AddSerieForm) => {
      const response = await axios.post(`/api/admin/series`, data)
      return response.data
    },
  })

  const onSubmit: SubmitHandler<AddSerieForm> = async (data) => {
    addSerie(data, {
      onSuccess: (response) => {
        router.push(`/admin/series/${response._id}`)
      },
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Nova Série</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <Select required type='number' {...register('month')}>
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {format(new Date(0, index + 1, 0), 'LLLL', {
                      locale: ptBR,
                    })}
                  </MenuItem>
                ))}
            </Select>
            <TextField required type='number' {...register('year')} />
            <Button type='submit' fullWidth disabled={isPending}>
              Salvar
            </Button>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  )
}
