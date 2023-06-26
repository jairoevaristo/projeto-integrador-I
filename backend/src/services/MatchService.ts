import { CreateMatchDTO } from "../dtos/match/createMatch";
import { UpdateMatchDTO } from "../dtos/match/updateMatch";
import { AppLogger } from "../logger/AppLogger";
import { MatchRepository } from "../repositories/match";

export class MatchService {
  constructor(private matchRepository: MatchRepository) {}

  async save(match: CreateMatchDTO) {
    try {
      const createMatch = await this.matchRepository.save(match);
      return createMatch;
    } catch (error) {
      new AppLogger().error(error);
      return [];
    }
  }

  async getAllMatches() {
    try {
      const matches = await this.matchRepository.getAllMatches();
      return matches;
    } catch (error) {
      new AppLogger().error(error);
      return [];
    }
  }

  async getMatchById(id: string) {
    try {
      const match = await this.matchRepository.getMatchById(id);
      return match;
    } catch (error) {
      new AppLogger().error(error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      const matchDelete = await this.matchRepository.deleteMatch(id);
      return matchDelete;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }

  async update(match: UpdateMatchDTO) {
    try {
      const matchUpdate = await this.matchRepository.update(match);
      return matchUpdate;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }
}
