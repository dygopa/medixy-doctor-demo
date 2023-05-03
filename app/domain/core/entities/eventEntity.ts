export interface IEventFeatures {
    species: string;
    breed: string;
}

export interface IEvent {
    eventId: string;
    eventCategory: string;
    title: string;
    status: string;
    image: any;
    imageUrl: string;
    isPrivate: boolean;
    description: string;
    tags: string[];
    country: string;
    features: IEventFeatures;
    isDelete: boolean;
    date: any | null;
    createdOn: any | null;
    updatedOn: any | null;
}
