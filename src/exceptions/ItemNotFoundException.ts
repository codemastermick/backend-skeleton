import { StatusCodes } from 'http-status-codes';
import HttpException from './HttpException';

export default class ItemNotFoundException extends HttpException {
  constructor(id: string) {
    super(StatusCodes.NOT_FOUND, `Item with id ${id} not found`);
  }
}
