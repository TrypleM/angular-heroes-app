import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, tap } from "rxjs";

export const canMatchPublicGuard: CanMatchFn = (_route: Route, _segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/heroes']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  )
}
