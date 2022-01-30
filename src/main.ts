import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as RateLimit from 'express-rate-limit';
import { useSwagger } from 'src/swagger/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  useSwagger(app);
  app.use(compression());
  app.use(morgan('combined'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: false,
      },
    }),
  );
  await app.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
    console.log(`Documentation http://${HOST}:${PORT}/swagger`);
  });
}
void bootstrap();
