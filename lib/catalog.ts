import configuredSources from './sources.json';
export type Product={id:string;name:string;category:string;supplier:string;price:number;unit:string;vat:string;url:string;image:string;checkedAt:string;status:string;availability:string;delivery:string};
export const sources=configuredSources;
export const categories=['All materials','Boards & partitions','Adhesives','Tiles & flooring','Timber & plywood','Paints & coatings','Building materials','Hardware'];
