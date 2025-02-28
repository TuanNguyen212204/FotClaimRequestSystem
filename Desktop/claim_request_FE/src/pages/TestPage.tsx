import Editor from '@/components/common/Editor/Editor';
import { Paperclip, Trash2 } from 'lucide-react';
import React from 'react';

interface TestPageProps {
  // add props here if needed
}

const TestPage: React.FC<TestPageProps> = () => {
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
    </div>
  );
};

export default TestPage;
