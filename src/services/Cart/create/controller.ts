import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public addItems: ApiHandler = app.post('/AddTocart', async (req: Request, res: Response) => {
    try {
      if (req.body && Object.keys(req.body).length <= 0) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Invalid request'));
        return;
      }
      const userId: string = req.body.userid;
      const productId: string = req.body.product_id;
      const result = await this.service.addItems(userId, productId);
      if (result === null) {
        const message: ApiResponse<any> = new ApiResponse<any>().setResult(result);
        message.setMessage('Item Already is in List');
        res.send(ResponseBuilder.ok(message));
        return;
      }
      const response: ApiResponse<any> = new ApiResponse<any>().setResult(result);
      response.setMessage('Item Added successfully');
      res.send(ResponseBuilder.ok(response));
    } catch (error) {
      res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
    }
  });
}