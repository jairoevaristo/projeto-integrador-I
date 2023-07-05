export interface UpdateChampionshipDTO {
  id: string
  nome: string
  descricao: string
  premiacao: string
  dataInicio: string
  dataFim: string
  logo?: string
  situacao: 'ABERTO' | 'FINALIZADO' | 'INICIADO'
  qtdTimes: number
  tipoCampeonato: 'PLAYOFF' | 'PONTOS CORRIDOS'
}