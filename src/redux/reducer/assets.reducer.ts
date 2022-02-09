import * as types from '../types/assets.types'

import { IAssets } from '../../utils/TypeScript'

const assetsReducer = (state: IAssets[] = [], action: types.IGetAssets): IAssets[] => {
    switch(action.type){
        case types.GET_ASSETS:
            return [action.payload]

        default:
            return state;
    }
}

export default assetsReducer