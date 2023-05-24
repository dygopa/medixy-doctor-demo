export interface IRecipe {
    recipeId: number;
    medicine: string;
    via: string;
    quantity: number;
    unit: string;
    frequencyMeasure: string;
    frequencyValue: number;
    duringMeasure: string;
    duringValue: number;
    indication: string;
    createdOn: Date;
}