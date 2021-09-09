import { EntityRepository, Repository } from 'typeorm';
import { Organization } from '../entities/Organization';

@EntityRepository(Organization)
class OrganizationRepository extends Repository<Organization> { }

export { OrganizationRepository };
