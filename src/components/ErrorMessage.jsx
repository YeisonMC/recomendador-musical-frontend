import { Card } from "@heroui/react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ detail, title = "No se pudieron generar recomendaciones." }) => {
  if (!title && !detail) {
    return null;
  }

  return (
    <Card className="border border-red-200 bg-red-50 shadow-sm">
      <Card.Content className="flex gap-3 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        <div>
          <p className="text-sm font-semibold text-red-800">{title}</p>
          {detail ? <p className="mt-1 text-sm text-red-700">{detail}</p> : null}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ErrorMessage;
