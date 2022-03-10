import { BookDto } from "./bookDto";

export interface UserBookDto extends BookDto {
    userId:number,
    readStatue:boolean,
    noteDetail:string
}