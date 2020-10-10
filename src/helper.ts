import { config } from './config';
import { OPTIONS } from './constants';

export const helper = (): string => {
    return `${config}_${OPTIONS}`;
};