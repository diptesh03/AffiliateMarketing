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
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

function FormLogin() {

  const { changePassword } = useAuth();

  const { t } = useTranslation();

  const formSchema = Yup.object().shape({
    oldPassword: Yup.string()
    .required('Password is required'),
    newPassword: Yup.string()
      .required('Password is required'),
    newPasswordConfirm: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords does not match'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, formState: { errors }, handleSubmit, getValues } = useForm(formOptions);

  return (
    <Card>
      <CardHeader title={<>
        <h2>{t('Change Password')}</h2>
      </>} />
      <Divider />
      <CardContent>
        <form className="form-login card" method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group">
            <TextField
              className="form-control"
              style={{ marginBottom:'8px'}}
              type="password"
              placeholder={"Old Password"}
              variant='outlined'
              {...register("oldPassword", { required: true })}
            />
            {
              errors.oldPassword &&
              <span className="warning">{errors?.oldPassword?.message}</span>
            }
          </div>
          <div className="form-group">
            <TextField
              className="form-control"
              style={{ marginBottom:'8px'}}
              placeholder={t('New Password')}
              type="password"
              variant='outlined'
              {...register("newPassword", { required: true })}
            />
            {
              errors.newPassword &&
              <span className="warning">{errors?.newPassword?.message}</span>
            }
          </div>
          <div className="form-group">
            <TextField
              className="form-control"
              style={{ marginBottom:'8px'}}
              placeholder={t('Confirm New Password')}
              type="password"
              variant='outlined'
              {...register("newPasswordConfirm", { required: true })}
            />
                {
              errors.newPasswordConfirm &&
              <span className="warning">{errors?.newPasswordConfirm?.message}</span>
            }
          </div>
          <div>
           <Button color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Confirm
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  async function onSubmitHandler() {
    let data = {};

    /* email */
    data = { ...data, email: getValues('email') || '' };
    /* password */
    changePassword(data)
  }
}
export default FormLogin;