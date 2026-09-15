import { Company } from "@/types/company";
import { SquarePen, Trash } from "lucide-react";
import { Column } from "@/types/table";
import ActionsMenu from "@/components/atoms/ActionsMenu";
import Text from "@/components/atoms/Text";

interface CompanyColumnsProps {
  setSelectedCompany: (company: Company) => void;
  onDelete: (id: string) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

export default function getCompanyColumns({
  setSelectedCompany,
  onDelete,
  openMenuId,
  setOpenMenuId,
}: CompanyColumnsProps): Column<Company>[] {
  return [
    {
      id: "name",
      header: "Nombre",
      render: (company) => (
        <Text variant="primary" size="sm" weight="medium">
          {company.name}
        </Text>
      ),
    },
    {
      id: "website",
      header: "Website",
      render: (company) => (
        <Text variant="primary" size="sm" weight="medium">
          {company.website || "-"}
        </Text>
      ),
    },
    {
      id: "industry",
      header: "Industria",

      render: (company) => (
        <Text variant="primary" size="sm" weight="medium">
          {company.industry || "-"}
        </Text>
      ),
    },
    {
      id: "description",
      header: "Descripción",

      render: (company) => <Text>{company.description || "-"} </Text>,
    },
    {
      id: "actions",
      header: "Acciones",
      render: (company) => (
        <div className="flex items-center gap-2">
          <ActionsMenu
            actions={[
              {
                label: "Editar",
                icon: <SquarePen size={16} />,
                onClick: () => setSelectedCompany(company),
              },
              {
                label: "Eliminar",
                icon: <Trash size={16} />,
                variant: "danger",
                onClick: () => onDelete(company.id),
              },
            ]}
            isOpen={openMenuId === company.id}
            onToggle={() => {
              setOpenMenuId(openMenuId === company.id ? null : company.id);
            }}
            onClose={() => setOpenMenuId(null)}
          />
        </div>
      ),
    },
  ];
}
