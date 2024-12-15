import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
