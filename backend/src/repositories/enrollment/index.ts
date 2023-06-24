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

  async deleteEnrollment(id: string) {
    const enrollmentDelete = await this.prisma.$queryRaw`
			DELETE FROM 'main'.'inscricao_campeonato' 
			WHERE 'main'.'inscricao_campeonato'.'id' = ${id};
		`;
    return enrollmentDelete;
  }
}