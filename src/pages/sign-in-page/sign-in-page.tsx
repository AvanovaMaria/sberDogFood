import { FC } from "react";
import {
	Avatar,
	Box,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import * as yup from 'yup';

export const signInFormSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).max(24).required(),
});

interface SignInFormValues {
	email: string;
	password: string;
}

export const SignInPage: FC = () => {

    const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		//resolver: yupResolver(signInFormSchema),
	});

    return (
        <>
        <Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<AccountCircleIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<Box
					component='form'
					//onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ mt: 1 }}>
					{/* Чтобы подружить react-hook-form с MUI используем компонент Controller
              смотри доку https://react-hook-form.com/get-started#IntegratingwithUIlibraries
           */}
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								label='Email Address'
								type='email'
								fullWidth
								required
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Password'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								{...field}
							/>
						)}
					/>

					<LoadingButton
						type='submit'
						//disabled={isSubmitted && (!isValid || isSubmitting)}
						//loading={isSubmitting}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						Sign In
					</LoadingButton>
				</Box>
				<Link href='/signup'>{"Don't have an account? Sign Up!"}</Link>
			</Box>
		</Container>
        </>
    )
}