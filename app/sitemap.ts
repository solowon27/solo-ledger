import { MetadataRoute } from 'next';
import { ROLES_DATA } from '@/lib/rolesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sololedger.app'; // Replace with your actual domain when registered

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
    ...roleUrls,
  ];
}