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

        const createEnrollment: CreateEnrollmentDTO = req.body;

        const isChampionshipExists = await championshipService.getChampionshipById(createEnrollment.campeonatoId);
        
        if (isChampionshipExists?.length <= 0) {
            return res.send({ message: "Nenhum campeonato encontrado!" }).status(400);
        }

        const isTeamExists = await teamService.getTeamById(createEnrollment.timeId);
    
        if (isTeamExists?.length <= 0) {
            return res.send({ message: "Nenhum time encontrado!" }).status(400);
        }
    
        const isEnrollmentExists = await enrollmentService.getEnrollmentByChampionshipAndTeam(createEnrollment.campeonatoId, createEnrollment.timeId);
        
        if (isEnrollmentExists?.length > 0) {
            return res.send({ message: "Time já se encontra cadastrado!" }).status(400);
        }

        const enrollment = await enrollmentService.save({
            ...createEnrollment
        });
        
        if (enrollment?.length < 0) {
            return res.status(400).send({ message: 'Erro ao realizar a inscrição no campeonato'})
        }
        
        return res.send({ message: 'Inscrição realizada com sucesso.'}).status(201)
    }
}