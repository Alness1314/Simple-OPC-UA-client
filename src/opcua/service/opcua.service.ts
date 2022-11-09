import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  OPCUAClient,
  MessageSecurityMode, SecurityPolicy,
  AttributeIds,
  makeBrowsePath,
  ClientSubscription,
  TimestampsToReturn,
  MonitoringParametersOptions,
  ClientMonitoredItem,
  DataValue,
  referenceTypeToString
} from 'node-opcua';

@Injectable()
export class OpcuaService {

  cliente: any;
  conexion: any;
  session: any;

  async conect(endpoint: string): Promise<any> {
    const connectionStrategy = {
      initialDelay: 1000,
      maxRetry: 1
    }

    const options = {
      applicationName: "OPC UA Client NestJS",
      connectionStrategy: connectionStrategy,
      securityMode: MessageSecurityMode.None,
      securityPolicy: SecurityPolicy.None,
      endpoint_must_exist: false,
      keepSessionAlive: true
    };

    this.cliente = OPCUAClient.create(options);
    this.conexion = await this.cliente.connect(endpoint);
    this.session = await this.cliente.createSession();

    return {
      status: HttpStatus.ACCEPTED,
      message: `client connect to ${endpoint} successfully and session created`
    }
  }


  async connectionClose(): Promise<any> {
    // close session
    await this.session.close();

    // disconnecting
    await this.cliente.disconnect();
    console.log("done !");
    return {
      status: HttpStatus.ACCEPTED,
      message: `client disconected successfully and session closed`
    }
  }


  async browseNode(browseNodeId?: string): Promise<any> {
    console.log("node id controller: " + browseNodeId);
    // browse
    
    if (!browseNodeId) {
      browseNodeId = "RootFolder";
      console.log("entro: a setear root folder")
    }
    try {
      let listReferences = []
      console.log("Node id: " + browseNodeId);
      const browseResult = await this.session.browse(browseNodeId);
      console.log("references of RootFolder :");
      for (const reference of browseResult.references) {
        listReferences.push(reference);
        console.log("   -> ", reference.browseName.toString());
      }
      return listReferences;
    } catch (error) {
      throw new NotFoundException("Connection " + error);
    }
    
  }

  async readValue(node: string): Promise<any> {
    // step 4' : read a variable with read
    const maxAge = 0;
    const nodeToRead = {
      nodeId: node,
      attributeId: AttributeIds.Value
    };
    const dataValue = await this.session.read(nodeToRead, maxAge);
    console.log(" value ", dataValue.toString());
    return dataValue;
  }

  /*async readValue2(node:string){
    const dataValue2 = await this.session.readVariableValue(node);
        console.log(" value = " , dataValue2.toString());
        return dataValue2;
  }*/
}
