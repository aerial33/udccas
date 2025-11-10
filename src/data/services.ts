interface Service {
  slug: string
  name: string
  // autres propriétés pertinentes...
}

// Exemple de données, à remplacer par des données réelles de votre API
const services: Service[] = [
  { slug: "ares", name: "CCAS d'Arès" },
  { slug: "bordeaux", name: "CCAS de Bordeaux" },
  // etc.
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}
