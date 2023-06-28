import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { EnrollmentRepository } from "../../repositories/enrollment";
import { EnrollmentService } from "../../services/EnrollmentService";

export class DeleteEnrollmentController {
  async execute(req: Request, res: Response) {
    const { enrollmentId } = req.body;

    const enrollmentRepository = new EnrollmentRepository(prisma);
    const enrollmentService = new EnrollmentService(enrollmentRepository);

    const enrollmentDelete = await enrollmentService.delete(enrollmentId);
    
    if (!enrollmentDelete) {
        return res.send({ message: "Houve um erro ao apagar a inscrição!" }).status(200);
    }
    
    return res.send({ message: "Inscrição apagada com sucesso!" }).status(400);
  }
}