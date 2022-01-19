import HttpException from './HttpException';

export default class ApplicationException extends HttpException {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(status, message);
  }
}
