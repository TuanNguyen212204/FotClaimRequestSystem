import Card from "./Card";
import groupCardImg from "@components/ui/card/groupCardImage.jpg";

function GroupCard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
      }}
    >
      <Card title="Card title" cover={groupCardImg}>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </Card>
      <Card title="Card title" cover={groupCardImg}>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </Card>
      <Card title="Card title" cover={groupCardImg}>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </Card>
      <h3>Group Card</h3>
    </div>
  );
}

export default GroupCard;
