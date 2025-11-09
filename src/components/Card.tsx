import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  title: string;
  body: string;
}

export function CardDemo({ title, body }: CardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <p>{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
