export interface CreateChampionshipDTO {
    nome: string
    descricao: string
    premiacao: string
    dataInicio: string
    dataFim: string
    logo: string | null
    situacao?: 'ABERTO' | 'FINALIZADO' | 'INICIADO'
    qtdTimes: number
    userId: string
    tipoCampeonato: 'PLAYOFF' | 'PONTOS CORRIDOS'
}