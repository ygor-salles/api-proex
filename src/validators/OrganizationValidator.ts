import * as yup from 'yup';

class OrganizationValidator {
  createValidation() {
    return yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      cep: yup.string().required('Cep é obrigatório'),
      state: yup.string().required('Estado é obrigatório'),
      district: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatório'),
      street: yup.string().required('Rua é obrigatório'),
      number: yup.number().required('Número é obrigatório'),
      description: yup.string().required('Descrição é obrigatória'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de organização deve ser do tipo uuid')
        .required('Id de organização é obrigatório no parametro da requisição'),
      name: yup.string().optional(),
      cep: yup.string().optional(),
      state: yup.string().optional(),
      district: yup.string().optional(),
      city: yup.string().optional(),
      street: yup.string().optional(),
      number: yup.number().optional(),
      description: yup.string().optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de organização deve ser do tipo uuid')
        .required('Id de organização é obrigatório no parametro da requisição'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de organização deve ser do tipo uuid')
        .required('Id de organização é obrigatório no parametro da requisição'),
    });
  }
}

export { OrganizationValidator };
