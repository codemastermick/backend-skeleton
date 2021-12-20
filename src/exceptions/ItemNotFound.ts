import HttpException from "./Http";

export default class ItemNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Item with id ${id} not found`);
    }
}