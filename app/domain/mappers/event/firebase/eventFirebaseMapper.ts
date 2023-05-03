import { IEvent, IEventFeatures } from "domain/core/entities/eventEntity";
import firebase from "firebase/app";

export function fromEventFirebaseMap(data: any): IEvent {
  const eventFeatures: IEventFeatures = {
    species: data?.features?.species ?? "",
    breed: data?.features?.breed ?? "",
  }

  return {
    eventId: data?.eventId ?? "",
    eventCategory: data?.eventCategory ?? "",
    title: data?.title ?? "",
    status: data?.status ?? "",
    imageUrl: data?.imageUrl ?? "",
    isPrivate: data?.isPrivate ?? false,
    description: data?.description ?? "",
    tags: data?.tags ?? [],
    country: data?.country ?? "",
    features: eventFeatures,
    isDelete: data?.isDelete ?? false,
    date: data?.date ?? null,
    createdOn: data?.createdOn ?? null,
    updatedOn: data?.updatedOn ?? null,
  } as IEvent;
}

export function fromEventFirebaseDocumentData(event: IEvent): firebase.firestore.DocumentData {
  const eventJSON = {
    eventId: event.eventId,
    eventCategory: event.eventCategory,
    title: event.title,
    status: event.status,
    imageUrl: event.imageUrl,
    isPrivate: event.isPrivate,
    description: event.description,
    tags: event.tags,
    country: event.country,
    features: event.features,
    isDelete: event.isDelete,
    date: event.date,
    createdOn: event.createdOn,
    updatedOn: event.updatedOn,
  } as firebase.firestore.DocumentData;

  return eventJSON;
}
