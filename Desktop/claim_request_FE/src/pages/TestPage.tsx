import Editor from '@/components/common/Editor/Editor';
import React from 'react';

interface TestPageProps {
  // Add any props here if needed
}

const TestPage: React.FC<TestPageProps> = () => {
  return (
    <div className="test-page">
      <h1>Test Page</h1>
      <div className="test-page-content">
        <Editor />
      </div>
    </div>
  );
};

export default TestPage;
