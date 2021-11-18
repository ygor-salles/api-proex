import * as yup from 'yup';
import { EnumRoleUser } from '../entities/User';

class UserDto {
  createValidation() {
    return yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
      password: yup.string().required('Senha é obrigatória'),
      role: yup
        .mixed<keyof typeof EnumRoleUser>()
        .oneOf(Object.values(EnumRoleUser))
        .required('Tipo de usuário é obrigatório'),
      organization_id: yup
        .string()
        .uuid('Id da organização deve ser do tipo uuid')
        .required('Id da Organização é obrigatória'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de usuário deve ser do tipo uuid')
        .required('Id de usuário é obrigatório no parametro da requisição'),
      name: yup.string().optional(),
      email: yup.string().optional(),
      password: yup.string().optional(),
      role: yup.mixed<keyof typeof EnumRoleUser>().oneOf(Object.values(EnumRoleUser)).optional(),
      organization_id: yup.string().uuid('Id da organização deve ser do tipo uuid').optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de usuário deve ser do tipo uuid')
        .required('Id de usuário é obrigatório no parametro da requisição'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de usuário deve ser do tipo uuid')
        .required('Id de usuário é obrigatório no parametro da requisição'),
    });
  }
}

export { UserDto };
