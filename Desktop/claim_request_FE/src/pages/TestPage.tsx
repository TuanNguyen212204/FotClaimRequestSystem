import Editor from '@/components/common/Editor/Editor';
import Rating from '@/components/common/Rating/Rating';
import { Paperclip, Trash2 } from 'lucide-react';
import React from 'react';

interface TestPageProps {
  // add props here if needed
}

const TestPage: React.FC<TestPageProps> = () => {
    const handleRatingChange = (value: number) => {
    console.log("Rating changed to:", value)
  }
  return (
    <div className="test-page">
      <h1>Test Page</h1>
      <div className="test-page-content">
        <Editor
          bottomLeftIcons={[
            <Paperclip />,
            <Trash2 />
          ]}
          fontSize={18}
          placeholder="Hello, type here..."
          width={800}
          onSend={() => {
            console.log("sent")
          }}  
        />
      </div>
      <div className="rating-container">
        <h3>Default Rating</h3>
        <Rating onChange={handleRatingChange} />
      </div>
      <div>
        <br /><hr /><br />
          <h3>Custom (7) Stars with Purple Color</h3>
        <Rating
          showEmojiRating={false}
          showThumbRating={false}
          maxStars={7}
          starColor="#9333EA"
          heartColor="brown"
          onChange={handleRatingChange}
        />
        </div>
    </div>
  );
};

export default TestPage;
