import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { WhitelistIpService } from './whitelist-ip.service';
import APIException from 'src/common/dto/APIException.dto';

@Injectable()
export class ApiKeyAndIpAuthGuard implements CanActivate {
  constructor(private readonly whitelistIpService: WhitelistIpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: any = context.switchToHttp().getRequest();
    const apiKey = req.headers['x-api-key'] || req.headers['X-API-KEY'];
    const ip = req.ip || req.connection?.remoteAddress;

    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      throw new APIException(HttpStatus.UNAUTHORIZED, 'Invalid API Key');
    }

    const allowed = await this.whitelistIpService.isWhitelisted(ip);
    if (!allowed) {
      throw new APIException(HttpStatus.FORBIDDEN, 'Unauthorized IP address');
    }

    return true;
  }
}
