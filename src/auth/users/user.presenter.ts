import { User } from '@prisma/client';

export class UserPresenter {
  constructor(private readonly user: User) {}

  toJSON() {
    return {
      id: this.user.id,
      email: this.user.email,
      roles: this.user.roles,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt,
    };
  }
}
