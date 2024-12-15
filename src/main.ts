import 'dotenv/config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

(async function () {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
})();
