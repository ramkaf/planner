import { SelectQueryBuilder } from "typeorm";
import { FilterConfig } from "../types/filter.types";

export const EVENT_FILTER_CONFIG: Record<string, FilterConfig> = {
    category_id: {
      field: 'id',
      operator: 'eq',
      relation: 'category'
    },
    author_id: {
      field: 'id',
      operator: 'eq',
      relation: 'author'
    },
    user_id: {
      field: 'id',
      operator: 'eq',
      relation: 'user'
    },
    tag_ids: {
      field: 'tagId',
      operator: 'in',
      customQuery: (qb: SelectQueryBuilder<Event>, value: any) => {
        const tagIds = typeof value === 'string' ? value.split(',') : value;
        qb.andWhere(`
          EXISTS (
            SELECT 1 FROM event_tags_tag ett
            WHERE ett."eventId" = event.id
            AND ett."tagId" IN (:...tagIds)
          )
        `, { tagIds });
      }
    }
  };