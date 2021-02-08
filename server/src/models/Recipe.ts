import { string } from "joi";
import { Document, model, ObjectId, Schema } from "mongoose";

export enum UnitEnum {
  gram = "gram",
  liter = "liter",
  stuks = "stuks",
}
export interface IIngredient {
  name: string;
  quantity: number;
  unit: UnitEnum;
}
export interface IRating {
  userId: ObjectId;
  value: number;
  createdAt: Date;
}
export interface IRecipe {
  name: string;
  steps: string[];
  ingredients: IIngredient[];
  userId: ObjectId;
  media: string[];
  rating: IRating[];
}

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    ingredients: {
      type: [
        {
          name: String,
          quantity: Number,
          unit: String,
        },
      ],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    media: [String],
    rating: [
      {
        userId: Schema.Types.ObjectId,
        value: Number,
        createdAt: {
          type: Date,
          createdAt: Date.now,
        },
      },
    ],
  },
  { versionKey: false }
);

interface IIngredientModel extends IIngredient, Document {}

export const Recipe = model<IIngredientModel>("recipe", recipeSchema);
