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
}