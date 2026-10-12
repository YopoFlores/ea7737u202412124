/**
 * Language switcher component.
 *
 * @summary Toggle buttons to switch the user interface language between English and Spanish.
 * @author Juan Diego Flores Rios
 */
import {Component, computed, DOCUMENT, inject} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * Language selection with EN and ES select buttons.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, UpperCasePipe, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  /**
   * Supported languages.
   */
  protected readonly languages = ['en', 'es'];

  /**
   * Current language.
   */
  protected readonly currentLanguage = computed(() => this.translate.currentLang() ?? 'en');

  /**
   * Switches the user interface language.
   * @param language - Language code.
   */
  protected useLanguage(language: string): void {
    this.translate.use(language);
    this.document.documentElement.lang = language;
  }
}
