export interface Entry {
    id: string,
    date: string,
    weather: string,
    visibility: string
  }

export type NewEntry = Omit<Entry, 'id'>