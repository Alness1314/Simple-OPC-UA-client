import { Module } from '@nestjs/common';
import { OpcuaService } from './service/opcua.service';
import { OpcuaController } from './controller/opcua.controller';

@Module({
  controllers: [OpcuaController],
  providers: [OpcuaService]
})
export class OpcuaModule {}
