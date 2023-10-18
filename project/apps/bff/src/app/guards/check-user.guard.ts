import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { UserError } from '../app.constant';

@Injectable()
export class CheckUserGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${request.params.id}`);

    if (user.data.userId !== request.user.sub) {
      throw new NotFoundException(UserError.DeleteComment);
    }

    return true;
  }
}
