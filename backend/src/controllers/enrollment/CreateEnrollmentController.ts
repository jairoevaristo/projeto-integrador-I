import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { CreateEnrollmentDTO } from "../../dtos/enrollment/createEnrollment";

import { EnrollmentRepository } from "../../repositories/enrollment";
import { EnrollmentService } from "../../services/EnrollmentService";
import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";
import { ChampionshipRepository } from "../../repositories/championship";
import { ChampionshipService } from "../../services/ChampionshipService";

export class CreateEnrollmentController {
    async execute(req: Request, res: Response) {
        const { campeonatoId, timeIds }: { campeonatoId: string, timeIds: string[] } = req.body;

        const enrollmentRepository = new EnrollmentRepository(prisma);
        const enrollmentService = new EnrollmentService(enrollmentRepository);

        const championshipRepository = new ChampionshipRepository(prisma);
        const championshipService = new ChampionshipService(championshipRepository);

        const teamRepository = new TeamRepository(prisma);
        const teamService = new TeamService(teamRepository);

        const errors: string[] = [];
        const createdEnrollments: CreateEnrollmentDTO[] = [];

        const isChampionshipExists = await championshipService.getChampionshipById(campeonatoId);

        if (isChampionshipExists?.length <= 0) {
            return res.status(400).json({ error: `Nenhum campeonato encontrado para o ID ${campeonatoId}` });
        }
        else {
            await Promise.all(
                timeIds.map(async (timeId) => {
                    const isTeamExists = await teamService.getTeamById(timeId);
                    
                    if (isTeamExists?.length <= 0) {
                        errors.push(`Nenhum time encontrado com ID ${timeId}`);
                        return;
                    }

                    const isEnrollmentExists = await enrollmentService.getEnrollmentByChampionshipAndTeam(campeonatoId, timeId);

                    if (isEnrollmentExists?.length > 0) {
                        errors.push(`Time com ID ${timeId} já está cadastrado no campeonato`);
                        return;
                    }

                    const createEnrollment: CreateEnrollmentDTO = { campeonatoId, timeId };
                    await enrollmentService.save(createEnrollment);

                    createdEnrollments.push(createEnrollment);
                })
            );
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        return res.status(201).json({ message: 'Inscrições realizadas com sucesso.', createdEnrollments });
    }
}
