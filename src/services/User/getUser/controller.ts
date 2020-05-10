import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public getUser: ApiHandler = app.get('/getuser/:userid', async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.userid;
      const result = await this.service.getUser(userId);
      if (result === null) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
        return;
      }
      const response: ApiResponse<IUser> = new ApiResponse<IUser>().setResult(result);
      response.setMessage('User Found successfully');
      res.send(ResponseBuilder.ok(response));
    } catch (error) {
      res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
    }
  });
}