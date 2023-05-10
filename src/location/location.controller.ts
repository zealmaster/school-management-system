import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UsePipes,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { locationDto } from 'src/dto/location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async getLocation() {
    const dLocation = await this.locationService.fetchLocation();
    return dLocation;
  }
  @Post()
  @UsePipes(ValidationPipe)
  async addLocation(@Body() locationDto: locationDto) {
    return await this.locationService.createLocation(locationDto);
  }
  @Get(':id')
  async getLocationId(@Param('id', ParseIntPipe) id: number) {
    return await this.locationService.getLocationById(id);
  }
}
