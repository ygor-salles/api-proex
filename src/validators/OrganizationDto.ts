import * as yup from 'yup';

class OrganizationDto {
  createUpdateValidation() {
    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      cep: yup.string().required('Cep é obrigatório'),
      state: yup.string().required('Estado é obrigatório'),
      district: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatório'),
      street: yup.string().required('Rua é obrigatório'),
      number: yup.string().required('Número é obrigatório'),
      description: yup.string().required('Descrição é obrigatória'),
    });

    return schema;
  }
}

export { OrganizationDto };
