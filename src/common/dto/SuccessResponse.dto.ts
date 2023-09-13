import { GenericResponse } from './GenericResponse.dto'
enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  readonly order?: Order = Order.ASC
  readonly page?: number = 1
  readonly take?: number = 10
  get skip (): number {
    if ( this.take && this.page ) {
      return ( this.page - 1 ) * this.take
    }
    return 0
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto
  itemCount: number
}

export class PageMetaDto {
  readonly page: number
  readonly take: number
  readonly itemCount: number
  readonly pageCount: number
  readonly hasPreviousPage: boolean
  readonly hasNextPage: boolean

  constructor ( { pageOptionsDto, itemCount }: PageMetaDtoParameters ) {
    this.page = pageOptionsDto.page ?? 0
    this.take = pageOptionsDto.take ?? 0
    this.itemCount = itemCount
    this.pageCount = Math.ceil( this.itemCount / this.take )
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}

export class SuccessResponse<T> extends GenericResponse {
  message?: string | undefined
  status?: string | number | undefined
  data: T
  pagination?: PageMetaDto
  constructor ( data: T, pagination?: PageMetaDto, message: string = 'Success', status?: string | number ) {
    super()
    this.message = message
    this.data = data
    this.status = status
    this.pagination = pagination
  }
}
