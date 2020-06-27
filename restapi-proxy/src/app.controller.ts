import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    async home() {
        return "Welcome to the Poller REST Service";
    }
}