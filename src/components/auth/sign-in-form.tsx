'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import Box from '@mui/material/Box';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import '@/components/auth/style.css';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'johnmurillo758@gmail.com', password: 'password' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const { error } = await authClient.signInWithPassword(values);
      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      await checkSession?.();
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack>
      <Stack className="wrapper">
        <Typography variant="h4" className="title">
          Login Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Stack className="field">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <Box className="field">
                      <input type="email" {...field} />
                      <label htmlFor="email">Email Address</label>
                    </Box>
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Stack>
            <br/><br/>
            <Stack>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <Stack>
                      <Stack className="field">
                        <input type="password" {...field} />
                        <label htmlFor="password">Password</label>
                      </Stack>
                    </Stack>
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Stack>
            <Stack className="field">
              {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
              <Button disabled={isPending} type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
