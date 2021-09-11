import * as yup from 'yup';

class BuildingDto {
  createUpdateValidation() {
    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      latitude: yup.number().required('Latitude é obrigatória'),
      longitude: yup.number().required('Longitude é obrigatória'),
      description: yup.string().required('Descrição é obrigatória'),
      organization_id: yup
        .string()
        .uuid('Id da organização deve ser do tipo uuid')
        .required('Id da Organização é obrigatória'),
    });

    return schema;
  }
}

export { BuildingDto };
