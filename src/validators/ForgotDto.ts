import * as yup from 'yup';

class ForgotDto {
  forgotValidation() {
    return yup.object().shape({
      email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
    });
  }
}

export { ForgotDto };
