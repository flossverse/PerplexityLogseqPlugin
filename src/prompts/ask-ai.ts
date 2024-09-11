import { IPrompt, PromptOutputType } from './type';

export const AskAI: IPrompt = {
  name: 'Ask AI',
  prompt: `
    Bring  """
    {content}
    """ up to date in UK english as a short well formatted summary, expanding web links and integrating them into the summary
  `,
  output: PromptOutputType.insert,
};
