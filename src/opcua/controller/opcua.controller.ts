import { RequestNode } from './../dto/request-node';
import { Controller, Get, Delete, Put, Param, Query, Post, Body } from '@nestjs/common';
import { OpcuaService } from '../service/opcua.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('OPC UA')
@Controller('opcua')
export class OpcuaController {
  constructor(private readonly opcuaService: OpcuaService) {}

  @Put(':connectAddress')
  @ApiOperation({ summary: 'Operation description' })
  @ApiParam({
    name: 'connectAddress',
    required: true,
    description: 'Must be an opt ua server endpoint.',
    type: String
  })
  connect(@Param('connectAddress') connectAddress: string) {
    return this.opcuaService.conect(connectAddress);
  }

  
  @ApiOperation({ summary: 'Operation description' })
  @Get(':browseNodeId')
  searchNode(@Query() node: RequestNode) {
    return this.opcuaService.browseNode(node.nodeId);
  }

  @Get('value/:valueNodeId')
  @ApiOperation({ summary: 'Operation description' })
  @ApiParam({
    name: 'valueNodeId',
    required: true,
    description: 'Must be be an opc ua node id.',
    type: String
  })
  findOneNode(@Param('valueNodeId') valueNodeId: string) {
    return this.opcuaService.readValue(valueNodeId);
  }

  @Delete('disconnect')
  @ApiOperation({ summary: 'Operation description' })
  disconnect() {
    return this.opcuaService.connectionClose();
  }
}
