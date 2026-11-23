import { useEffect } from 'react';
import {
  DEFAULT_SEO,
  PACKAGE_SEO_VARIATIONS,
  SECTION_SEO_VARIATIONS,
  WEBSITE_TYPE_SEO_VARIATIONS,
  type SeoMetaVariation,
} from '../data/seoVariations';
import type { PackageOption } from '../data/nfsData';

interface SeoHeadManagerProps {
  activePackage?: PackageOption | null;
  activeWebsiteType?: string | null;
  activeHash?: string;
}

function upsertMetaTag(
  selector: string,
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SeoHeadManager({
  activePackage,
  activeWebsiteType,
  activeHash,
}: SeoHeadManagerProps) {
  useEffect(() => {
    let meta: SeoMetaVariation = DEFAULT_SEO;

    if (activeWebsiteType && WEBSITE_TYPE_SEO_VARIATIONS[activeWebsiteType]) {
      meta = WEBSITE_TYPE_SEO_VARIATIONS[activeWebsiteType];
    } else if (activePackage && PACKAGE_SEO_VARIATIONS[activePackage]) {
      meta = PACKAGE_SEO_VARIATIONS[activePackage];
    } else if (activeHash && SECTION_SEO_VARIATIONS[activeHash]) {
      meta = SECTION_SEO_VARIATIONS[activeHash];
    }

    document.title = meta.title;

    upsertMetaTag(
      'meta[name="description"]',
      'name',
      'description',
      meta.description
    );
    upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    upsertMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      meta.description
    );
    upsertMetaTag(
      'meta[name="twitter:title"]',
      'name',
      'twitter:title',
      meta.title
    );
    upsertMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      meta.description
    );

    const currentUrl =
      window.location.origin + window.location.pathname + window.location.search;
    upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    upsertCanonicalLink(currentUrl);
  }, [activePackage, activeWebsiteType, activeHash]);

  return null;
}
