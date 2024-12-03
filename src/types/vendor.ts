export type VendorCategory = 'Technology' | 'Services' | 'Supplies' | 'Consulting' | 'Manufacturing';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  number: string;
  email: string;
  url: string;
  media?: string;
}