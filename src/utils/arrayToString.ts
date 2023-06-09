import capitalizeFirstLetter from './capitalizeFirstLetter';
import { Dictionary } from '../types';

const arrayToString = (arr: Dictionary[]) => {
  let result: any[] = [];
  arr.forEach((item: Dictionary) => result.push(capitalizeFirstLetter(item.name)));
  return result.join(', ');
};

export default arrayToString;
