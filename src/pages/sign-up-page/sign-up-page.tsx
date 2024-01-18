import { FC } from "react";
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export const signUpFormSchema = yup.object({
	email: yup.string().email().required(),
	// метод .strict() в конце нужен для корректной валидации
	// нижнего регистра
	group: yup.string().lowercase().required().strict(),
	password: yup.string().min(6).max(24).required(),
});

interface SignUpFormValues {
	email: string;
	group: string;
	password: string;
}

export const SignUpForm: FC = () => {
    const navigate = useNavigate();
    return (
        <>
        </>
    )
};