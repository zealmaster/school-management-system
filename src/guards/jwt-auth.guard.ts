import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserJwtAuthGuard extends AuthGuard('user_jwt') {}

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('admin_jwt') {}
