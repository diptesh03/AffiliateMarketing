import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from "react";
import { useAuth } from '../../context/auth-context'
import 'i18n.js'
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useForm } from "react-hook-form";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function FormLogin() {

  const { register, formState: { errors }, handleSubmit, getValues } = useForm();
  const { login } = useAuth();

  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }

  return (
    <Card style={{ margin:'30px'}}>
      <CardHeader title={<>
        <h2>{t('Login')}</h2>
        <select className="custom-select" style={{ width: 200 }} onChange={changeLanguageHandler}>
          <option value="en" >English</option>
          <option value="de" >German</option>
        </select>
      </>} />
      <Divider />
      <CardContent>
        <form className="form-login card" method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group">
            <TextField
              className="form-control"
              placeholder={t('Email')}
              style={{ marginBottom:'8px'}}
              variant='outlined'
              {...register("email", { required: true, pattern: emailRegex })}
            />
            {
              errors.email?.type === 'required' &&
              <span className="warning">email is required.</span>
            }
            {
              errors.email?.type === 'pattern' &&
              <span className="warning">Please enter valid email.</span>
            }
          </div>
          <div className="form-group">
            <TextField
              className="form-control"
              placeholder={t('Password')}
              style={{ marginBottom:'8px'}}
              type="password"
              variant='outlined'
              {...register("password", { required: true })}
            />
            {
              errors.password?.type === 'required' &&
              <span className="warning">Password is required</span>
            }
          </div>
          <div>
            <Button type="submit" color="primary">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );


  async function onSubmitHandler(e) {
    let data = {};

    /* email */
    data = { ...data, email: getValues('email') || '' };
    /* password */
    data = { ...data, pwd: getValues('password') || '' };
    login(data)
  }
}
export default FormLogin;