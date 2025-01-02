import { Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Patch('toggle-favorite/:eventId')
    async toggleFavorite(@Req() req, @Param('eventId') eventId: number): Promise<boolean> {
      const userId = req.user.id;
      return await this.userService.toggleFavorite(userId, eventId);
    }
}
