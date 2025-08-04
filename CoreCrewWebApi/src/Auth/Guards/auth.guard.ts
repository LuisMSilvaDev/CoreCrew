import { CanActivate, ExecutionContext, Injectable, UnauthorizedException  } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
 
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const token = authHeader?.split(' ')[1];
        
        if(!token) throw new UnauthorizedException();
        try
        {
            var tokenPayLoad = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: tokenPayLoad.sub,
                username: tokenPayLoad.username,
                roles: tokenPayLoad.Roles
            }
            return true;
        }
        catch (error) {
            throw new UnauthorizedException();
        }
    }
}