
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Partner } from "@/hooks/usePartners";
import { PartnerStatusBadge } from "./PartnerStatusBadge";
import { PartnerTableActions } from "./PartnerTableActions";

interface PartnersTableProps {
  partners: Partner[];
  onStatusChange: (partnerId: string, status: 'pending' | 'active' | 'inactive' | 'blocked') => void;
  isLoading: boolean;
}

export const PartnersTable = ({ partners, onStatusChange, isLoading }: PartnersTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Parceiros ({partners.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parceiro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Taxa Comissão</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {partner.profiles?.full_name || partner.business_name || 'Nome não informado'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {partner.profiles?.email || 'Email não informado'}
                      </div>
                      {partner.profiles?.phone && (
                        <div className="text-sm text-gray-500">{partner.profiles.phone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <PartnerStatusBadge status={partner.status} />
                  </TableCell>
                  <TableCell className="font-medium">
                    {Number(partner.commission_rate).toFixed(1)}%
                  </TableCell>
                  <TableCell>{partner.specialty || '-'}</TableCell>
                  <TableCell>
                    {new Date(partner.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <PartnerTableActions
                      partner={partner}
                      onStatusChange={onStatusChange}
                      isLoading={isLoading}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
