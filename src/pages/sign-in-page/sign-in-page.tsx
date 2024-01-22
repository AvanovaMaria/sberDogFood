import { FC } from "react";
import {
  Avatar,
  Box,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { useAppDispatch } from "../../services/hooks";
import { useSignInMutation } from "../../utils/api";
import { toast } from "react-toastify";
import { batch } from "react-redux";
import { setTokens } from "../../services/authSlice/authSlice";
import { setUser } from "../../services/user/userSlice";
import { getMessageFromError } from "../../utils/errorUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { objectHasProperty } from "../../utils/commonUtils";

export const signInFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(24).required(),
});

interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const [singInRequestFn] = useSignInMutation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
    try {
      const response = await singInRequestFn(values).unwrap();
      toast.success("Вы успешно вошли в систему");
      batch(() => {
        dispatch(setUser(response.data));
        dispatch(setTokens({ accessToken: response.token, refreshToken: "" }));
      });
      navigate(
        objectHasProperty(state, "from") && typeof state.from === "string"
          ? state.from
          : "/"
      );
    } catch (error) {
      toast.error(
        getMessageFromError(
          error,
          "Неизвестная ошибка при авторизации пользователя"
        )
      );
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  autoComplete="email"
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                  margin="normal"
                  fullWidth
                  required
                  {...field}
                />
              )}
            />

            <LoadingButton
              type="submit"
              disabled={isSubmitted && (!isValid || isSubmitting)}
              loading={isSubmitting}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};
