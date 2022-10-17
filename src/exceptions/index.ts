import { BadRequestException } from './bad-request.exception';
import { ForbiddenException } from './forbidden.exception';
import { NotFoundException } from './not-found.exception';
import { InternalServerErrorException } from './internal-server-error.exception';
import { ThrottlerException } from './throttler.exception';

export const ExceptionByCode = {
	400: BadRequestException,
	403: ForbiddenException,
	404: NotFoundException,
	429: ThrottlerException,
	500: InternalServerErrorException
};
