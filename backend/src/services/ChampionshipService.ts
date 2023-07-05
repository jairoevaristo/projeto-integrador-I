import { CreateChampionshipDTO } from "../dtos/championship/createChampionship";
import { UpdateChampionshipDTO } from "../dtos/championship/updateChampionship";
import { AppLogger } from "../logger/AppLogger";
import { ChampionshipRepository } from "../repositories/championship";

export class ChampionshipService {
    teamRepository: any;
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

    async getAllChampionship() {
        try {
            const championship = await this.championshipRepository.getAllChampionship()
            return championship;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async getChampionshipByName(name: string) {
        try {
            const championship = await this.championshipRepository.getChampionshipByName(name);
            return championship;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async getChampionshipById(id: string) {
        try {
            const championship = await this.championshipRepository.getChampionshipById(id);
            
            return championship;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async getTeamById(id: string) {
        try {
            const team = await this.teamRepository.getTeamById(id);
            
            return team;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async delete(id: string) {
        try {
            const teamDelete = await this.championshipRepository.deleteChampionship(id);
            return teamDelete;
        } catch (error: any) {
            new AppLogger().error(error);
            return null;
        }
    }

    async update({ id, nome, descricao, premiacao, dataInicio, dataFim, logo, situacao, qtdTimes, tipoCampeonato }: UpdateChampionshipDTO) {
        try {
          const championshipUpdate = await this.championshipRepository.update({
            id,
            nome,
            descricao,
            premiacao,
            dataInicio,
            dataFim,
            logo,
            situacao,
            qtdTimes,
            tipoCampeonato
          });
      
          return championshipUpdate;
        } catch (error: any) {
          new AppLogger().error(error);
          return null;
        }
      }      
}