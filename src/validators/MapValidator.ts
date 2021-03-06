import * as yup from 'yup';

class MapValidator {
  createValidation() {
    return yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      source: yup.string().required('Url é obrigatório'),
      description: yup.string().required('Descrição é obrigatória'),
      building_id: yup
        .string()
        .uuid('Id de prédio deve ser do tipo uuid')
        .required('Id de prédio é obrigatório'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de mapa deve ser do tipo uuid')
        .required('Id de mapa é obrigatório no parametro da requisição'),
      name: yup.string().optional(),
      source: yup.string().optional(),
      description: yup.string().optional(),
      building_id: yup.string().uuid('Id de prédio deve ser do tipo uuid').optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de mapa deve ser do tipo uuid')
        .required('Id de mapa é obrigatório no parametro da requisição'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de mapa deve ser do tipo uuid')
        .required('Id de mapa é obrigatório no parametro da requisição'),
    });
  }
}

export { MapValidator };
