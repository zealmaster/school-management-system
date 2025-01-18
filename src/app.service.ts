import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to School! An all-in-one school record management application. A user can register a school or more in differet locations.';
  }

  getSomething(): string {
    return 'Something else in here';
  }
}
