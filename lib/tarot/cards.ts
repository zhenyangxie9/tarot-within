import type { TarotCardData } from '@/types';

export const MAJOR_ARCANA: TarotCardData[] = [
  {
    id: 0,
    name: 'The Fool',
    nameCN: '愚者',
    arcanaType: 'major',
    romanNumeral: '0',
    symbol: '⛰',
    keywords: ['新开始', '自由', '冒险', '纯真', '可能性'],
    uprightMeaning:
      '你站在旅程的起点，充满无限可能。愚者代表着对未知的勇敢跳跃，以及不被过去束缚的轻盈心态。此刻的你拥有最纯粹的潜能。',
    reversedMeaning:
      '冒失与轻率正在消耗你的能量。在行动前需要稍加审视，避免因冲动付出不必要的代价。也许是时候重新评估你的方向了。',
    advice: '放下对结果的执念，让自己轻盈地踏出第一步。',
    themeTag: 'beginnings',
    accentColor: 'amber',
  },
  {
    id: 1,
    name: 'The Magician',
    nameCN: '魔术师',
    arcanaType: 'major',
    romanNumeral: 'I',
    symbol: '✦',
    keywords: ['意志', '技艺', '创造', '专注', '实现'],
    uprightMeaning:
      '你拥有实现目标所需的一切工具与才能。魔术师提醒你：意志力是最强大的魔法，专注即是力量。你的能力超乎你的想象。',
    reversedMeaning:
      '才能被搁置，或技艺被用于欺骗自己。检视内在动机是否纯正，避免自我欺骗与操控他人。真正的力量来自真诚。',
    advice: '汇聚你的意志，将想法落实为具体行动。',
    themeTag: 'power',
    accentColor: 'yellow',
  },
  {
    id: 2,
    name: 'The High Priestess',
    nameCN: '女祭司',
    arcanaType: 'major',
    romanNumeral: 'II',
    symbol: '☾',
    keywords: ['直觉', '内在智慧', '神秘', '潜意识', '耐心'],
    uprightMeaning:
      '答案已在你内心深处等待。女祭司象征内在的智慧与直觉的力量——此刻不需要向外寻求，而是向内聆听。静默本身就是答案。',
    reversedMeaning:
      '你正在压抑内心的声音，或被表象所迷惑。重新连接你的直觉，不要让外部噪音覆盖内在的清明。',
    advice: '在行动之前，先给自己一段安静聆听内心的时间。',
    themeTag: 'intuition',
    accentColor: 'blue',
  },
  {
    id: 3,
    name: 'The Empress',
    nameCN: '女皇',
    arcanaType: 'major',
    romanNumeral: 'III',
    symbol: '❀',
    keywords: ['丰盛', '创造力', '滋养', '感官', '成长'],
    uprightMeaning:
      '生命正处于丰盛与繁荣的状态。女皇代表创造力的爆发、关系的滋养以及感官上的满足。允许自己去感受美好，去创造，去给予。',
    reversedMeaning:
      '创造力受阻，或你正在过度付出而忽视了自我滋养。先照顾好自己，才能真正地给予他人。',
    advice: '用爱与耐心滋养你正在孕育的事物，无论是关系、项目还是自我。',
    themeTag: 'abundance',
    accentColor: 'green',
  },
  {
    id: 4,
    name: 'The Emperor',
    nameCN: '皇帝',
    arcanaType: 'major',
    romanNumeral: 'IV',
    symbol: '♜',
    keywords: ['权威', '结构', '稳定', '领导力', '纪律'],
    uprightMeaning:
      '稳固的基础与清晰的结构是此刻的礼物。皇帝代表有序的力量、坚定的决策以及对现实世界的掌控。建立规则，并付诸执行。',
    reversedMeaning:
      '过度控制或权威滥用正在造成压迫。检视你是否在某段关系或情境中过于强势，或相反地，你是否在逃避应有的责任。',
    advice: '建立清晰的边界与结构，用稳定的行动为自己和他人创造安全感。',
    themeTag: 'authority',
    accentColor: 'red',
  },
  {
    id: 5,
    name: 'The Hierophant',
    nameCN: '教皇',
    arcanaType: 'major',
    romanNumeral: 'V',
    symbol: '✠',
    keywords: ['传统', '信仰', '指引', '体制', '智慧传承'],
    uprightMeaning:
      '寻求导师或传统智慧的指引。教皇象征经过时间考验的知识与信仰体系，提醒你在既有框架中找到你的位置与意义。',
    reversedMeaning:
      '你正在质疑旧有的规则与信仰，这是一种必要的成长。打破固化的思维模式，寻找属于自己的精神路径。',
    advice: '向有经验的人寻求智慧，同时保持对自身价值观的忠诚。',
    themeTag: 'authority',
    accentColor: 'indigo',
  },
  {
    id: 6,
    name: 'The Lovers',
    nameCN: '恋人',
    arcanaType: 'major',
    romanNumeral: 'VI',
    symbol: '♥',
    keywords: ['选择', '爱', '价值观', '结合', '诚实'],
    uprightMeaning:
      '一个重要的选择摆在你面前，它关乎你最深的价值观与渴望。恋人牌不仅代表爱情，更代表当一个人像海一样靠近你心的时候，你终于明白，真正的结合不是拥有，而是彼此照见之后，仍愿意温柔靠岸。',
    reversedMeaning:
      '逃避选择，或所做的决定与你的内心背道而驰。你也许试着说服自己一切都可以平静无波，但心底知道，有些潮汐一旦来过，就不会真的退去。',
    advice:
      '听从内心，而不是恐惧。选择爱，不是因为它安全，而是因为当它靠近时，你的心会先认出它。',
    themeTag: 'choice',
    accentColor: 'rose',
  },
  {
    id: 7,
    name: 'The Chariot',
    nameCN: '战车',
    arcanaType: 'major',
    romanNumeral: 'VII',
    symbol: '🛞',
    keywords: ['意志力', '胜利', '控制', '前进', '决断'],
    uprightMeaning:
      '通过意志力与自律，你正在驾驭生命中的对立力量向前推进。战车代表不畏阻碍的前行——内外的矛盾都将服从于你坚定的意志。',
    reversedMeaning:
      '方向失控，或你正在用蛮力代替智慧。停下来检视：你是在向前奔跑，还是在逃离某些事物？',
    advice: '整合你内在的矛盾，以清晰的意志朝着目标稳步前行。',
    themeTag: 'triumph',
    accentColor: 'sky',
  },
  {
    id: 8,
    name: 'Strength',
    nameCN: '力量',
    arcanaType: 'major',
    romanNumeral: 'VIII',
    symbol: '♌',
    keywords: ['内在力量', '温柔', '耐心', '勇气', '慈悲'],
    uprightMeaning:
      '真正的力量不来自暴力，而来自温柔的掌控。这张牌代表以爱与耐心驯服内在的野性，用慈悲面对恐惧，用平静战胜混乱。',
    reversedMeaning:
      '力量被压抑，或你正在用错误的方式处理恐惧。不要将脆弱视为软弱——承认情绪，才能真正地驾驭它。',
    advice: '以温柔而非强迫的方式面对你内心的挣扎与恐惧。',
    themeTag: 'patience',
    accentColor: 'orange',
  },
  {
    id: 9,
    name: 'The Hermit',
    nameCN: '隐者',
    arcanaType: 'major',
    romanNumeral: 'IX',
    symbol: '🕯',
    keywords: ['独处', '内省', '寻求真相', '智慧', '引导'],
    uprightMeaning:
      '此刻需要独处与内省。隐者提着灯笼走在黑暗中，象征内在智慧的引导——答案不在热闹之中，而在静默的自我探索里。',
    reversedMeaning:
      '过度孤立，或你在回避本该面对的内在工作。孤独是礼物，但不能成为逃避的借口。',
    advice: '暂时远离喧嚣，给自己足够的空间与时间进行深度的自我对话。',
    themeTag: 'introspection',
    accentColor: 'slate',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    nameCN: '命运之轮',
    arcanaType: 'major',
    romanNumeral: 'X',
    symbol: '☸',
    keywords: ['命运', '转变', '循环', '机遇', '顺流'],
    uprightMeaning:
      '生命的巨轮在转动，一个新的周期正在开启。命运之轮代表命运的恩赐与变化的必然——顺应这个转折点，而不是抗拒它。',
    reversedMeaning:
      '你正在抗拒不可避免的改变，或陷入厄运循环之中。检视你是否在重复旧有的模式，是时候主动打破这个循环了。',
    advice: '接受生命的流动与变化，在每一次转折中寻找新的契机。',
    themeTag: 'fate',
    accentColor: 'purple',
  },
  {
    id: 11,
    name: 'Justice',
    nameCN: '正义',
    arcanaType: 'major',
    romanNumeral: 'XI',
    symbol: '⚖',
    keywords: ['公正', '真相', '因果', '平衡', '责任'],
    uprightMeaning:
      '真相与公正将会显现。正义牌提醒你：一切行动都有其后果，诚实面对自己与他人是此刻最重要的事。',
    reversedMeaning:
      '不公正的情况正在发生，或你正在逃避某个需要面对的真相。逃避只会让失衡持续更久。',
    advice: '以客观公正的眼光审视当前处境，承担属于你的责任。',
    themeTag: 'balance',
    accentColor: 'emerald',
  },
  {
    id: 12,
    name: 'The Hanged Man',
    nameCN: '倒吊人',
    arcanaType: 'major',
    romanNumeral: 'XII',
    symbol: '⥁',
    keywords: ['暂停', '放手', '新视角', '牺牲', '等待'],
    uprightMeaning:
      '有时候，最有力量的行动是停下来。倒吊人象征主动选择的暂停——换一个角度看待一切，你会发现截然不同的真相。',
    reversedMeaning:
      '你陷在一个无法前进的局面中，却拒绝从这个困境中学习。是时候放下执念，允许自己改变视角了。',
    advice: '暂停你的行动，用全新的视角重新审视当前的处境。',
    themeTag: 'introspection',
    accentColor: 'cyan',
  },
  {
    id: 13,
    name: 'Death',
    nameCN: '死神',
    arcanaType: 'major',
    romanNumeral: 'XIII',
    symbol: '☠',
    keywords: ['结束', '转变', '蜕变', '放手', '新生'],
    uprightMeaning:
      '死神牌代表的是结束，更是蜕变。某个旧有的阶段、关系或身份正在走向终结——这不是失去，而是为新生腾出空间。',
    reversedMeaning:
      '你正在抗拒必要的结束，紧抓着已经死去的事物不放。放手不是放弃，而是尊重生命的自然流动。',
    advice: '允许旧的事物离去，相信终结之后必有新的开始。',
    themeTag: 'transformation',
    accentColor: 'zinc',
  },
  {
    id: 14,
    name: 'Temperance',
    nameCN: '节制',
    arcanaType: 'major',
    romanNumeral: 'XIV',
    symbol: '⚗',
    keywords: ['平衡', '调和', '耐心', '中庸', '整合'],
    uprightMeaning:
      '流动、调和与耐心是此刻的主旋律。节制象征对极端的超越——在两种力量之间找到流动的平衡，而不是偏向任何一方。',
    reversedMeaning:
      '失衡与过度正在影响你的判断。你可能在某件事上走向了极端，是时候寻找中间的平衡点。',
    advice: '不急不缓，以耐心与平静整合你生命中的各种力量。',
    themeTag: 'moderation',
    accentColor: 'teal',
  },
  {
    id: 15,
    name: 'The Devil',
    nameCN: '恶魔',
    arcanaType: 'major',
    romanNumeral: 'XV',
    symbol: '⛓',
    keywords: ['束缚', '执念', '阴影', '物质主义', '诱惑'],
    uprightMeaning:
      '你正被某种执念、恐惧或依赖所束缚。恶魔牌揭示的是内在的阴影——那些我们不愿承认的欲望与恐惧。意识到锁链的存在，才是解脱的开始。',
    reversedMeaning:
      '你正在从执念与束缚中解脱。意识到旧有模式的桎梏，勇敢地迈出摆脱阴影的第一步。',
    advice: '诚实地面对你内心的阴影与执念，意识即是解放。',
    themeTag: 'materialism',
    accentColor: 'violet',
  },
  {
    id: 16,
    name: 'The Tower',
    nameCN: '高塔',
    arcanaType: 'major',
    romanNumeral: 'XVI',
    symbol: '⚡',
    keywords: ['突变', '崩塌', '启示', '解放', '重建'],
    uprightMeaning:
      '某个建立在虚假基础上的结构正在崩塌。高塔代表突如其来的改变与启示——虽然过程痛苦，但这场崩塌是清除虚假、重建真实的必要过程。',
    reversedMeaning:
      '你正在经历内心的崩塌，或在抵抗不可避免的改变。承认内部的失序，比坚持虚假的稳定更有力量。',
    advice: '让该崩塌的崩塌，在废墟上重建更真实、更坚固的基础。',
    themeTag: 'upheaval',
    accentColor: 'red',
  },
  {
      "id": 17,
      "name": "The Star",
      "nameCN": "星星",
      "arcanaType": "major",
      "romanNumeral": "XVII",
      "symbol": "✷",
      "keywords": [
          "希望",
          "疗愈",
          "平静",
          "信念",
          "归航"
      ],
      "uprightMeaning":"夜潮退去，星光不再只是悬在天上，而是悄悄映进更深的水里。那是比希望更安静的疗愈——像有一片海，始终在你心里，为你的光留出归处。",
      "reversedMeaning": "迷雾曾让海面失去倒影，你误以为光已熄灭。但请触摸潮汐的震动，海从未遗忘心的坐标。绝望只是浪花，信念是海底的沉船，静默而永恒。",
      "advice": "不必追逐天边的火，只需俯身倾听。让生命如海水般接纳，让心的潮汐，洗净你疲惫的灵魂。",
      "themeTag": "hope",
      "accentColor": "sky"
  },
  {
    id: 18,
    name: 'The Moon',
    nameCN: '月亮',
    arcanaType: 'major',
    romanNumeral: 'XVIII',
    symbol: '☾',
    keywords: ['幻觉', '恐惧', '潜意识', '迷雾', '直觉'],
    uprightMeaning:
      '事情并非表面看起来那么清晰。月亮牌代表幻觉、恐惧与潜意识的涌现——此刻需要穿透迷雾，辨别真实与投影。',
    reversedMeaning:
      '迷雾正在散去，被压抑的真相开始浮现。你的直觉正在引导你走出混沌——信任内心的感知，而非表象。',
    advice: '不被恐惧与幻觉所迷惑，保持对直觉的信任，慢慢在迷雾中前行。',
    themeTag: 'illusion',
    accentColor: 'indigo',
  },
  {
    id: 19,
    name: 'The Sun',
    nameCN: '太阳',
    arcanaType: 'major',
    romanNumeral: 'XIX',
    symbol: '☼',
    keywords: ['喜悦', '成功', '活力', '清明', '光明'],
    uprightMeaning:
      '光明、喜悦与成功笼罩着你此刻的处境。太阳牌是最充满正能量的牌之一——一切都清晰可见，你的努力正在开花结果。',
    reversedMeaning:
      '喜悦被遮蔽，你难以感受到生命中的光。也许是过度乐观掩盖了需要面对的问题，或你暂时失去了自我价值感。',
    advice: '让真实的喜悦流动，不要因为过去的阴影而拒绝接受此刻的美好。',
    themeTag: 'clarity',
    accentColor: 'yellow',
  },
  {
    id: 20,
    name: 'Judgement',
    nameCN: '审判',
    arcanaType: 'major',
    romanNumeral: 'XX',
    symbol: '📯',
    keywords: ['觉醒', '召唤', '重生', '自我评估', '转化'],
    uprightMeaning:
      '一个深刻的觉醒与召唤正在到来。审判牌代表从过去中获得解脱、回应内心更高召唤的时刻——你正在蜕变成一个更真实的自己。',
    reversedMeaning:
      '你在逃避内心的召唤，或被过去的错误所束缚。原谅自己，才能从历史中解脱，真正迎接新的开始。',
    advice: '诚实地审视你的过去，接受召唤，勇敢地踏上转化之旅。',
    themeTag: 'awakening',
    accentColor: 'amber',
  },
  {
    id: 21,
    name: 'The World',
    nameCN: '世界',
    arcanaType: 'major',
    romanNumeral: 'XXI',
    symbol: '◉',
    keywords: ['完成', '整合', '成就', '圆满', '新循环'],
    uprightMeaning:
      '一个重要的旅程已经圆满完成。世界牌代表整合、成就与完整——你携带着这段旅程所有的学习，站在一个新循环的入口处。',
    reversedMeaning:
      '你距离完成还差最后一步，却迟迟没有迈出。检视是什么阻碍了你走到终点——也许是恐惧圆满之后的失落？',
    advice: '庆祝你走过的一切，以完整与感恩之心迎接下一个旅程的开始。',
    themeTag: 'integration',
    accentColor: 'purple',
  },
];

import { MINOR_ARCANA } from './minorArcana';
export { MINOR_ARCANA };

export const ALL_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA];
