import { IsString, MinLength } from 'class-validator';

export class NewMessageDto {

  fullName: string;
  
  @IsString()
  @MinLength(1)
  message: string;
} 