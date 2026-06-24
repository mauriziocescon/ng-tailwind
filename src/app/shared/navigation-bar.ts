import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { AppConstants } from '../core/app-constants';
import { AppLanguage } from '../core/app-language';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    TranslocoPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 backdrop-blur-md shadow-lg px-6 py-3">
      <div class="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <a class="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight hover:scale-105 transition-transform duration-200" href="#">
          <svg class="size-8 animate-[spin_3s_linear_infinite]" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
            <path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
            <path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
          </svg>
          {{ "NAVIGATION_BAR.NAME" | transloco }}
        </a>
        <button class="lg:hidden text-white/90 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200" type="button" (click)="toggleCollapsed()">
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          class="w-full lg:flex lg:w-auto lg:items-center"
          [class.hidden]="isCollapsed()">
          <ul class="flex flex-col lg:flex-row lg:mr-auto gap-1 lg:gap-2 mt-3 lg:mt-0">
            <li>
              <a class="block text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer" (click)="goToAlbums()">
                {{ "NAVIGATION_BAR.ALBUMS" | transloco }}
              </a>
            </li>
            <li>
              <a class="block text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer" (click)="goToUsers()">
                {{ "NAVIGATION_BAR.USERS" | transloco }}
              </a>
            </li>
          </ul>
          <ul class="flex flex-col lg:flex-row gap-1 lg:gap-2 mt-2 lg:mt-0 pr-4">
            @if (canOpenJsonServer()) {
              <li>
                <a class="block text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer" (click)="openJsonServer()">
                  <svg class="size-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-7-4h.01M12 16h.01" />
                  </svg>
                </a>
              </li>
            }
            <li class="relative">
              <a
                class="block text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
                (click)="toggleDropdown()">
                {{ selectedLanguageId() }} ▾
              </a>
              @if (isDropdownOpen()) {
                <div class="absolute right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl dark:shadow-black/40 py-2 min-w-[140px] z-50 border border-gray-100 dark:border-gray-700">
                  @for (language of languages(); track language) {
                    <a
                      class="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer transition-colors duration-150"
                      (click)="selectLanguage(language)">
                      {{ language }}
                    </a>
                  }
                </div>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavigationBar implements OnInit {
  private readonly router = inject(Router);
  private readonly appConstants = inject(AppConstants);
  private readonly appLanguage = inject(AppLanguage);

  readonly languages = signal<string[]>([]);
  readonly selectedLanguageId = signal<string | undefined>(undefined);
  readonly isCollapsed = signal<boolean>(true);
  readonly isDropdownOpen = signal<boolean>(false);
  readonly canOpenJsonServer = signal<boolean>(false);

  ngOnInit() {
    this.languages.set(this.appLanguage.getSupportedLanguagesList());
    this.selectedLanguageId.set(this.appLanguage.getLanguageId());
    this.canOpenJsonServer.set(this.appConstants.Application.SHOW_JSON_SERVER_API === true);
  }

  selectLanguage(language: string) {
    if (this.appLanguage.getLanguageId() !== language) {
      this.selectedLanguageId.set(language);
      this.appLanguage.setLanguageId(language);
    }
    this.isDropdownOpen.set(false);
  }

  toggleCollapsed() {
    this.isCollapsed.update(v => !v);
  }

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
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
