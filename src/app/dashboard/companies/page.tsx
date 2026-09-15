import { companiesService } from "@/services/companiesService";
import CompaniesClient from "./CompaniesClient";

export default async function CompaniesPage() {
  const response = await companiesService.getAll();

  return <CompaniesClient initialCompanies={response.data} />;
}
