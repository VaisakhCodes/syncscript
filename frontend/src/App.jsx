import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!codeSnippet.trim()) {
      setError('Please paste some code before analyzing.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code_snippet: codeSnippet }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status >= 500) {
          throw new Error('The AI model is experiencing high demand. Please wait a moment and click Analyze Code again!');
        }
        throw new Error(data.error || 'Something went wrong while analyzing the code.');
      }

      setResponse(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            SyncScript
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            AI-powered code analysis. Paste your snippet below to instantly get a summary, dependencies, and testing steps.
          </p>
        </div>

        {/* Code Input Section */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Raw Code Snippet
            </label>
            <textarea
              id="code"
              rows={10}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md font-mono p-4 bg-gray-50 text-gray-800"
              placeholder="def hello_world():&#10;    print('Hello, world!')"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
            />
            
            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    <div className="mt-3">
                      <button
                        onClick={handleAnalyze}
                        type="button"
                        className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 ring-1 ring-inset ring-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Code'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {response && (
          <div className="bg-white shadow sm:rounded-lg overflow-hidden border-t-4 border-blue-500">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Analysis Results</h3>
            </div>
            <div className="px-4 py-5 sm:p-6 prose prose-blue max-w-none text-gray-800">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
