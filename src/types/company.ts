import { Company } from "@prisma/client";
import { BaseOptionFunType } from "./baseOption";

export interface UpdateCompanyParam extends Company, BaseOptionFunType {}
