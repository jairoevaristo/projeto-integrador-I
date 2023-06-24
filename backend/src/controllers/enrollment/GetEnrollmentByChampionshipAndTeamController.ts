import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { EnrollmentRepository } from "../../repositories/enrollment";
import { EnrollmentService } from "../../services/EnrollmentService";

export class GetEnrollmentByChampionshipAndTeamController {
    async execute(req: Request, res: Response) {
        const { campeonatoId, timeId } = req.body;

        console.log(campeonatoId + ' - ' + timeId);
        const enrollmentRepository = new EnrollmentRepository(prisma);
        const enrollmentService = new EnrollmentService(enrollmentRepository); 

        const team = await enrollmentService.getEnrollmentByChampionshipAndTeam(campeonatoId, timeId);
        return res.status(200).json(team);
    }
}
