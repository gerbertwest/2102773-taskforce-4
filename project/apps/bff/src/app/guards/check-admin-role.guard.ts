import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserRole } from '@project/shared/app-types';
import { UserError } from '../app.constant';

@Injectable()
export class CheckAdminRoleGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== UserRole.Admin) {
      throw new NotFoundException(UserError.AdminRole);
    }

    return true;

  }
}
