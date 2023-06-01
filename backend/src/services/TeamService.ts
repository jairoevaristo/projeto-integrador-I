import { CreateTeamDTO } from "../dtos/team/createTeam";
import { UpdateTeamDTO } from "../dtos/team/updateTeam";
import { AppLogger } from "../logger/AppLogger";
import { TeamRepository } from "../repositories/team";

export class TeamService {
    constructor(private teamRepository: TeamRepository) {}

    async save(team: CreateTeamDTO) {
        try {     
            const createTeam = await this.teamRepository.save(team);
            return createTeam;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async getAllTeams() {
        try {
            const teams = await this.teamRepository.getAllTeams();
            return teams;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async getTeamByName(name: string) {
        try {
            const team = await this.teamRepository.getTeamByName(name);
            return team;
        } catch (error) {
            new AppLogger().error(error);
            return [];
        }
    }

    async delete(id: string) {
        try {
            const teamDelete = await this.teamRepository.deleteTeam(id);
            return teamDelete;
        } catch (error: any) {
            new AppLogger().error(error);
            return null;
        }
    }

    async update(
        { id, nome, abreviacao, escudo }: UpdateTeamDTO,
      ) {
        try {
          const teamUpdate = await this.teamRepository.update(
            { id, nome, abreviacao, escudo }
          );
          return teamUpdate;
        } catch (error: any) {
          new AppLogger().error(error);
          return null;
        }
    }
}
