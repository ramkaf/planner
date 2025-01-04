import { EventStatus } from './event.interface';

export interface ICreateEvent {
  name: string;
  description: string;
  date: Date;
  price?: number;
  capacity?: number;
  organizer_name?: string;
  organizer_contact?: string;
  image_url?: string;
  status: EventStatus;
  tag_ids?: number[];
  category_id: number; // Expecting Category entity
  author_id: number; // Expecting Author entity
  user_id: number;
  address_id: number;
}
