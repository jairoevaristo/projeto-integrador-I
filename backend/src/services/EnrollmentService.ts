import { CreateEnrollmentDTO } from "../dtos/enrollment/createEnrollment";
import { AppLogger } from "../logger/AppLogger";
import { EnrollmentRepository } from "../repositories/enrollment";

export class EnrollmentService {
    constructor(private enrollmentRepository: EnrollmentRepository) {}

    async save(enrollment: CreateEnrollmentDTO) {
        try {     
            const createEnrollment = await this.enrollmentRepository.save(enrollment);
            
            return createEnrollment;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    } 

    async getEnrollmentByChampionshipAndTeam(campeonatoId: string, timeId: string) {
        try {            
            const enrollment = await this.enrollmentRepository.getEnrollmentByChampionshipAndTeam(campeonatoId, timeId);
            return enrollment;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async delete(id: string) {
        try {
            const teamDelete = await this.enrollmentRepository.deleteEnrollment(id);
            return teamDelete;
        } catch (error: any) {
            new AppLogger().error(error);
            return null;
        }
    }
}