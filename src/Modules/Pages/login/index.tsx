import { Container, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      login: '',
    },
  });

  type FormValues = {
    login: string;
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
      </form>
    </Container>
  );
};
