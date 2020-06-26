import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database/connection';

@Global()
@Module({
    imports: [ DatabaseModule ],
    exports: [ DatabaseModule ]
})
export class InfraModule {}