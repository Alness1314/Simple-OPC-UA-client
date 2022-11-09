import { Module } from '@nestjs/common';
import { OpcuaModule } from './opcua/opcua.module';

@Module({
  imports: [OpcuaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
