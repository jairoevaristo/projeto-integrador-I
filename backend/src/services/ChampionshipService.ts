import { CreateChampionshipDTO } from "../dtos/championship/createChampionship";
import { AppLogger } from "../logger/AppLogger";
import { ChampionshipRepository } from "../repositories/championship";

export class ChampionshipService {
    constructor(private championshipRepository: ChampionshipRepository) {}

    async save(championship: CreateChampionshipDTO) {
        try {
            const createChampionship = await this.championshipRepository.save(championship);
            return createChampionship;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }
}