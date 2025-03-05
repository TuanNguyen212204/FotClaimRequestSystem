import Card from "./Card";
import groupCardImg from "@components/ui/card/groupCardImage.jpg";

function OverlayCard() {
  return (
    <Card
      variant="overlay"
      cover={groupCardImg}
      title="Some quick example text to build on the card title and make up the bulk of the card's content."
      extra={<a href="#">Link</a>}
    >
      <p>overlay</p>
    </Card>
  );
}

export default OverlayCard;
