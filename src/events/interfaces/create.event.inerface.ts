import { User } from "src/users/entities/user.entity";
import { EventStatus } from "./event.interface";
import { Author } from "src/author/entities/author.entity";
import { Category } from "src/category/entities/category.entity";
import { Tag } from "src/tag/entities/tag.entity";

export interface ICreateEvent {
    name: string; 
    description: string; 
    date: Date; 
    address: string; 
    price?: number; 
    capacity?: number; 
    organizer_name?: string; 
    organizer_contact?: string; 
    image_url?: string; 
    status: EventStatus; 
    tag_ids?: number[]; 
    category_id: number; // Expecting Category entity
    author_id: number;     // Expecting Author entity
    user_id: number;         // Expecting User entity
  }
  