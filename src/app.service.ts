import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to School! This app allows users to upload their school information.The emphasis is the school location. A user can register a school or more in differet locations.';
  }

  getSomething(): string {
    return 'Something else in here';
  }
}
