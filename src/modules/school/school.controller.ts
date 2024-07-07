import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolDto } from './dto/school.dto';
import { School } from '../../entity/school.entity';
import { UpdateSchoolDto } from './dto/updateSchool.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  // School Dashboard
 
  @Post('upload')
  @UseInterceptors(FileInterceptor('passportPicture'))
  async upload(@UploadedFile() file) {
    console.log(file);
  }

  // School entity
  @Get('')
  getSchool() {
    return this.schoolService.fetchSchool();
  }
  @Get(':id')
  async schoolById(@Param('id', ParseIntPipe) id: number) {
    const aschool = await this.schoolService.schoolById(id);
    return {
      name: aschool.name,
      address: aschool.address,
      location: aschool.user,
      Added_by: aschool.user.username,
    };
  }

  @Put(':id')
  async updateSchool(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSchoolDto,
  ) {
    return await this.schoolService.updateSchool(id, updateDto);
  }

  @Delete(':id')
  async removeSchool(@Param('id', ParseIntPipe) id: number) {
    this.schoolService.deleteSchool(id);
    return 'SChool removed from the database';
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addSchool(@Body() schoolData: SchoolDto): Promise<School> {
    return await this.schoolService.addSchool(schoolData);
  }
}
