
import { Partner } from "@/hooks/usePartners";

export const filterPartners = (
  partners: Partner[], 
  searchTerm: string, 
  statusFilter: string
): Partner[] => {
  return partners.filter(partner => {
    const partnerName = partner.profiles?.full_name || partner.business_name || '';
    const partnerEmail = partner.profiles?.email || '';
    
    const matchesSearch = partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};
