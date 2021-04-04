import {Users} from './users';

export interface Message {
    users: Users[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;

}
