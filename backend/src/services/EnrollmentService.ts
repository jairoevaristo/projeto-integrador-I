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
            const enrollmentDelete = await this.enrollmentRepository.deleteEnrollment(id);
            return enrollmentDelete;
        } catch (error: any) {
            new AppLogger().error(error);
            return null;
        }
    }

    async getEnrollmentByChampionship(campeonatoId: string) {
        try {            
            const enrollments = await this.enrollmentRepository.getEnrollmentByChampionship(campeonatoId);
            return enrollments;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }
}