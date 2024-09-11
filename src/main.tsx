import '@logseq/libs';
import axios from 'axios';
import * as presetPrompts from './prompts';
import { IPrompt, PromptOutputType } from './prompts/type';
import settings, { ISettings } from './settings';
import { getBlockContent } from './utils';

function getPrompts() {
  // We are only using presetPrompts now, so no need for customPrompts
  return [...Object.values(presetPrompts)];
}

async function callPerplexityAPI(prompt: string): Promise<string> {
  const {
    apiKey,
    basePath,
    model,
    maxTokens,
    temperature,
    topP,
    returnCitations,
    searchDomainFilter,
    returnImages,
    returnRelatedQuestions,
    searchRecencyFilter,
    topK,
    presencePenalty,
    frequencyPenalty,
    stream,
  } = logseq.settings as unknown as ISettings;

  const response = await axios.post(
    basePath,
    {
      model,
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature,
      top_p: topP,
      return_citations: returnCitations,
      search_domain_filter: JSON.parse(searchDomainFilter),
      return_images: returnImages,
      return_related_questions: returnRelatedQuestions,
      search_recency_filter: searchRecencyFilter,
      top_k: topK,
      presence_penalty: presencePenalty,
      frequency_penalty: frequencyPenalty,
      stream,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.choices[0].message.content; // Adjust based on actual API response structure
}

function main() {
  const {
    tag: tagName,
  } = logseq.settings as unknown as ISettings;
  const tag = tagName ? ` #${tagName}` : '';

  const prompts = getPrompts();

  prompts.map(({ name, prompt: t, output }: IPrompt) => {
    logseq.Editor.registerSlashCommand(
      name,
      async ({ uuid }: { uuid: string }) => {
        const block = await logseq.Editor.getBlock(uuid, {
          includeChildren: true,
        });
        if (!block) {
          return;
        }

        const content = await getBlockContent(block);
        const input = t.replace('{{text}}', content);
        
        const responseText = await callPerplexityAPI(input);

        switch (output) {
          case PromptOutputType.property: {
            let newContent = `${block?.content}${tag}\n${name.toLowerCase()}:: ${responseText}`;
            await logseq.Editor.updateBlock(uuid, newContent);
            break;
          }
          case PromptOutputType.insert: {
            await logseq.Editor.insertBlock(uuid, `${responseText}${tag}`);
            break;
          }
          case PromptOutputType.replace: {
            await logseq.Editor.updateBlock(uuid, `${responseText}${tag}`);
            break;
          }
        }
      },
    );
    logseq.onSettingsChanged(() => main());
  });
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error);
