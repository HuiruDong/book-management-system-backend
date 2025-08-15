import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // 支持加载静态服务
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局启用 ValidationPipe，这里的 transform 主要用于转换数据是否为 dto 实例，true 就是 dto 的实例，false 就是普通对象
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 支持跨域
  app.enableCors();

  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
