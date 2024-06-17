import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../users/user-roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflecto: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflecto.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
  }
}
