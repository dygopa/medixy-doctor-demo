import { IAlly } from "domain/core/entities/allyEntity";
import { IContent } from "domain/core/entities/contentEntity";

export function contentFirebaseToMap(data: any, ally?: IAlly | null): IContent {
  return {
    contentId: data?.postId ?? "",
    allyId: data?.aliadoId ?? "",
    ally: ally ?? null,
    comment: data?.comentario ?? "",
    description: data?.descripcion ?? "",
    isApproved: data?.isApproved ?? false,
    likes: data?.likes ?? 0,
    country: data?.pais ?? "Perú",
    status: data?.status ?? false,
    category: data?.categoria ?? "",
    price: data?.precio ?? null,
    title: data?.titulo ?? "",
    imageUrl: data?.urlImagen ?? "",
    adminAttended: data?.usuarioAtendio ?? "",
    closeDate: data?.closeDate ?? new Date(),
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IContent;
}
