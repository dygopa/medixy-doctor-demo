import { IAlly } from "domain/core/entities/allyEntity";
import { IContent } from "domain/core/entities/contentEntity";

export function contentSupabaseToMap(data: any, ally?: IAlly | null): IContent {
  return {
    contentId: data?.contenidoId ?? "",
    allyId: data?.aliadoId ?? "",
    ally: ally ?? null,
    comment: data?.comentario ?? "",
    description: data?.descripcion ?? "",
    isApproved: data?.aprobado ?? false,
    likes: data?.calificacion ?? 0,
    country: data?.pais ?? "Perú",
    status: data?.estado ?? "",
    category: data?.categoria ?? "",
    price: data?.precio ?? null,
    title: data?.titulo ?? "",
    imageUrl: data?.urlImagen ?? "",
    adminAttended: data?.usuarioAtendio ?? "",
    closeDate: data?.fechaCierre ? new Date(data.fechaCierre) : new Date(),
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as IContent;
}
