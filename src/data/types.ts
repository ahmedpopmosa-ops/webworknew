export interface ServiceFAQ {
  qEn: string;
  aEn: string;
  qAr: string;
  aAr: string;
}

export interface ServiceFeature {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface ServiceProcess {
  stepEn: string;
  stepAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface ServiceDetail {
  slug: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  h1En: string;
  h1Ar: string;
  introEn: string[];
  introAr: string[];
  features: ServiceFeature[];
  process: ServiceProcess[];
  benefitsEn: string[];
  benefitsAr: string[];
  whyUsEn: string[];
  whyUsAr: string[];
  faqs: ServiceFAQ[];
  img: string;
}
