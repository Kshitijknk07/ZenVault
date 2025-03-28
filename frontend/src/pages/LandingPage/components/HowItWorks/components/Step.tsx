interface StepProps {
  number: number;
  title: string;
  description: string;
}

export const Step = ({ number, title, description }: StepProps) => {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
  );
};