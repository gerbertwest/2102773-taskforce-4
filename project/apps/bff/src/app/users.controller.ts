import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestWithTokenPayload } from '@project/shared/app-types';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@project/util/util-core';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Patch('update')
  public async update(@Body() UpdateUserDto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, UpdateUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Patch('changePassword')
  public async changePassword(@Body() ChangePasswordDto: ChangePasswordDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/changePassword`, ChangePasswordDto, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('/:id')
  public async show(@Param('id') id: number, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return fillObject(UserRdo, data);
  }
}
