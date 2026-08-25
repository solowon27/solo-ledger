import { MetadataRoute } from 'next';
import { ROLES_DATA } from '@/lib/rolesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://solo-ledger.com';

  const roleUrls = Object.keys(ROLES_DATA).map((role) => ({
    url: `${baseUrl}/rate/${role}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/w2-to-1099-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/invoice-generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/project-pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-freelance-tax-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...roleUrls,
  ];
}