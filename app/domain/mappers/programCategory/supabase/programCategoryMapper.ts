import { IProgramCategory } from "domain/core/entities/programCategoryEntity";

export function programCategorySupabaseToMap(data: any): IProgramCategory {
  return {
    programCategoryId: data?.categoriaId ?? "",
    parentId: data?.padreCategoriaId ?? "",
    description: data?.descripcion ?? "",
    icon: data?.icono ?? "",
    level: data?.nivel ?? 1,
    name: data?.nombre ?? "",
    createdOn: data?.fechaCreacion ?? new Date(),
    updatedOn: data?.fechaActualizacion ?? new Date(),
    deletedOn: data?.fechaEliminacion ?? new Date(),
  } as IProgramCategory;
}
