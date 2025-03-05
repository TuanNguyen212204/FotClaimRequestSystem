import Card from "./Card";

function BasicCard() {
  return (
    <Card
      title="Basic Card"
      extra={<a href="https://www.google.com/">More</a>}
      size="default"
    >
      <p>basic card with default size.</p>
    </Card>
  );
}
export default BasicCard;
