import type { Media } from "@/payload-types";

/**
 * Vérifie si une image est un objet Media complet ou juste un ID
 * @param image - L'image à vérifier (peut être un ID, un objet Media, ou null/undefined)
 * @returns Un objet contenant le statut de population et les données de l'image
 */
export function checkImagePopulation(image: unknown): {
  isPopulated: boolean;
  imageData: Media | null;
} {
  const isImagePopulated = Boolean(
    image && typeof image === "object" && "url" in image
  );
  const imageData = isImagePopulated ? (image as Media) : null;

  return {
    isPopulated: isImagePopulated,
    imageData,
  };
}

/**
 * Vérifie si une image est populée et retourne directement les données
 * @param image - L'image à vérifier
 * @returns Les données de l'image si elle est populée, null sinon
 */
export function getPopulatedImageData(image: unknown): Media | null {
  const { imageData } = checkImagePopulation(image);
  return imageData;
}

/**
 * Vérifie si une image est populée
 * @param image - L'image à vérifier
 * @returns true si l'image est populée, false sinon
 */
export function isImagePopulated(image: unknown): boolean {
  const { isPopulated } = checkImagePopulation(image);
  return isPopulated;
}
