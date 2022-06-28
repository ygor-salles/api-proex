import * as yup from 'yup';

class ForgotValidator {
  forgotValidation() {
    return yup.object().shape({
      email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
    });
  }
}

export { ForgotValidator };
