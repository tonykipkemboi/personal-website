export type FaqItem = {
  question: string
  answer: string
}

export const skillsPluginsFaqs: FaqItem[] = [
  {
    question: 'What is the difference between an AI skill and a plugin?',
    answer:
      'A skill is a set of instructions that tells an AI tool how to do one specific task. A plugin bundles multiple skills — and often agents, hooks, MCP servers, and commands — into one installable package. In short: a skill is the recipe, a plugin is the cookbook. You write the skill once, then everyone can use it.',
  },
  {
    question: 'What is an AI skill, and what is SKILL.md?',
    answer:
      'A skill is a folder with one file, SKILL.md: plain markdown, with no programming required. The top is metadata — a name and a description — and the rest is step-by-step instructions. The tool uses the description to decide when to load it. Write it once, and Claude Code, Codex, Gemini CLI, Copilot, Cursor, and Windsurf can all use it.',
  },
  {
    question: 'When should I use a skill vs a plugin?',
    answer:
      'Use a skill for one repeatable workflow, such as reviewing a pull request or deploying to staging, when the instructions fit in one file. Use a plugin when related skills should travel together, or you need external tools such as a CRM. If the task is a one-off, skip both and just ask the model directly.',
  },
  {
    question: 'Why do Claude, ChatGPT, and Gemini use the same skill format?',
    answer:
      'Major AI tools adopted the same SKILL.md format because skills are just markdown: no binary format, no compilation, and no special runtime. Anthropic released the Agent Skills specification as an open standard in December 2025. OpenAI and Google adopted it shortly after, and all three co-founded the Agentic AI Foundation under the Linux Foundation. Over 30 tools now support it.',
  },
]
