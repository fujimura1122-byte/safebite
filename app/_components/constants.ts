export const SHARE_URL  = "https://saferbite.org";
export const SHARE_TEXT = "【無料】そのバイト、大丈夫？AIが求人文をコピペするだけで闇バイトを即判定。通報支援・SOS相談テンプレも。";

// A8.net
export const A8_LAWYER_URL = "https://px.a8.net/svt/ejp?a8mat=4B3U72+7K3CQ2+4FR4+BXQOI";
export const A8_NORTON_URL  = "https://px.a8.net/svt/ejp?a8mat=4B3U72+7OUTKA+3IBI+61C2Q";

// ValueCommerce
export const VC_ARUBAITO_EX_URL   = "https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3769365&pid=892612232";
export const VC_ARUBAITO_EX_PIXEL = "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3769365&pid=892612232";

export const YAMI_KEYWORDS = [
  "UD", "ホワイト案件", "受け子", "出し子", "叩き", "飛ばし", "名義貸し",
  "転がし", "ホワ案", "テレグラム", "Telegram", "即日払い", "身バレなし",
  "顔出し不要", "高収入保証", "前払い", "誰でもOK", "裏バイト", "闇バイト",
  "架け子", "書き子", "受け取り",
];

export const REPORT_TARGETS = [
  {
    name: "インターネット・ホットラインセンター（IHC）",
    desc: "警察庁委託の公式窓口。闇バイト募集投稿を直接通報できます",
    url: "https://www.internethotline.jp/",
    tag: "最推奨",
    accent: "text-red-400 border-red-500/30 bg-red-500/10",
  },
  {
    name: "都道府県警察 サイバー犯罪相談窓口",
    desc: "各都道府県警察のサイバー相談窓口一覧。巻き込まれた場合はこちら",
    url: "https://www.npa.go.jp/bureau/cyber/soudan.html",
    tag: "相談窓口",
    accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    name: "X（Twitter）公式通報フォーム",
    desc: "X上の違法コンテンツを通報。「詐欺・不正」カテゴリを選択",
    url: "https://help.x.com/ja/rules-and-policies/x-report-violation",
    tag: "X専用",
    accent: "text-slate-300 border-slate-500/30 bg-slate-500/10",
  },
  {
    name: "総務省 違法・有害情報相談センター",
    desc: "SNS投稿の削除申請・相談窓口",
    url: "https://ihaho.jp/",
    tag: "削除申請",
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
] as const;
