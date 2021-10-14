import { getCustomRepository } from 'typeorm';
import { EnumRoleUser } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

class DataSeed {
  // eslint-disable-next-line prettier/prettier
  public static async createUsers() {
    const repository = getCustomRepository(UserRepository);
    const arrayUsers = [];

    arrayUsers.push(
      repository.create({
        id: '371c3364-6f04-4d71-be49-424343067e7d',
        name: 'User 1',
        email: 'user1@gmail.com',
        password: '123456',
        role: EnumRoleUser.SUPER,
      })
    );
    arrayUsers.push(
      repository.create({
        id: 'a052600e-298f-4f03-a8cd-72a44d5fa1e5',
        name: 'User 2',
        email: 'user2@gmail.com',
        password: '123456',
        role: EnumRoleUser.NORMAL,
      })
    );
    arrayUsers.push(
      repository.create({
        id: '461bba46-d541-493b-8e07-46b03b560a48',
        name: 'User 3',
        email: 'user3@gmail.com',
        password: '123456',
        role: EnumRoleUser.NORMAL
      })
    );
    arrayUsers.push(
      repository.create({
        id: 'e9f728b5-9933-4993-8451-2bd0a91a9e8e',
        name: 'User 4',
        email: 'user4@gmail.com',
        password: '123456',
        role: EnumRoleUser.EMPLOYEE,
      })
    )

    await repository.save(arrayUsers);
  }
}

export { DataSeed };
