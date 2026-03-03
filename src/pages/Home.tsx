import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { AnalysisControls } from '@/components/AnalysisControls';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { SavedQueries } from '@/components/SavedQueries';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs';
import './Home.css';

export function Home() {
  const [resultData, setResultData] = useState<unknown>(null);
  const [mobileTab, setMobileTab] = useState('chat');

  const handleQueryRun = (prompt: string) => {
    console.log('Running query:', prompt);
  };

  return (
    <div className="home-page">
      <div className="desktop-layout">
        <aside className="sidebar sidebar-left">
          <SavedQueries onRunQuery={handleQueryRun} />
        </aside>

        <main className="main-content">
          <section className="chat-section">
            <ChatInterface onResult={setResultData} />
          </section>
          <section className="results-section">
            <ResultsDisplay data={resultData} />
          </section>
        </main>

        <aside className="sidebar sidebar-right">
          <AnalysisControls onResult={setResultData} />
        </aside>
      </div>

      <div className="mobile-layout">
        <Tabs value={mobileTab} onChange={setMobileTab}>
          <TabsList>
            <TabsTrigger
              value="saved"
              active={mobileTab === 'saved'}
              onClick={() => setMobileTab('saved')}
            >
              Saved
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              active={mobileTab === 'chat'}
              onClick={() => setMobileTab('chat')}
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="results"
              active={mobileTab === 'results'}
              onClick={() => setMobileTab('results')}
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" activeValue={mobileTab}>
            <SavedQueries onRunQuery={handleQueryRun} />
          </TabsContent>

          <TabsContent value="chat" activeValue={mobileTab}>
            <div className="mobile-chat-wrapper">
              <ChatInterface onResult={setResultData} />
              <AnalysisControls onResult={setResultData} />
            </div>
          </TabsContent>

          <TabsContent value="results" activeValue={mobileTab}>
            <ResultsDisplay data={resultData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
