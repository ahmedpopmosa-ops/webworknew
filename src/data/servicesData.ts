import { ServiceDetail } from './types';
import { webDesign } from './services/web-design';
import { digitalMarketing } from './services/digital-marketing';
import { seo } from './services/seo';
import { mobileApps } from './services/mobile-apps';
import { branding } from './services/branding';
import { vr360 } from './services/360-vr';
import { marketingStrategy } from './services/marketing-strategy';
import { contentCreation } from './services/content-creation';
import { mediaBuying } from './services/media-buying';
import { emailMarketing } from './services/email-marketing';
import { motionGraphic } from './services/motion-graphic';

export const servicesData: Record<string, ServiceDetail> = {
  [webDesign.slug]: webDesign,
  [digitalMarketing.slug]: digitalMarketing,
  [seo.slug]: seo,
  [mobileApps.slug]: mobileApps,
  [branding.slug]: branding,
  [vr360.slug]: vr360,
  [marketingStrategy.slug]: marketingStrategy,
  [contentCreation.slug]: contentCreation,
  [mediaBuying.slug]: mediaBuying,
  [emailMarketing.slug]: emailMarketing,
  [motionGraphic.slug]: motionGraphic,
};
