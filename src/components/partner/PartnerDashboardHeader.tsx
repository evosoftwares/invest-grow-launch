
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PartnerDashboardHeaderProps {
  userFullName?: string;
  onLogout: () => void;
}

const PartnerDashboardHeader = ({ userFullName, onLogout }: PartnerDashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Futuro PDV" 
            className="h-10 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="w-px h-6 bg-gray-300" />
          <h1 className="text-xl font-semibold text-gray-900">
            Dashboard do Parceiro
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Olá, {userFullName || 'Parceiro'}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PartnerDashboardHeader;
