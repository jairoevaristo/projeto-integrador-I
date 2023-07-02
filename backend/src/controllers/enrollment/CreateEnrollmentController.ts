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
        const enrollmentRepository = new EnrollmentRepository(prisma);
        const enrollmentService = new EnrollmentService(enrollmentRepository);

        const championshipRepository = new ChampionshipRepository(prisma);
        const championshipService = new ChampionshipService(championshipRepository);

        const teamRepository = new TeamRepository(prisma);
        const teamService = new TeamService(teamRepository);

        const enrollmentsToCreate: CreateEnrollmentDTO[] = req.body;

        const errors: string[] = [];
        const createdEnrollments: CreateEnrollmentDTO[] = [];

        await Promise.all(
            enrollmentsToCreate.map(async (createEnrollment) => {
                const isChampionshipExists = await championshipService.getChampionshipById(createEnrollment.campeonatoId);

                if (isChampionshipExists?.length <= 0) {
                    errors.push(`Nenhum campeonato encontrado para o time com ID ${createEnrollment.timeId}`);
                    return;
                }

                const isTeamExists = await teamService.getTeamById(createEnrollment.timeId);

                if (isTeamExists?.length <= 0) {
                    errors.push(`Nenhum time encontrado com ID ${createEnrollment.timeId}`);
                    return; 
                }

                const isEnrollmentExists = await enrollmentService.getEnrollmentByChampionshipAndTeam(createEnrollment.campeonatoId, createEnrollment.timeId);

                if (isEnrollmentExists?.length > 0) {
                    errors.push(`Time com ID ${createEnrollment.timeId} já está cadastrado no campeonato`);
                    return; 
                }

                await enrollmentService.save({
                    ...createEnrollment
                });

                createdEnrollments.push({
                    campeonatoId: createEnrollment.campeonatoId,
                    timeId: createEnrollment.timeId
                });                
            })
        );

        if (errors.length > 0) {
            return res.status(400).send({ errors });
        }

        return res.send({ message: 'Inscrições realizadas com sucesso.', createdEnrollments }).status(201);
    }
}