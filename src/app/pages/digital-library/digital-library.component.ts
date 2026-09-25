import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  DigitalLibraryService,
  BookCategory,
  ResourceLink
} from '../../services/digital-library.service';

@Component({
  selector: 'app-digital-library',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './digital-library.component.html',
  styleUrls: ['./digital-library.component.css']
})
export class DigitalLibraryComponent implements OnInit {

  categories: BookCategory[] = [];
  resourceLinks: ResourceLink[] = [];

  searchQuery = '';
  selectedCategory = 'all';
  loading = true;

  stats = {
    totalBooks: 1000,
    totalResources: 162,
    activeUsers: 250,
    totalDownloads: 5420
  };

  message = '';
  messageType: 'success' | 'error' = 'success';

  private messageTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private digitalLibrary: DigitalLibraryService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.loading = true;

      this.categories =
        await this.digitalLibrary.getCategories();

      this.resourceLinks =
        this.digitalLibrary.getOfficialResourceLinks();

    } catch (error) {
      console.error(
        'Error loading digital library:',
        error
      );

      this.showMessage(
        'Unable to load resources.',
        'error'
      );

    } finally {
      this.loading = false;
    }
  }

  filterResources(category: string): void {
    this.selectedCategory = category;
  }

  getFilteredResources(): ResourceLink[] {

    let resources = [...this.resourceLinks];

    if (this.selectedCategory !== 'all') {
      resources = resources.filter(resource =>
        resource.category === this.selectedCategory ||
        resource.category === 'All'
      );
    }

    const query = this.searchQuery
      .trim()
      .toLowerCase();

    if (!query) {
      return resources;
    }

    return resources.filter(resource => {

      const title =
        resource.title?.toLowerCase() || '';

      const description =
        resource.description?.toLowerCase() || '';

      const category =
        resource.category?.toLowerCase() || '';

      const url =
        resource.url?.toLowerCase() || '';

      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        url.includes(query)
      );
    });
  }

  searchResources(): void {
    // Filtering happens automatically
    // through getFilteredResources().
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
  }

  openLink(url: string): void {

    if (!url) {
      this.showMessage(
        'Resource link is not available.',
        'error'
      );
      return;
    }

    const opened = window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );

    if (opened) {
      this.showMessage(
        'Opening resource...',
        'success'
      );
    } else {
      this.showMessage(
        'Please allow popups to open this resource.',
        'error'
      );
    }
  }

  callNow(): void {
    window.location.href = 'tel:9506629814';
  }

  openWhatsApp(): void {
    window.open(
      'https://wa.me/919506629814?text=Hi, I am interested in Suraksha Library.',
      '_blank',
      'noopener,noreferrer'
    );
  }

  emailUs(): void {
    window.location.href =
      'mailto:surakshawalls@gmail.com';
  }

  showMessage(
    msg: string,
    type: 'success' | 'error' = 'success'
  ): void {

    this.message = msg;
    this.messageType = type;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  getCategoryColor(category: string): string {

    const colors: {
      [key: string]: string
    } = {

      School: '#2563eb',
      UPSC: '#7c3aed',
      SSC: '#8b5cf6',
      Banking: '#0891b2',
      Railway: '#dc2626',
      General: '#64748b',
      Programming: '#2563eb',
      Technical: '#475569',
      Jobs: '#059669',
      Skills: '#ea580c',
      Coding: '#4f46e5',
      Commerce: '#16a34a',
      Degree: '#9333ea',
      Junior: '#0d9488',
      'AI Tools': '#7c3aed',
      All: '#2563eb'

    };

    return colors[category] || '#64748b';
  }
}