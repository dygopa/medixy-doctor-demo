export interface IRecipe {
    recipeId: number;
    medicine: string;
    via: number;
    quantity: number;
    unit: number;
    frequencyMeasure: string;
    frequencyValue: number;
    duringMeasure: string;
    duringValue: number;
    indication: string;
    createdOn: Date;
}