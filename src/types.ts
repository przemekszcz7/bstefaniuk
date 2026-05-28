/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Offer {
  id: string;
  category: 'mieszkanie' | 'dzialka' | 'dom';
  categoryLabel: string;
  tag: 'NOWOŚĆ' | 'PREMIUM' | 'POLECANE';
  image: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  pills: string[];
  price?: string;
  location: string;
  features: {
    label: string;
    value: string;
  }[];
  dateLabel: string;
}

export interface ContactFormData {
  fullName: string;
  contactInfo: string;
  subject: 'Kupno nieruchomości' | 'Sprzedaż nieruchomości' | 'Wynajem' | 'Inwestycja' | 'Inne';
  message: string;
}
