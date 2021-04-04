import {Category} from './category';

export interface CategoryPaging {
  content: Category[];
  pageable: {
    sort: {
      unsorted: boolean,
      sorted: boolean,
      empty: boolean
    },
    offset: number,
    pageSize: number,
    pageNumber: number,
    paged: boolean,
    unpaged: boolean
  },
  totalElements: number,
  totalPages: number,
  last: boolean,
  number: number,
  size: number,
  sort: {
    unsorted: boolean,
    sorted: boolean,
    empty: boolean
  }

  numberOfElements: number,
  first: boolean,
  empty: boolean
}



