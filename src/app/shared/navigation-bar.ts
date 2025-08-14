import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AppConstants } from '../core/app-constants';
import { AppLanguage } from '../core/app-language';

@Component({
  selector: 'app-navigation-bar',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
    </nav>`,
})
export class NavigationBar implements OnInit {
  private readonly router = inject(Router);
  private readonly appConstants = inject(AppConstants);
  private readonly appLanguage = inject(AppLanguage);

  readonly languages = signal<string[]>([]);
  readonly selectedLanguageId = signal<string | undefined>(undefined);
  readonly isCollapsed = signal<boolean>(false);
  readonly canOpenJsonServer = signal<boolean>(false);

  ngOnInit() {
    this.languages.set(this.appLanguage.getSupportedLanguagesList());
    this.selectedLanguageId.set(this.appLanguage.getLanguageId());
    this.isCollapsed.set(true);
    this.canOpenJsonServer.set(this.appConstants.Application.SHOW_JSON_SERVER_API === true);
  }

  selectLanguage(language: string) {
    if (this.appLanguage.getLanguageId() !== language) {
      this.selectedLanguageId.set(language);
      this.appLanguage.setLanguageId(language);
    }
  }

  toggleCollapsed() {
    this.isCollapsed.update(v => !v);
  }

  goToAlbums() {
    this.router.navigateByUrl('/albums');
  }

  goToUsers() {
    this.router.navigateByUrl('/users');
  }

  openJsonServer() {
    window.open(this.appConstants.Application.JSON_SERVER_API_URL);
  }
}
