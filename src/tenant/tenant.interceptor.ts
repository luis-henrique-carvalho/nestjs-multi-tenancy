import { PrismaService } from 'src/prisma/prisma.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private readonly tenantService: TenantService,
    private readonly prismaService: PrismaService,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const partnerUser = await this.prismaService.partnerUser.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        partner: true,
      },
    });

    if (!partnerUser) {
      throw new Error('User is not a partner');
    }

    this.tenantService.setTenant(partnerUser.partner);

    return next.handle();
  }
}
