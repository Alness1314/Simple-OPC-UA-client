import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RequestNode{
    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    nodeId: string;
}