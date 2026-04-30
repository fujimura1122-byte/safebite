export type Term = {
  slug: string;
  word: string;
  read: string;
  danger: "extreme" | "high" | "caution";
  short: string;
  detail: string;
  example: string;
  punishment: string;
};

export const terms: Term[] = [
  {
    slug: "ud",
    word: "UD",
    read: "ユーディー",
    danger: "extreme",
    short: "裏の違法な仕事全般を指す隠語",
    detail:
      "「Underground」や「裏の仕事」の略称として使われる。SNSやTelegramで「UD案件」と書かれている場合、ほぼ確実に違法な犯罪行為への勧誘。逮捕事例多数。",
    example: "「UD案件あります。高収入日払い。」",
    punishment: "関与した犯罪により懲役数年〜10年以上",
  },
  {
    slug: "howaan",
    word: "ホワ案・ホワイト案件",
    read: "ほわあん",
    danger: "extreme",
    short: "「安全・合法」に見せかけた偽装求人の隠語",
    detail:
      "「ホワイト案件」の略。表向きは「合法・安全」と謳っているが、実際は違法な仕事へ誘導するための偽装。「ホワ案」と書かれた求人への応募は極めて危険。",
    example: "「ホワ案のみ紹介します。安心してください。」",
    punishment: "詐欺・窃盗の共犯として懲役3〜10年",
  },
  {
    slug: "ukeko",
    word: "受け子",
    read: "うけこ",
    danger: "extreme",
    short: "詐欺グループで被害者から現金・荷物を受け取る役割",
    detail:
      "特殊詐欺（オレオレ詐欺・還付金詐欺等）で、被害者の自宅などに出向いて現金や荷物を直接受け取る実行役。「簡単な荷物受け取りバイト」として募集されることが多い。末端でも逮捕率が高く、懲役刑が確実。",
    example: "「荷物を受け取って渡すだけ。1回3万円。」",
    punishment: "詐欺罪・窃盗罪で懲役3〜10年（執行猶予なしのケースも）",
  },
  {
    slug: "dashiko",
    word: "出し子",
    read: "だしこ",
    danger: "extreme",
    short: "ATMから不正に現金を引き出す役割",
    detail:
      "詐欺グループが入手した他人の銀行口座・カードを使い、ATMから現金を引き出す実行役。複数のATMを短時間で回るケースが多く、防犯カメラに映り逮捕される。",
    example: "「カードを渡すので引き出してきてください。1件2万円。」",
    punishment: "窃盗罪・不正競争防止法違反で懲役3〜10年",
  },
  {
    slug: "tataki",
    word: "叩き",
    read: "たたき",
    danger: "extreme",
    short: "強盗・恐喝の実行役",
    detail:
      "強盗・恐喝・押し込み強盗などの実行役。「仕事」「ガチ案件」などとして募集される。2024〜2025年に多発した首都圏連続強盗事件でも闇バイト（叩き役）が相次ぎ逮捕。",
    example: "「ガチ案件。叩きやれる人。即日高収入。」",
    punishment: "強盗罪で懲役5年以上〜無期懲役",
  },
  {
    slug: "kakeko",
    word: "架け子",
    read: "かけこ",
    danger: "high",
    short: "特殊詐欺で被害者に電話をかける役割",
    detail:
      "オレオレ詐欺などで「息子役」「警察・銀行員役」などになりすまし、被害者に電話をかける役割。「在宅でできる電話バイト」として勧誘されることがある。",
    example: "「台本あり。電話かけるだけ。1件5000円。」",
    punishment: "詐欺罪・電子計算機使用詐欺罪で懲役3〜10年",
  },
  {
    slug: "kakiko",
    word: "書き子",
    read: "かきこ",
    danger: "high",
    short: "詐欺に使う書類・はがきを書く役割",
    detail:
      "詐欺グループが用意した架空の請求書・当選通知・脅迫状などを手書きで書く役割。「内職・在宅ワーク」として募集される。",
    example: "「はがきを書くだけ。在宅OK。1枚500円。」",
    punishment: "詐欺罪・私文書偽造罪で懲役3〜7年",
  },
  {
    slug: "tobashi",
    word: "飛ばし",
    read: "とばし",
    danger: "high",
    short: "他人名義のSIM・電話番号を使う行為",
    detail:
      "本人確認を回避するために他人名義のSIMカードや携帯電話を用いること。犯罪グループが指示役との連絡に使う。SIMを売る行為・貸す行為も「飛ばし」として犯罪になる。",
    example: "「SIM売ってくれる人募集。1枚3万円。」",
    punishment: "電気通信事業法違反・詐欺幇助で懲役〜3年・罰金",
  },
  {
    slug: "meigikashi",
    word: "名義貸し",
    read: "めいぎかし",
    danger: "high",
    short: "自分の名義（口座・スマホ等）を貸す行為",
    detail:
      "銀行口座・スマートフォン・クレジットカードなど、自分名義のものを犯罪グループに貸すこと。「口座売ります」「スマホ貸すだけ」も同様。後から詐欺に使われ共犯扱いになる。",
    example: "「口座売ってください。1口座5万円。」",
    punishment: "犯罪収益移転防止法違反・詐欺幇助で懲役〜3年",
  },
  {
    slug: "korogashi",
    word: "転がし",
    read: "ころがし",
    danger: "high",
    short: "詐欺で得た金を口座間で移動させるマネーロンダリング",
    detail:
      "詐欺・強盗で得た犯罪収益を複数の口座に転送し、出所を分からなくする資金洗浄の手口。「送金するだけ」「振り込みバイト」として勧誘される。",
    example: "「口座に入金されたら別の口座に送金するだけ。1回1万円。」",
    punishment: "組織的犯罪処罰法（マネーロンダリング罪）で懲役〜10年",
  },
  {
    slug: "telegram",
    word: "テレグラム（Telegram）",
    read: "てれぐらむ",
    danger: "caution",
    short: "闇バイト勧誘に多用される匿名メッセージアプリ",
    detail:
      "高い匿名性と「メッセージの自動削除」機能を持つメッセージアプリ。犯罪グループが証拠隠滅のために好んで使う。TelegramのみでやりとりするバイトはUDの可能性が極めて高い。",
    example: "「詳しくはTelegramで。@xxxx」",
    punishment: "（ツール自体は違法ではないが、闇バイト勧誘の強力なシグナル）",
  },
];

export const dangerConfig = {
  extreme: { label: "即逮捕レベル", cls: "bg-red-100 text-red-700 border-red-200" },
  high:    { label: "逮捕リスク高",  cls: "bg-amber-100 text-amber-700 border-amber-200" },
  caution: { label: "要注意",        cls: "bg-yellow-100 text-yellow-700 border-yellow-200" },
} as const;
