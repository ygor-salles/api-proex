import * as yup from 'yup';

class BuildingDto {
  createValidation() {
    return yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      latitude: yup.number().required('Latitude é obrigatória'),
      longitude: yup.number().required('Longitude é obrigatória'),
      description: yup.string().required('Descrição é obrigatória'),
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
        .uuid('Id de prédio deve ser do tipo uuid')
        .required('Id de prédio é obrigatório no parametro da requisição'),
      name: yup.string().optional(),
      latitude: yup.number().optional(),
      longitude: yup.number().optional(),
      description: yup.string().optional(),
      organization_id: yup.string().uuid('Id da organização deve ser do tipo uuid').optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de prédio deve ser do tipo uuid')
        .required('Id de prédio é obrigatório no parametro da requisição'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de prédio deve ser do tipo uuid')
        .required('Id de prédio é obrigatório no parametro da requisição'),
    });
  }
}

export { BuildingDto };
