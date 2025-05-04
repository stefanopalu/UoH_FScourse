export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }
  
  export interface Entry {
    id: string,
    date: string,
    weather: string,
    visibility: string,
    comment?: string,
  }

export type NewEntry = Omit<Entry, 'id'>