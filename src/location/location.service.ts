import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { locationDto } from 'src/dto/location.dto';
import { City } from 'src/entity/city.entity';
import { Location } from 'src/entity/location.entity';
import { State } from 'src/entity/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  fetchLocation() {
    return this.locationRepository.find({ relations: ['schools'] });
  }

  async createLocation(locationDto: locationDto) {
    const existingLocation = await this.locationRepository.findOneBy({
      location: locationDto.location,
      state: locationDto.state,
    });
    if (existingLocation) {
      return { message: 'Location already added' };
    }
    const locationAdded = await this.locationRepository.save(locationDto);
    if (locationAdded) return { message: 'Location added' };
  }

  getLocationById(id: number) {
    return this.locationRepository.findOneBy({ id });
  }

  async addCity() {}

  async addState() {}
}
