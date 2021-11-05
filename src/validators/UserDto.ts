import * as yup from 'yup';
import { EnumRoleUser } from '../entities/User';

class UserDto {
  createUpdateValidation() {
    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
      password: yup.string().required('Senha é obrigatória'),
      role: yup
        .mixed<keyof typeof EnumRoleUser>()
        .oneOf(Object.values(EnumRoleUser))
        .required('Tipo de usuário é obrigatório'),
    });
    return schema;
  }
}

export { UserDto };
