export type ResponseChampionship = {
    id: string
    nome: string
    descricao: string
    premiacao: string
    dataInicio: string
    dataFim: string
    logo?: string
    situacao: 'ABERTO' | 'FINALIZADO' | 'INICIADO'
    qtdTimes: number
    userId: string
    tipoCampeonato: 'PLAYOFF' | 'PONTOS CORRIDOS'
}