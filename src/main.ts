import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局启用 ValidationPipe，这里的 transform 主要用于转换数据是否为 dto 实例，true 就是 dto 的实例，false 就是普通对象
  app.useGlobalPipes(new ValidationPipe({transform: true }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
