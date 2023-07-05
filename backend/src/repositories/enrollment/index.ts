import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { EnrollmentDTO } from "../../dtos/enrollment/enrollment";
import { CreateEnrollmentDTO } from "../../dtos/enrollment/createEnrollment";

export class EnrollmentRepository {

  constructor(private prisma: PrismaClient) {}

  async save({
    campeonatoId,
    timeId
  }: CreateEnrollmentDTO): Promise<EnrollmentDTO[]> {
    const createEnrollment = await this.prisma.$queryRaw`
      INSERT INTO 'main'.'inscricao_campeonato' (
        'id',
        'campeonatoId',
        'timeId'
      )
      VALUES (
        ${v4()},
        ${campeonatoId},
        ${timeId}
      )
    `;

    return createEnrollment as EnrollmentDTO[];
  }

  async getEnrollmentByChampionshipAndTeam(campeonatoId: string, timeId: string) {    
    const enrollment = await this.prisma.$queryRaw`
      SELECT * FROM inscricao_campeonato WHERE campeonatoId = ${campeonatoId} and timeId = ${timeId};
    `;

    return enrollment as EnrollmentDTO[];
  }

  async getEnrollmentByChampionship(campeonatoId: string) {   
    const enrollments = await this.prisma.$queryRaw`
      SELECT
        IC.id,
        T.escudo,
        T.nome,
        T.abreviacao,
        T.id AS "idTime",
        C.nome AS "nomeCampeonato"
      FROM
        inscricao_campeonato IC
        INNER JOIN times T ON T.id = IC."timeId"
        INNER JOIN campeonatos C ON C.id = IC."campeonatoId"        
      WHERE C.id = ${campeonatoId};
    `;

    return enrollments as EnrollmentDTO[];
  }

  async getEnrollmentByTeam(timeId: string) {   
    const enrollments = await this.prisma.$queryRaw`
      SELECT
        IC.id,
        C.nome,
        C.id AS "idCampeonato",
        T.nome AS "nomeTime"
      FROM
        inscricao_campeonato IC
        INNER JOIN campeonatos C ON C.id = IC."campeonatoId"  
        INNER JOIN times T ON T.id = IC."timeId"     
      WHERE T.id = ${timeId};
    `;

    return enrollments as EnrollmentDTO[];
  }

  async deleteEnrollment(id: string) {
    const enrollmentDelete = await this.prisma.$queryRaw`
			DELETE FROM 'main'.'inscricao_campeonato' 
			WHERE 'main'.'inscricao_campeonato'.'id' = ${id};
		`;
    return enrollmentDelete;
  }
}