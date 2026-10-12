/**
 * Footer content component.
 *
 * @summary Displays the localized footer with copyright and authorship.
 * @author Juan Diego Flores Rios
 */
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Application footer.
 */
@Component({
  selector: 'app-footer-content',
  imports: [TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css',
})
export class FooterContent {
  /**
   * Author of the application.
   */
  protected readonly author = 'Juan Diego Flores Rios';
}
