import { BookDto } from "./bookDto";

export interface UserBookDto extends BookDto {
    id:number
    userId:number,
    readStatue:boolean,
    noteDetail:string
}