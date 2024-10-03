import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) {
    }

    @Get()
    getDataRest() {
        return this.getData();
    }

    public getData(): object {
        return this.appService.getData();
    }

}
