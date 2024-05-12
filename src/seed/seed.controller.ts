import { Controller, Get } from '@nestjs/common';

import { Auth } from '../auth/decorators';
import { SeedService } from './seed.service';
import { ValidRoles } from '../auth/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
