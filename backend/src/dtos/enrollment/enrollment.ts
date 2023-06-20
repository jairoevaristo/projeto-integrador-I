export interface EnrollmentDTO {
    id: string;
    campeonatoId: string;
    campeonato: {
      id: string;
      name: string;
    };
    timeId: string;
    time: {
      id: string;
      name: string;
    };
}