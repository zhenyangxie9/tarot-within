import type { ReadingInput, ReadingOutput, DrawnCard, QuestionCategory } from '@/types';

// ============================================================================
// LLM INTEGRATION GUIDE
// ============================================================================
// Replace the "=== MOCK ===" block below with a real API call:
//
//   import Anthropic from '@anthropic-ai/sdk';   // npm install @anthropic-ai/sdk
//   // .env.local: ANTHROPIC_API_KEY=sk-ant-...
//
//   const anthropic = new Anthropic();
//   const systemPrompt = buildSystemPrompt(input.category);
//   const userPrompt = buildUserPrompt(input);
//
//   const response = await anthropic.messages.create({
//     model: 'claude-opus-4-6',
//     max_tokens: 1500,
//     system: systemPrompt,
//     messages: [{ role: 'user', content: userPrompt }],
//   });
//
//   // Request JSON from the model. Prompt it to return:
//   // { summary, contextualInterpretation, advice, dailyMessage }
//   return JSON.parse(
//     (response.content[0] as { type: 'text'; text: string }).text
//   ) as ReadingOutput;
//
// The function signature and return type never change.
// ============================================================================

// ── Category-specific lenses ────────────────────────────────────────────────

const CATEGORY_OPENING: Record<NonNullable<QuestionCategory>, string> = {
  relationship: '在感情的层面',
  work: '在事业与工作的维度',
  study: '在求学与成长的路途上',
  'self-growth': '在内在探索与自我蜕变的旅途中',
};

const CATEGORY_INSIGHT: Record<NonNullable<QuestionCategory>, (cardName: string, keyword: string) => string> = {
  relationship: (cardName, kw) =>
    `「${cardName}」在感情问题上特别指出：${kw}这股能量正在影响你们之间的连接与动态。真实的感情不是你能用力量控制的——它是两颗心在恰当时机的自然共鸣。`,
  work: (cardName, kw) =>
    `「${cardName}」在职场与事业上的提示是：${kw}这一能量正在塑造你当前所处的职业处境。你的成长轨迹正在加速，需要的是清晰的方向与坚定的执行力。`,
  study: (cardName, kw) =>
    `「${cardName}」在学业上带来的讯息是：${kw}这一质地正在影响你汲取知识与面对挑战的方式。真正的学习不只是记忆，而是将知识转化为内在的洞见。`,
  'self-growth': (cardName, kw) =>
    `「${cardName}」在内在成长的维度上指出：${kw}这一能量正是你此刻最需要整合与发展的部分。蜕变从不舒适开始，但每一次的不安都是灵魂在扩展边界。`,
};

const CATEGORY_ADVICE: Record<NonNullable<QuestionCategory>, string[]> = {
  relationship: [
    '在接下来的时间里，与其追问对方的心意，不如回到自己的内心：你真正渴望的是什么样的连接？',
    '爱需要被说出来，也需要被行动证明。找一个具体的时机，诚实表达你的感受。',
    '给彼此一些呼吸的空间，距离有时候是让感情重新聚焦的最好方式。',
    '不要在关系中消耗自己去「证明」什么——真正匹配的人会让你感到轻盈而非疲惫。',
  ],
  work: [
    '制定一个清晰的三步行动计划，今天就开始执行第一步，而不是等待完美时机。',
    '你现在拥有的资源和能力，已经足够让你迈出下一步。不要低估自己的当下。',
    '与其单打独斗，不如主动寻找一位在这个领域比你走得更远的人，请教他们的经验。',
    '把注意力从「结果会怎样」转移到「今天我能做什么」——专注于过程，结果自然会跟上。',
  ],
  study: [
    '与其死记硬背，不如花时间真正理解核心概念背后的逻辑，建立属于自己的知识框架。',
    '给自己设置清晰的阶段性小目标，每完成一个就给自己一个认可——积累的成就感是最好的动力。',
    '如果某个知识点让你卡住，不要硬撑——换一种学习方式，或者从一个更基础的地方重新出发。',
    '找到一位学习伙伴，互相分享所学、互相提问——教会别人是检验自己理解深度的最好方式。',
  ],
  'self-growth': [
    '今天留出20分钟，关掉所有通知，只是静静地和自己在一起——倾听那个一直在等待被听见的声音。',
    '找出一个你一直在回避的问题，把它写在纸上。把恐惧命名出来，是驯服它的第一步。',
    '开始一个微小的新习惯——不是因为它会改变你，而是因为每一次小小的选择都在重塑你是谁。',
    '告诉自己一句真心话，一句只有你自己才知道真假的话。诚实地面对自己，比任何外部改变都更有力量。',
  ],
};

