let untyped = '';
let typed = '';
let score = 0;
let typeCount = 0;

const untypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const numberType = document.getElementById('number-types');

const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  typed = '';
  typedField.textContent = typed;

  let random = Math.floor(Math.random() * textLists.length);
  //空の変数にtextLists配列の0番目の値を代入
  untyped = textLists[random];
  //ID=untypedにtextLists配列の0番目の値を代入
  untypedField.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
  //誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return
  }

  // 正タイプの場合
  // スコアにカウント
  score++;
  // 正タイプの場合のみのカウント
  typeCount++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedField.textContent = typed;
  untypedField.textContent = untyped;
  // keypressイベントのタイミングで正タイプのカウントをしていく
  numberType.textContent = typeCount;
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲーム終了
const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result === true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000)
};


// ゲームスタート時の処理
start.addEventListener('click', () => {
  // カウントダウン開始
  timer();

  // ランダムテキスト表示（関数の呼び出し）
  createText();

  // カウントの要素を表示
  numberType.style.display = 'block';

  //スタートボタン押下後を非表示
  start.style.display = 'none';

  // キーボード押下後のイベントをスタートのイベントリスナーで発火する
  document.addEventListener('keypress', keyPress);
});

//デフォルトテキスト表示
untypedField.textContent = 'スタートボタンで開始';