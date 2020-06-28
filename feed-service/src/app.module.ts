import { Module } from '@nestjs/common';
import { ArticleModule } from './modules/article/article.module';
import { InfraModule } from './infra/infra.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InfraModule, ArticleModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true
  })
  ]
})
export class AppModule {}
