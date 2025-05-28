import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader =
      request.headers["authorization"] || request.headers["Authorization"];
    if (
      !authHeader ||
      typeof authHeader !== "string" ||
      !authHeader.startsWith("Bearer ") ||
      !authHeader.slice(7).trim()
    ) {
      throw new UnauthorizedException("Bearer token is missing or empty");
    }
    return true;
  }
}
