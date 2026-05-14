export interface ImageAsset {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  location?: string;
}

export interface VideoAsset {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export interface Photographer {
  name: string;
  bio: string;
  specialty: string;
}
