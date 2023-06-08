export interface responseMessage {
  type: string;
  subType?: string;
  message: string;
  lastLine: number;
  lastColumn: number;
  firstColumn: number;
  extract: string;
  hiliteStart: number;
  hiliteLenght: number;
}