import { Request, Response } from "express";

class ServicesController {
  create(request: Request, response: Response) {
    return response.json({ message: "Ok" });
  }
}

export { ServicesController };