const DAILY_MESSAGES = [
  '你所寻找的，一直在你之内等待被发现。',
  '每一次迷失，都是找到真实自我的邀请。',
  '宇宙在等你说出那个一直藏在心底的渴望。',
  '此刻的静默，比任何答案都更接近真相。',
  '星辰已经排列好了，剩下的路由你来走。',
  '你不必看见全部，只需要对下一步有信心。',
  '放下那个你以为自己是的人，成为你本来的样子。',
  '当你真正准备好了，答案会自己浮现。',
  '生命正在用你听不懂的语言爱着你。',
  '有时候，不知道，才是最诚实的答案。',
  '那些让你犹豫的，往往是最值得去做的。',
  '你来到这里，不是为了成为别人期待的样子。',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Build system prompt for LLM (used when swapping to real API) ─────────────
export function buildSystemPrompt(category: QuestionCategory | null): string {
  const catContext = category ? `用户问题属于「${
    { relationship: '感情', work: '工作', study: '学业', 'self-growth': '自我成长' }[category]
  }」类别。` : '';

  return `你是一位深邃、神秘而富有智慧的塔罗占卜师。你以诗意、有仪式感的语言解读塔罗牌。
${catContext}
请返回严格的 JSON 格式，字段为：summary（牌面总述，2-3句）、contextualInterpretation（情境解读，3-5句，必须结合用户的具体问题）、advice（建议，2-3句具体可行动的）、dailyMessage（今日讯息，1句诗意的话）。
语言风格：神秘而温柔，有深度，不浮夸，不说教。`;
}

// ── Build user prompt for LLM ────────────────────────────────────────────────
export function buildUserPrompt(input: ReadingInput): string {
  const cardLines = input.drawnCards.map((c, i) => {
    const posLabel = c.position ? { past: '过去', present: '现在', future: '未来' }[c.position] : null;
    return `第${i + 1}张${posLabel ? `（${posLabel}位）` : ''}：${c.cardData.nameCN}（${c.isReversed ? '逆位' : '正位'}）
  关键词：${c.cardData.keywords.join('、')}
  含义：${c.isReversed ? c.cardData.reversedMeaning : c.cardData.uprightMeaning}`;
  }).join('\n\n');

  return `用户的问题：「${input.userQuestion || '（未填写具体问题）'}」

抽到的牌：
${cardLines}

请根据上述信息，结合用户的具体问题，给出深刻而个性化的解读。`;
}

// ── Mock implementations ─────────────────────────────────────────────────────

function buildSummary(drawnCards: DrawnCard[], category: QuestionCategory | null): string {
  const primary = drawnCards[0];
  const orient = primary.isReversed ? '逆位' : '正位';
  const catOpen = category ? `${CATEGORY_OPENING[category]}，` : '';

  if (drawnCards.length === 1) {
    return `${catOpen}宇宙从整副牌中为你选出了「${primary.cardData.nameCN}」（${orient}）。这张牌携带着「${primary.cardData.keywords.slice(0, 2).join('」与「')}」的振动，它在此刻向你显现，并非偶然。`;
  }

  const cardList = drawnCards
    .map((c) => `「${c.cardData.nameCN}」（${c.isReversed ? '逆' : '正'}位）`)
    .join('、');
  return `${catOpen}三张牌依次显现：${cardList}。过去的根源、当下的能量、未来的可能性，共同编织出一幅专属于你此刻处境的星象图。`;
}

function buildInterpretation(input: ReadingInput): string {
  const { userQuestion, drawnCards, category } = input;
  const primary = drawnCards[0];
  const meaning = primary.isReversed ? primary.cardData.reversedMeaning : primary.cardData.uprightMeaning;
  const questionRef = userQuestion ? `关于你所问的「${userQuestion}」，` : '';
  const catInsight = category
    ? CATEGORY_INSIGHT[category](primary.cardData.nameCN, primary.cardData.keywords[0])
    : '';

  if (drawnCards.length === 3) {
    const [past, present, future] = drawnCards;
    const pastM = past.isReversed ? past.cardData.reversedMeaning : past.cardData.uprightMeaning;
    const presentM = present.isReversed ? present.cardData.reversedMeaning : present.cardData.uprightMeaning;
    const futureM = future.isReversed ? future.cardData.reversedMeaning : future.cardData.uprightMeaning;

    return `${questionRef}过去位的「${past.cardData.nameCN}」揭示了你所经历的根源：${pastM.split('。')[0]}，这是整件事情的起点与背景。\n\n当下位的「${present.cardData.nameCN}」描绘了你此刻正在经历的：${presentM.split('。')[0]}。${catInsight}\n\n而未来位的「${future.cardData.nameCN}」则指向一种正在成形的可能性——${futureM.split('。')[0]}。这不是命中注定的终点，而是在你当前轨迹上最有可能展开的方向，你仍然可以用今日的选择来影响它。`;
  }

  return `${questionRef}「${primary.cardData.nameCN}」带来了这样的信息：${meaning}\n\n${catInsight}\n\n请记住：这张牌不是在告诉你会发生什么，而是在映照你内心深处已经感知到但尚未承认的真相。`;
}

function buildAdvice(drawnCards: DrawnCard[], category: QuestionCategory | null): string {
  const primary = drawnCards[0];
  const cardAdvice = primary.cardData.advice;
  const catAdvice = category ? pickRandom(CATEGORY_ADVICE[category]) : '';

  return `${cardAdvice}${catAdvice ? `\n\n${catAdvice}` : ''}`;
}

// ── Main exported function ────────────────────────────────────────────────────

/**
 * generateReading
 * MOCK: template-based with category-aware layering.
 * REAL: replace the mock block with the Anthropic SDK call (see guide above).
 */
export async function generateReading(input: ReadingInput): Promise<ReadingOutput> {
  // === MOCK IMPLEMENTATION — replace this block for real LLM ===
  await new Promise((res) => setTimeout(res, 1800));

  return {
    summary: buildSummary(input.drawnCards, input.category),
    contextualInterpretation: buildInterpretation(input),
    advice: buildAdvice(input.drawnCards, input.category),
    dailyMessage: pickRandom(DAILY_MESSAGES),
  };
  // === END MOCK ===
}
