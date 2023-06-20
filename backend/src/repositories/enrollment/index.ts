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
}