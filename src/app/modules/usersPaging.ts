import {Users} from './users';

export interface UsersPaging {
  content: Users[];
  pageable: {
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: false
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  numberOfElements: number,
  first: number,
  empty: number
}
