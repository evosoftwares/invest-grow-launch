
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const TaskApproval = () => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const pendingTasks = [
    {
      id: 1,
      title: "Entrega de Documentos",
      partner: "João Silva",
      completedAt: "2024-01-15 14:30",
      value: 25.00,
      photos: ["photo1.jpg", "photo2.jpg"],
      description: "Documentos entregues conforme solicitado. Recepcionista Ana confirmou o recebimento.",
      status: "pending"
    },
    {
      id: 2,
      title: "Corrida para Aeroporto",
      partner: "Maria Santos",
      completedAt: "2024-01-15 16:45",
      value: 45.00,
      photos: ["photo3.jpg"],
      description: "Cliente transportado com segurança. Chegou no horário previsto.",
      status: "pending"
    }
  ];

  const handleApprove = (taskId: number) => {
    console.log(`Approved task ${taskId} with rating ${rating} and feedback: ${feedback}`);
    // Simulate approval process
    navigate('/mobile/client-dashboard');
  };

  const handleReject = (taskId: number) => {
    console.log(`Rejected task ${taskId} with feedback: ${feedback}`);
    // Simulate rejection process
    navigate('/mobile/client-dashboard');
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`text-2xl ${star <= rating ? 'text-blue-400' : 'text-slate-300'}`}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/mobile/client-dashboard')}
            className="hover:bg-slate-100"
          >
            <span>←</span>
          </Button>
          <img 
            src="/lovable-uploads/aa2570db-abbc-4ebd-8d58-1d58c9570128.png" 
            alt="Logo" 
            className="h-6"
          />
          <h1 className="text-xl font-light text-slate-700">Aprovação de Tarefas</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-blue-700">Tarefas Pendentes</h2>
                <p className="text-sm text-blue-600">{pendingTasks.length} aguardando sua aprovação</p>
              </div>
              <div className="text-blue-500 text-2xl">⏳</div>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          {pendingTasks.map((task) => (
            <Card key={task.id} className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium text-slate-700">{task.title}</CardTitle>
                    <p className="text-sm text-slate-500">por {task.partner}</p>
                    <p className="text-xs text-slate-400">Concluído em {task.completedAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-light text-blue-600">R$ {task.value.toFixed(2)}</p>
                    <Badge className="bg-blue-50 text-blue-600 border-blue-200">Pendente</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">{task.description}</p>
                
                {/* Photos */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Evidências Fotográficas:</p>
                  <div className="flex gap-2">
                    {task.photos.map((photo, index) => (
                      <div key={index} className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                        <span className="text-slate-400">📷</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approval Section */}
                {selectedTask === task.id ? (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Avaliação:</p>
                      <StarRating rating={rating} onRatingChange={setRating} />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Feedback (opcional):</p>
                      <Textarea
                        placeholder="Deixe um comentário sobre o trabalho realizado..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="border-slate-200 focus:border-blue-300"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleReject(task.id)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Rejeitar
                      </Button>
                      <Button
                        onClick={() => handleApprove(task.id)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                        disabled={rating === 0}
                      >
                        Aprovar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setSelectedTask(task.id);
                      setRating(0);
                      setFeedback('');
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    Revisar e Avaliar
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {pendingTasks.length === 0 && (
          <Card className="border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="text-slate-400 text-4xl mb-4">✅</div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Tudo em Dia!</h3>
              <p className="text-slate-500">Não há tarefas pendentes de aprovação no momento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaskApproval;
