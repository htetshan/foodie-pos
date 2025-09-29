import { Location } from "@prisma/client";

export interface LocationType {
  name: string;
  companyId?: number;
}

export interface LocationSliceType {
  locations: Location[];
  isLoading: boolean;
  error: string | null;
}
export interface UpdateLocationType {
  name: string;
}
