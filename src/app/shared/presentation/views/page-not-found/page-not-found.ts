/**
 * Page not found view.
 *
 * @summary Fallback view for unsupported routes. It shows the requested path and a button to return to Home.
 * @author Juan Diego Flores Rios
 */
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays fallback content for unknown routes.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, MatIcon, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /**
   * The invalid path that led to this page.
   */
  protected invalidPath = '';

  /**
   * Reads the invalid path from the route.
   */
  ngOnInit(): void {
    this.invalidPath = '/' + this.route.snapshot.url.map(segment => segment.path).join('/');
  }

  /**
   * Navigates to the Home view.
   */
  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
