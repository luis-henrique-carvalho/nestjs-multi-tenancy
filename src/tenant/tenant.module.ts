import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantInterceptor } from './tenant.interceptor';

@Module({
  providers: [TenantService, TenantInterceptor],
})
export class TenantModule {}
