import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { EnrollmentRepository } from "../../repositories/enrollment";
import { EnrollmentService } from "../../services/EnrollmentService";

export class GetEnrollmentByTeamController {
    async execute(req: Request, res: Response) {
        const { timeId } = req.body;

        const enrollmentRepository = new EnrollmentRepository(prisma);
        const enrollmentService = new EnrollmentService(enrollmentRepository); 

        const enrollments = await enrollmentService.getEnrollmentByTeam(timeId);
        return res.status(200).json(enrollments);
    }
}
