import { IAssets } from "../../utils/TypeScript";

export const GET_ASSETS = "GET_ASSETS"

export interface IGetAssets {
    type: typeof GET_ASSETS;
    payload: IAssets;
}