import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export interface RequestWithUser extends Request { //Defino la interfaz RequestWithUser que extiende de Request
  user: User; //Propiedad user de tipo User
}