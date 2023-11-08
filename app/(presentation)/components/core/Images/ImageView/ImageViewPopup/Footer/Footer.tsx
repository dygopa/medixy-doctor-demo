interface IFooterProps {
  description: string;
}

export default function Footer({ description }: IFooterProps) {
  if (description.length === 0) return <div />;

  return (
    <div className="w-full h-full p-2" style={{ backgroundColor: "#F1F5F9" }}>
      <p>{description}</p>
    </div>
  );
}
