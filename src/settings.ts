import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

export interface ISettings {
  apiKey: string;
  basePath: string;
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  returnCitations: boolean;
  searchDomainFilter: string;
  returnImages: boolean;
  returnRelatedQuestions: boolean;
  searchRecencyFilter: string;
  topK: number;
  presencePenalty: number;
  frequencyPenalty: number;
  stream: boolean;
  tag: string;
}

const settings: SettingSchemaDesc[] = [
  {
    key: 'apiKey',
    type: 'string',
    title: 'API Key',
    description: 'Enter your Perplexity API key.',
    default: '',
  },
  {
    key: 'basePath',
    type: 'string',
    title: 'Base Path',
    description: 'Enter your API base path (e.g., "https://api.perplexity.ai/chat/completions").',
    default: 'https://api.perplexity.ai/chat/completions',
  },
  {
    key: 'model',
    type: 'string',
    title: 'Model',
    description: 'Choose the Perplexity model (e.g., "llama-3.1-sonar-small-128k-online").',
    default: 'llama-3.1-sonar-small-128k-online',
  },
  {
    key: 'maxTokens',
    type: 'number',
    title: 'Max Tokens',
    description: 'Specify the maximum number of tokens (e.g., 4096).',
    default: 4096,
  },
  {
    key: 'temperature',
    type: 'number',
    title: 'Temperature',
    description: 'Set the randomness of the model output (e.g., 0.5).',
    default: 0.5,
  },
  {
    key: 'topP',
    type: 'number',
    title: 'Top P',
    description: 'Set the nucleus sampling parameter (e.g., 0.9).',
    default: 0.9,
  },
  {
    key: 'returnCitations',
    type: 'boolean',
    title: 'Return Citations',
    description: 'Whether to return citations in the response.',
    default: false,
  },
  {
    key: 'searchDomainFilter',
    type: 'string',
    title: 'Search Domain Filter',
    description: 'Specify search domain filters (e.g., ["perplexity.ai"]).',
    default: '["perplexity.ai"]',
  },
  {
    key: 'returnImages',
    type: 'boolean',
    title: 'Return Images',
    description: 'Whether to return images in the response.',
    default: false,
  },
  {
    key: 'returnRelatedQuestions',
    type: 'boolean',
    title: 'Return Related Questions',
    description: 'Whether to return related questions in the response.',
    default: false,
  },
  {
    key: 'searchRecencyFilter',
    type: 'string',
    title: 'Search Recency Filter',
    description: 'Set the search recency filter (e.g., "year").',
    default: 'year',
  },
  {
    key: 'topK',
    type: 'number',
    title: 'Top K',
    description: 'Set the top-k sampling parameter (e.g., 0).',
    default: 0,
  },
  {
    key: 'presencePenalty',
    type: 'number',
    title: 'Presence Penalty',
    description: 'Set the presence penalty parameter (e.g., 0).',
    default: 0,
  },
  {
    key: 'frequencyPenalty',
    type: 'number',
    title: 'Frequency Penalty',
    description: 'Set the frequency penalty parameter (e.g., 1).',
    default: 1,
  },
  {
    key: 'stream',
    type: 'boolean',
    title: 'Stream',
    description: 'Whether to stream responses.',
    default: false,
  },
  {
    key: 'tag',
    type: 'string',
    title: 'Tag',
    description: 'Add specific tags to AI-generated content.',
    default: '[[🤖]]',
  },
];

export default settings;
