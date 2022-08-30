import { Countries } from "../ENUMS/countries";

export interface Movie {
  id: number;
  title: string;
  folder: string;
  synopsi: string;
  year: string;
  category: string;
  trailer: string;
  watchedNumber: {
    total: number;
    countries: {
      [Countries.BR]: number;
      [Countries.USA]: number;
    }
  }
}
