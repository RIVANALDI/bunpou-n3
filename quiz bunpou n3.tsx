import { useState } from "react";

// ── Furigana ──────────────────────────────────────────────────────────
const FGD = {
  "日本語能力試験":"にほんごのうりょくしけん","少子高齢化":"しょうしこうれいか",
  "比較文化論":"ひかくぶんかろん","留学生活":"りゅうがくせいかつ",
  "利用者数":"りようしゃすう","学校帰り":"がっこうがえり",
  "旅行番組":"りょこうばんぐみ","社会問題":"しゃかいもんだい",
  "結婚生活":"けっこんせいかつ","話し合い":"はなしあい",
  "新宿駅":"しんじゅくえき","新製品":"しんせいひん",
  "高齢者":"こうれいしゃ","逆効果":"ぎゃくこうか",
  "旅行先":"りょこうさき","留学先":"りゅうがくさき",
  "不景気":"ふけいき","子育て":"こそだて",
  "使い方":"つかいかた","読み方":"よみかた",
  "別れ会":"わかれかい","間違い":"まちがい",
  "留学生":"りゅうがくせい","中国人":"ちゅうごくじん",
  "長い間":"ながいあいだ","子ども":"こども",
  "図書館":"としょかん","日本語":"にほんご",
  // option & grammar kanji
  "際に":"さいに","一方で":"いっぽうで","以上は":"いじょうは",
  "得ない":"えない","分だけ":"ぶんだけ",
  "動詞":"どうし","名詞":"めいし","語幹":"ごかん",
  "一方":"いっぽう","以上":"いじょう",
  // 2-char vocab
  "朝食":"ちょうしょく","万人":"まんにん","一口":"ひとくち",
  "約束":"やくそく","感謝":"かんしゃ","知識":"ちしき",
  "材料":"ざいりょう","割合":"わりあい","書類":"しょるい",
  "原稿":"げんこう","練習":"れんしゅう","距離":"きょり",
  "品質":"ひんしつ","商品":"しょうひん","世話":"せわ",
  "世界":"せかい","平和":"へいわ","運動":"うんどう",
  "運転":"うんてん","健康":"けんこう","体重":"たいじゅう",
  "音楽":"おんがく","種類":"しゅるい","季節":"きせつ",
  "時代":"じだい","変化":"へんか","成長":"せいちょう",
  "料理":"りょうり","野菜":"やさい","土産":"みやげ",
  "外食":"がいしょく","大切":"たいせつ","簡単":"かんたん",
  "残念":"ざんねん","優秀":"ゆうしゅう","散々":"さんざん",
  "様々":"さまざま","調査":"ちょうさ","紹介":"しょうかい",
  "事故":"じこ","漢字":"かんじ","企業":"きぎょう",
  "商社":"しょうしゃ","相談":"そうだん","注意":"ちゅうい",
  "注目":"ちゅうもく","責任":"せきにん","存在":"そんざい",
  "将来":"しょうらい","電車":"でんしゃ","成功":"せいこう",
  "失敗":"しっぱい","帰国":"きこく","合格":"ごうかく",
  "卒業":"そつぎょう","授業":"じゅぎょう","宿題":"しゅくだい",
  "成績":"せいせき","試験":"しけん","勉強":"べんきょう",
  "大学":"だいがく","学校":"がっこう","景気":"けいき",
  "連絡":"れんらく","時間":"じかん","仕事":"しごと",
  "場所":"ばしょ","家族":"かぞく","両親":"りょうしん",
  "上司":"じょうし","利用":"りよう","一生":"いっしょう",
  "大声":"おおごえ","医者":"いしゃ","徹夜":"てつや",
  "絶対":"ぜったい","週末":"しゅうまつ","前日":"ぜんじつ",
  "今度":"こんど","最近":"さいきん","日本":"にほん",
  "東京":"とうきょう","京都":"きょうと","山田":"やまだ",
  "身近":"みぢか","年々":"ねんねん","毎日":"まいにち",
  "今年":"ことし","来月":"らいげつ","先月":"せんげつ",
  "昨日":"きのう","過去":"かこ","大変":"たいへん",
  "確かに":"たしかに",
  // verbs / misc
  "詳しい":"くわしい","伝える":"つたえる","気付き":"きづき",
  "思い出し":"おもいだし","怒り":"おこり","続け":"つづけ",
  "泣き":"なき","超え":"こえ","占め":"しめ","達し":"たっし",
  "得る":"える","選ぶ":"えらぶ","決め":"きめ","増え":"ふえ",
  "働く":"はたらく","落ちて":"おちて","混んで":"こんで",
  "動いて":"うごいて","聞き":"きき",
  // 1-char
  "私":"わたし","母":"はは","国":"くに","島":"しま",
  "車":"くるま","道":"みち","雪":"ゆき","足":"あし",
  "字":"じ","本":"ほん","寮":"りょう","秋":"あき","昔":"むかし",
};
const FGE = Object.entries(FGD).sort((a,b)=>b[0].length-a[0].length);

function parseFG(text) {
  let segs = [{s:true,v:text}];
  for (const [k,r] of FGE) {
    const nx=[];
    for (const sg of segs) {
      if(!sg.s){nx.push(sg);continue;}
      const ps=sg.v.split(k);
      if(ps.length===1){nx.push(sg);continue;}
      for(let i=0;i<ps.length;i++){
        if(ps[i])nx.push({s:true,v:ps[i]});
        if(i<ps.length-1)nx.push({s:false,k,r});
      }
    }
    segs=nx;
  }
  return segs;
}
const RT={fontSize:"0.54em",color:"#ffd580",letterSpacing:"0.1px"};

function shuffleArr(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

// ── Questions ──────────────────────────────────────────────────────────
const questions = [
  {id:1,sentence:"長い間不景気だったが、最近は景気が少しずつよくなり（　）。",options:["際に","つつある","たものだ","どころか"],answer:1,meaning:"Sudah lama ekonomi lesu, tapi belakangan ini ekonomi sedikit demi sedikit mulai membaik.",grammar:"〜つつある",explanation:"Menyatakan bahwa suatu proses sedang berlangsung secara bertahap dan masih terus berjalan. Artinya: 'sedang terus (berubah/berkembang)'. Digunakan dengan kata kerja bentuk ます (batang kata)."},
  {id:2,sentence:"今度また京都にいらっしゃる（　）は、ぜひご連絡ください。",options:["際に","うちに","ものの","ことに"],answer:0,meaning:"Apabila Anda berkunjung ke Kyoto lagi, tolong hubungi kami.",grammar:"〜際に",explanation:"Menyatakan 'pada saat/kesempatan...' sesuatu terjadi. Lebih formal dari 'とき'. Biasa digunakan dalam situasi resmi atau tertulis."},
  {id:3,sentence:"私は最近比較文化論の授業を取ってから、いろいろな国のことを知りたくて（　）んだ。",options:["と同時に","に違いない","しょうがない","における"],answer:2,meaning:"Sejak mengambil mata kuliah studi budaya komparatif, aku sangat ingin tahu tentang berbagai negara.",grammar:"〜てしょうがない",explanation:"Menyatakan perasaan atau keinginan yang sangat kuat dan tidak bisa ditahan. Artinya: 'sangat... / tidak tahan rasanya'."},
  {id:4,sentence:"これまで何度も日本語能力試験に落ちているが、今年（　）、絶対に合格したい。",options:["こそ","まさに","なんか","なりに"],answer:0,meaning:"Meski sudah berkali-kali gagal ujian kemampuan bahasa Jepang, justru tahun inilah aku pasti ingin lulus.",grammar:"〜こそ",explanation:"Partikel penegas yang menyatakan penekanan atau keistimewaan. Artinya: 'justru...lah / memang...inilah'. Memperkuat fokus pada kata yang mendahuluinya."},
  {id:5,sentence:"家族は近くにいるとそのありがたさに気付きにくいが、身近な存在だ（　）、日ごろから感謝の気持ちを伝えるべきだ。",options:["にもかかわらず","ないまでも","どころか","からこそ"],answer:3,meaning:"Ketika keluarga ada di dekat kita, sulit menyadari betapa berharganya mereka. Namun justru karena mereka dekat, kita harus menyampaikan rasa terima kasih setiap hari.",grammar:"〜からこそ",explanation:"Menyatakan alasan yang ditonjolkan secara emosional. Artinya: 'justru karena..., maka...'. Nuansanya lebih kuat dari 'から' biasa."},
  {id:6,sentence:"道が混んでいる時は車で行くよりも（　）歩くほうが早い。",options:["まさに","むしろ","いったい","かえって"],answer:1,meaning:"Saat jalan macet, lebih baik jalan kaki daripada naik mobil.",grammar:"むしろ",explanation:"Kata keterangan yang menyatakan 'lebih baik / lebih tepat jika...'. Digunakan ketika membandingkan dua pilihan dan menyatakan pilihan yang lebih sesuai."},
  {id:7,sentence:"週末（　）、上司から仕事のメールが来た。",options:["にもかかわらず","ない限り","における","とともに"],answer:0,meaning:"Meskipun hari libur akhir pekan, email pekerjaan dari atasan tetap datang.",grammar:"〜にもかかわらず",explanation:"Menyatakan kontras: 'meskipun..., namun...'. Menunjukkan bahwa situasi yang terjadi berlawanan dengan ekspektasi."},
  {id:8,sentence:"毎日勉強しているのに、成績は下がる（　）だ。",options:["ものだ","ばかり","こそ","ならでは"],answer:1,meaning:"Padahal setiap hari belajar, tapi nilai malah terus turun saja.",grammar:"〜ばかりだ",explanation:"Menyatakan bahwa suatu kondisi terus berlanjut hanya ke satu arah (biasanya negatif). Artinya: 'terus... saja / semakin...'."},
  {id:9,sentence:"ゲーム（　）していないで、早く宿題しなさい。",options:["ばかり","と同時に","における","ことに"],answer:0,meaning:"Jangan cuma main game terus, cepat kerjakan PR!",grammar:"〜ばかり",explanation:"Di sini menyatakan 'hanya melakukan itu saja'. Nuansanya: seseorang hanya sibuk dengan satu hal saja (biasanya kritikan)."},
  {id:10,sentence:"新しい先生は厳しい（　）、やさしいところもあるよ。",options:["に違いない","たとしても","と同時に","ないまでも"],answer:2,meaning:"Guru baru itu sekaligus tegas, namun juga punya sisi yang lembut.",grammar:"〜と同時に",explanation:"Menyatakan dua hal yang terjadi bersamaan atau dua sifat yang dimiliki sekaligus. Artinya: 'pada saat yang sama / sekaligus'."},
  {id:11,sentence:"残念な（　）、2人の結婚生活はうまくいかなかったようだ。",options:["くらい","どころか","際に","ことに"],answer:3,meaning:"Sayangnya, kehidupan pernikahan mereka berdua tampaknya tidak berjalan lancar.",grammar:"〜ことに",explanation:"Menyatakan perasaan pembicara (sedih, senang, mengejutkan). Artinya: '(yang) ...-nya adalah'. Digunakan dengan kata sifat perasaan: 残念なことに、嬉しいことに, dll."},
  {id:12,sentence:"少子高齢化は、日本（　）最大の社会問題の一つだろう。",options:["にこだわる","における","ならでは","なんか"],answer:1,meaning:"Penurunan angka kelahiran dan penuaan penduduk adalah salah satu masalah sosial terbesar di Jepang.",grammar:"〜における",explanation:"Menyatakan 'di dalam / dalam konteks (suatu tempat atau bidang)'. Versi formal dari 'での'. Sering digunakan dalam tulisan akademis."},
  {id:13,sentence:"昨日の旅行番組で紹介されていたのは、（　）私が先月行った島だった。",options:["いったい","まさに","むしろ","かえって"],answer:1,meaning:"Yang diperkenalkan di acara wisata kemarin adalah persis pulau yang aku kunjungi bulan lalu.",grammar:"まさに",explanation:"Kata keterangan yang menyatakan 'tepat sekali / persis / benar-benar'. Digunakan untuk menegaskan bahwa sesuatu sangat pas atau sesuai."},
  {id:14,sentence:"彼はコンピューターに詳しい（　）、自分でコンピューターを作ることさえできる。",options:["どころか","における","ない限り","くらい"],answer:3,meaning:"Ia tidak hanya menguasai komputer — bahkan mampu merakit komputer sendiri.",grammar:"〜くらい（ぐらい）",explanation:"Di sini menyatakan tingkat yang luar biasa. Artinya: 'sampai-sampai / bahkan... pun'. Menunjukkan contoh ekstrem untuk memperkuat pernyataan."},
  {id:15,sentence:"雪が降ら（　）、スキーはできません。",options:["たとしても","するうちに","ない限り","するばかり"],answer:2,meaning:"Kecuali ada salju, ski tidak bisa dilakukan.",grammar:"〜ない限り",explanation:"Menyatakan syarat negatif: 'selama tidak... / kecuali jika...'. Artinya: kondisi A tidak terpenuhi → kondisi B tidak akan terjadi."},
  {id:16,sentence:"旅行先では、その場所（　）のお土産を買うようにしている。",options:["ならでは","における","に違いない","なんか"],answer:0,meaning:"Di tempat wisata, aku selalu berusaha membeli oleh-oleh khas dari tempat itu.",grammar:"〜ならでは",explanation:"Menyatakan sesuatu yang hanya bisa ada atau dilakukan di tempat/hal tertentu. Artinya: 'khas dari... / hanya bisa di...'."},
  {id:17,sentence:"週に1回とは言わ（　）、せめて月に1回は外食がしたいです。",options:["ないまでも","はずがない","ない限り","わけがない"],answer:0,meaning:"Meski tidak sampai seminggu sekali, setidaknya sebulan sekali ingin makan di luar.",grammar:"〜ないまでも",explanation:"Menyatakan 'meski tidak sampai (level A), setidaknya (level B)'. Digunakan untuk mengungkapkan batas minimum yang realistis."},
  {id:18,sentence:"親は子育てをしながら、子ども（　）成長する。",options:["どころか","とともに","からこそ","にもかかわらず"],answer:1,meaning:"Orang tua tumbuh bersama anak-anaknya sambil membesarkan mereka.",grammar:"〜とともに",explanation:"Menyatakan 'bersama dengan / seiring dengan'. Bisa berarti kebersamaan atau perubahan paralel (seiring waktu)."},
  {id:19,sentence:"ファッションは時代（　）変化する。",options:["とともに","ことに","ないまでも","際に"],answer:0,meaning:"Mode/fashion berubah seiring dengan perkembangan zaman.",grammar:"〜とともに",explanation:"Di sini menyatakan perubahan yang terjadi seiring waktu. Artinya: 'seiring dengan / bersamaan dengan'."},
  {id:20,sentence:"昔は、よく学校帰りにカラオケに行った（　）。",options:["ばかりだ","ものだ","に違いない","としても"],answer:1,meaning:"Dulu, aku sering pergi karaoke sepulang sekolah.",grammar:"〜たものだ",explanation:"Menyatakan kenangan atau kebiasaan di masa lalu dengan nuansa nostalgia. Artinya: 'dulu sering / dulu biasanya...'."},
  {id:21,sentence:"試験の前日に徹夜したら、（　）逆効果だよ。",options:["まさに","むしろ","いったい","かえって"],answer:3,meaning:"Kalau begadang sehari sebelum ujian, justru malah berbalik efek (kontraproduktif).",grammar:"かえって",explanation:"Menyatakan hasil yang berlawanan dari yang diharapkan. Artinya: 'justru malah / sebaliknya'."},
  {id:22,sentence:"本を読んでいる（　）、いつの間にか寝てしまった。",options:["どころか","うちに","際に","ことに"],answer:1,meaning:"Saat sedang membaca buku, tanpa sadar sudah ketiduran.",grammar:"〜うちに",explanation:"Menyatakan 'selagi / sementara' sesuatu masih berlangsung. Contoh: 若いうちに (selagi masih muda), 熱いうちに (selagi masih panas)."},
  {id:23,sentence:"成功するためには人にアドバイスを求めるだけではなく、自分（　）いろいろ試してみることが大切だ。",options:["なんか","ならでは","における","なりに"],answer:3,meaning:"Untuk sukses, penting bukan hanya meminta saran orang lain, tetapi juga mencoba berbagai hal dengan cara diri sendiri.",grammar:"〜なりに",explanation:"Menyatakan 'dengan caranya sendiri / sesuai dengan kemampuannya'. Polanya: 名詞＋なりに。"},
  {id:24,sentence:"この店は料理の材料（　）いて、野菜はすべて自分たちで育てたものを使っている。",options:["にこだわって","ないまでも","に違いなくて","にもかかわらず"],answer:0,meaning:"Restoran ini sangat memperhatikan bahan masakan — semua sayurannya menggunakan hasil pertanian mereka sendiri.",grammar:"〜にこだわる",explanation:"Menyatakan 'sangat teguh/bersikeras pada / sangat memperhatikan'. Polanya: 名詞＋にこだわる."},
  {id:25,sentence:"昨日のハイキングで足が痛くなる（　）歩かされて、大変だったよ。",options:["ものだ","くらい","なんか","こそ"],answer:1,meaning:"Di hiking kemarin, aku dipaksa jalan sampai-sampai kaki sakit, sungguh berat.",grammar:"〜くらい",explanation:"Di sini menyatakan tingkat yang ekstrem. Artinya: 'sampai... / sedemikian rupa hingga...'."},
  {id:26,sentence:"いつも約束の時間を守る山田さんがまだ来ない。何かあった（　）。",options:["わけがない","どころか","はずがない","に違いない"],answer:3,meaning:"Yamada-san yang selalu tepat waktu belum juga datang. Pasti ada sesuatu yang terjadi.",grammar:"〜に違いない",explanation:"Menyatakan keyakinan kuat berdasarkan alasan atau situasi. Artinya: 'pasti / tidak mungkin tidak'. Lebih kuat dari 'だろう'."},
  {id:27,sentence:"どんなに大変だった（　）、医者になるために勉強を続けるつもりだ。",options:["としても","における","ばかり","つつある"],answer:0,meaning:"Seberapa pun sulitnya, aku tetap berencana terus belajar untuk menjadi dokter.",grammar:"〜たとしても",explanation:"Menyatakan kondisi hipotetis yang diakui, tapi hasilnya tetap sama. Artinya: 'meskipun seandainya... / bahkan jika...'."},
  {id:28,sentence:"昨日忙しくてテレビ（　）見る時間はなかった。",options:["なりに","こそ","ならでは","なんか"],answer:3,meaning:"Kemarin sangat sibuk, bahkan waktu untuk menonton TV pun tidak ada.",grammar:"〜なんか",explanation:"Di sini digunakan untuk merendahkan dalam konteks negatif. Artinya: 'bahkan... pun (tidak) / apalagi...'."},
  {id:29,sentence:"（　）いつになったら、世界は平和になるのだろうか。",options:["むしろ","かえって","いったい","まさに"],answer:2,meaning:"Sebenarnya, kapan dunia ini akan menjadi damai?",grammar:"いったい",explanation:"Kata tanya penguat yang menyatakan kebingungan atau pertanyaan retoris yang emosional. Selalu diikuti kata tanya (いつ、何、なぜ, dll)."},
  {id:30,sentence:"彼女が書く字は小さくて、読める（　）くらいの大きさだ。",options:["ない限り","か読めないか","に違いない","わけがない"],answer:1,meaning:"Tulisannya sangat kecil, seukuran yang hampir tidak terbaca.",grammar:"〜か〜ないか",explanation:"Menyatakan batas tipis antara dua kondisi yang berlawanan. Artinya: 'hampir... / nyaris bisa/tidak bisa'."},
  {id:31,sentence:"結婚する（　）、家族が増えるということだ。",options:["と同時に","ことに","ということは","どころか"],answer:2,meaning:"Artinya, menikah berarti keluarga bertambah.",grammar:"〜ということは",explanation:"Menyatakan pemaknaan atau implikasi logis dari suatu pernyataan. Artinya: 'artinya... / berarti...'."},
  {id:32,sentence:"いつも客がいっぱいのレストランだから、美味しい（　）よ。",options:["たものだ","つつある","はずがない","に違いない"],answer:2,meaning:"Karena restorannya selalu penuh tamu, tidak mungkin makanannya tidak enak.",grammar:"〜はずがない",explanation:"Menyatakan bahwa sesuatu mustahil terjadi berdasarkan logika atau situasi yang jelas. Artinya: 'tidak mungkin / mustahil (logis)'. Berbeda dari わけがない yang lebih emosional dan kuat."},
  {id:33,sentence:"勉強せずに試験でいい点が取れる（　）よ。",options:["ことに","に違いない","わけがない","際に"],answer:2,meaning:"Tidak mungkin bisa dapat nilai bagus di ujian tanpa belajar.",grammar:"〜わけがない",explanation:"Menyatakan penolakan logis yang kuat. Artinya: 'tidak mungkin / mustahil'. Lebih kuat dari 'はずがない'."},
  {id:34,sentence:"このお茶を飲めば、簡単にやせられるなんて、絶対にあり（　）よ。",options:["得ない","ものの","にすぎない","かねない"],answer:0,meaning:"Dengan minum teh ini bisa turun berat badan dengan mudah? Itu sungguh tidak mungkin terjadi.",grammar:"〜得ない（えない）",explanation:"Menyatakan 'tidak mungkin terjadi / tidak bisa'. Polanya: 動詞ます形（語幹）＋得ない."},
  {id:35,sentence:"母は私の話を聞き（　）で怒り続けた。",options:["に達して","たところ","とする","もしない"],answer:3,meaning:"Ibu terus marah tanpa mau mendengarkan ceritaku sama sekali.",grammar:"〜もしない",explanation:"Menyatakan penolakan total untuk melakukan sesuatu. Artinya: 'bahkan tidak melakukan... sama sekali'. Polanya: 動詞ます形（語幹）＋もしない."},
  {id:36,sentence:"週に1回以上図書館を利用する割合は、3分の１（　）。",options:["を超える","に達する","にとどまる","を占める"],answer:2,meaning:"Persentase yang menggunakan perpustakaan lebih dari sekali seminggu hanya sebatas sepertiga.",grammar:"〜にとどまる",explanation:"Menyatakan bahwa angka atau hasil hanya sebatas di angka tersebut, tidak lebih. Artinya: 'hanya sampai / terbatas pada'."},
  {id:37,sentence:"日本では子どもの数が減っている。（　）、インドでは増えている。",options:["なり","一方で","に応じて","にすぎず"],answer:1,meaning:"Di Jepang jumlah anak-anak berkurang. Sementara di sisi lain, di India justru meningkat.",grammar:"一方で（いっぽうで）",explanation:"Menyatakan kontras antara dua situasi yang berbeda. Artinya: 'sementara di sisi lain / di lain pihak'."},
  {id:38,sentence:"調査によると、朝食にご飯ではなくパンを食べる人は年々増え続け、とうとう7割（　）そうだ。",options:["にとどまった","を占めた","に達した","にすぎなかった"],answer:2,meaning:"Menurut survei, jumlah orang yang sarapan roti terus meningkat tiap tahun, dan akhirnya mencapai 70%.",grammar:"〜に達した（に達する）",explanation:"Menyatakan bahwa angka atau kondisi telah mencapai suatu titik tertentu. Artinya: 'telah mencapai / sampai pada'."},
  {id:39,sentence:"日本の65歳以上の高齢者の割合は2040年に35％（　）と言われている。",options:["まで","にとどまった","を超える","にすぎない"],answer:2,meaning:"Dikatakan bahwa proporsi lansia di atas 65 tahun di Jepang pada tahun 2040 akan melebihi 35%.",grammar:"〜を超える",explanation:"Menyatakan 'melebihi / melampaui' suatu batas atau angka. Lawan dari にとどまる."},
  {id:40,sentence:"うちの大学に中国人の留学生が留学生全体の約60%（　）いるらしいよ。",options:["を占めて","に達して","にとどまって","に応じて"],answer:0,meaning:"Sepertinya mahasiswa asing asal Tiongkok di universitas kita mendominasi sekitar 60% dari total mahasiswa asing.",grammar:"〜を占める",explanation:"Menyatakan 'menempati / mendominasi (bagian dari keseluruhan)'. Sering digunakan dalam statistik."},
  {id:41,sentence:"体によくないとわかってい（　）、夜遅くに甘いものを食べてしまう。",options:["つつ","ながら","ものの","うえで"],answer:1,meaning:"Meski tahu tidak baik untuk tubuh, tetap saja makan makanan manis larut malam.",grammar:"〜ながら（も）",explanation:"Menyatakan dua hal berlawanan yang terjadi bersamaan. Artinya: 'meskipun / sambil (A) namun tetap (B)'. Pola: 動詞ます形＋ながら. Lebih umum digunakan dalam percakapan dibanding つつ."},
  {id:42,sentence:"よく食べ、よく運動する人（　）、健康だよね。",options:["ものの","まで","ほど","がち"],answer:2,meaning:"Semakin rajin makan baik dan olahraga, semakin sehat ya.",grammar:"〜ほど",explanation:"Di sini menyatakan korelasi: 'semakin... semakin...'. Contoh: 練習すればするほど上手になる."},
  {id:43,sentence:"東京の新宿駅の利用者数は1日350万人（　）そうだ。",options:["にとどまる","にすぎない","にのぼる","を占める"],answer:2,meaning:"Katanya jumlah penumpang Stasiun Shinjuku Tokyo mencapai 3,5 juta orang per hari.",grammar:"〜にのぼる",explanation:"Menyatakan 'mencapai / berjumlah' angka yang sangat besar. Berbeda dari 'に達する' — 'にのぼる' menekankan besarnya jumlah."},
  {id:44,sentence:"1年の留学生活を思い出し（　）、お別れ会のスピーチ原稿を書いた。",options:["ならでは","かねない","つつ","であれ"],answer:2,meaning:"Sambil mengenang kehidupan setahun sebagai mahasiswa asing, aku menulis naskah pidato perpisahan.",grammar:"〜つつ",explanation:"Di sini menyatakan dua tindakan yang dilakukan bersamaan. Artinya: 'sambil melakukan A, melakukan B'."},
  {id:45,sentence:"新しく出たパソコンを使ってみた（　）、古いものよりずっと早くて使いやすかった。",options:["ものの","ところ","ながら","とは限り言えない"],answer:1,meaning:"Ketika mencoba komputer yang baru keluar, ternyata jauh lebih cepat dan mudah digunakan dari yang lama.",grammar:"〜たところ",explanation:"Menyatakan hasil yang ditemukan setelah melakukan suatu tindakan. Artinya: 'setelah mencoba/melakukan..., ternyata...'."},
  {id:46,sentence:"新しいスマホを買った（　）、使い方がよくわからず困っている。",options:["まで","にすぎない","に達した","ものの"],answer:3,meaning:"Meskipun sudah membeli smartphone baru, tapi bingung karena tidak tahu cara pakainya.",grammar:"〜ものの",explanation:"Menyatakan kontras: 'meskipun A, namun B (berlawanan)'. Lebih formal dari のに, sering diikuti situasi yang mengecewakan."},
  {id:47,sentence:"将来商社で働きたいなら、英語の他に、スペイン語（　）フランス語（　）、いろいろな国で話されている言葉を学んでおいたほうがいい。",options:["まで／まで","なり／なり","でも／でも","ほど／ほど"],answer:1,meaning:"Kalau ingin bekerja di perusahaan dagang, selain bahasa Inggris, sebaiknya pelajari juga bahasa seperti Spanyol atau Prancis.",grammar:"〜なり〜なり",explanation:"Menyatakan 'entah A entah B / misalnya A atau B'. Digunakan untuk memberi contoh pilihan yang tidak eksklusif."},
  {id:48,sentence:"みんなで何度も見直したのだから、この書類に間違いはある（　）。",options:["そうになる","かねない","がちだ","まい"],answer:3,meaning:"Karena sudah dicek berkali-kali bersama-sama, dokumen ini tidak akan ada kesalahannya.",grammar:"〜まい",explanation:"Menyatakan tekad atau keyakinan negatif. Artinya: 'tidak akan / pasti tidak'. Bentuk formal dari 'ないだろう'."},
  {id:49,sentence:"散々悩んだ（　）、来月、帰国することにした。",options:["ところ","だけ","うえで","以上は"],answer:2,meaning:"Setelah banyak berpikir dan mempertimbangkan, aku memutuskan untuk pulang ke negara asal bulan depan.",grammar:"〜うえで",explanation:"Menyatakan 'setelah melakukan A, kemudian melakukan B'. A adalah proses yang diselesaikan sebelum B dilakukan."},
  {id:50,sentence:"私のピアノの先生はとても厳しい。最近、好きだったピアノそのもの（　）嫌いになってきた。",options:["でも","まで","ほど","なり"],answer:1,meaning:"Guru pianoku sangat keras. Belakangan ini bahkan aku mulai membenci piano itu sendiri yang dulu kusukai.",grammar:"〜まで",explanation:"Di sini 'まで' menyatakan 'bahkan sampai...' — sesuatu yang ekstrem ikut terpengaruh. Menekankan betapa jauhnya dampak suatu hal."},
  {id:51,sentence:"どんなに優秀な人（　）、失敗することもある。",options:["であれ","に応じて","にすぎず","といっても"],answer:0,meaning:"Siapapun orangnya, sehebat apapun, pasti pernah gagal.",grammar:"〜であれ",explanation:"Menyatakan 'siapapun / apapun / tidak peduli siapa'. Polanya: 名詞＋であれ. Lebih formal dari 'でも'."},
  {id:52,sentence:"車を運転しながらスマホを使っていると、事故をおこし（　）。",options:["かねない","なかれ","まい","ようが"],answer:0,meaning:"Kalau menggunakan smartphone sambil mengemudi, bisa-bisa menyebabkan kecelakaan.",grammar:"〜かねない",explanation:"Menyatakan kemungkinan hal buruk yang bisa terjadi. Artinya: 'bisa saja / mungkin saja (terjadi hal yang tidak diinginkan)'."},
  {id:53,sentence:"過去のこと（　）、これからのことについて話し合いましょう。",options:["がちで","はさておくとして","にのぼり","に応じて"],answer:1,meaning:"Kesampingkan dulu soal masa lalu — mari kita diskusikan tentang masa depan.",grammar:"〜はさておくとして",explanation:"Menyatakan 'dikesampingkan dulu / bagaimanapun hal itu'. Biasa digunakan di awal perubahan topik diskusi."},
  {id:54,sentence:"ゲンキは家からくるかバイト先から来るか分からないが、（　）サークルの練習に遅れるらしい。",options:["とする","ものの","にすぎない","いずれにしても"],answer:3,meaning:"Tidak tahu apakah Genki datang dari rumah atau dari tempat kerja paruh waktu, tapi bagaimanapun sepertinya dia akan terlambat ke latihan klub.",grammar:"いずれにしても",explanation:"Menyatakan 'bagaimanapun juga / apapun yang terjadi'. Apapun kondisinya, kesimpulan akhirnya tetap sama."},
  {id:55,sentence:"大学の勉強で大切なことは知識を得ることである（　）だろう。得た知識をどのように使うかも大切だ。",options:["に違いない","とはばかり言えない","とする","に達する"],answer:1,meaning:"Hal terpenting dalam studi universitas tidak bisa hanya dikatakan sebagai 'mendapat pengetahuan'. Bagaimana menggunakan pengetahuan yang diperoleh juga penting.",grammar:"〜とばかり言えない",explanation:"Menyatakan 'tidak bisa hanya mengatakan bahwa / tidak semerta-merta'. Ada nuansa 'tidak sesederhana itu'."},
  {id:56,sentence:"新しい先生が、「遅刻3回で欠席1回分（　）ます」って言ってたよ。",options:["まで","にすぎ","とし","に応じ"],answer:2,meaning:"Guru baru bilang, 'Terlambat 3 kali akan dihitung sebagai 1 kali absen.'",grammar:"〜とする",explanation:"Menyatakan 'ditetapkan sebagai / dianggap sebagai'. Secara resmi atau berdasarkan aturan, A diperlakukan/didefinisikan sebagai B."},
  {id:57,sentence:"A：ねえ、この漢字の読み方教えて。B：また？人に聞かないで、スマホ（　）調べてみたら？",options:["でも","に応じて","なり","であれ"],answer:0,meaning:"A: Hei, ajari aku cara baca kanji ini. B: Lagi? Jangan tanya orang, coba cari pakai smartphone atau sesuatu dong.",grammar:"〜でも",explanation:"Di sini 'でも' menyatakan 'atau sesuatu seperti itu / setidaknya'. Memberikan saran dengan contoh yang tidak spesifik."},
  {id:58,sentence:"一口に音楽（　）、ロック、ジャズ、ポップなど様々な種類がある。",options:["うえで","かねない","にすぎず","といっても"],answer:3,meaning:"Meskipun dikatakan 'musik' secara umum, ada banyak jenis seperti rock, jazz, pop, dan lain-lain.",grammar:"〜といっても",explanation:"Menyatakan 'meskipun dikatakan / walaupun disebut'. Istilah umum A perlu diperjelas karena realitasnya lebih kompleks."},
  {id:59,sentence:"デート（　）、歩いて10分の近くの公園に行くだけだよ。",options:["ない限り","ことに","といっても","を超える"],answer:2,meaning:"Meskipun disebut 'kencan', itu hanya pergi ke taman terdekat yang cuma 10 menit jalan kaki.",grammar:"〜といっても",explanation:"Sama seperti soal 58 — menyatakan bahwa realita berbeda dari kesan awal kata tersebut."},
  {id:60,sentence:"最近、ストレスでお酒を飲みすぎてしまい（　）で……。",options:["まで","ものの","がち","分だけ"],answer:2,meaning:"Belakangan ini aku cenderung minum terlalu banyak karena stres...",grammar:"〜がち",explanation:"Menyatakan kecenderungan yang sering terjadi (biasanya negatif). Artinya: 'cenderung / sering kali / mudah...'."},
  {id:61,sentence:"季節（　）料理のメニューを変えているらしいから、次は秋に行きましょう。",options:["はずがない","にこだわって","に応じて","どころか"],answer:2,meaning:"Katanya menu masakan berubah sesuai musim, jadi mari kita pergi lagi musim gugur nanti.",grammar:"〜に応じて",explanation:"Menyatakan 'sesuai dengan / tergantung pada / mengikuti'. B berubah atau disesuaikan berdasarkan kondisi A."},
  {id:62,sentence:"食べたら食べた（　）体重が増えると言う人もいるが、そうではない人もいる。",options:["分だけ","ものの","ところ","に達して"],answer:0,meaning:"Ada yang bilang semakin banyak makan, semakin bertambah berat badannya — tapi ada juga yang tidak begitu.",grammar:"〜分だけ（ぶんだけ）",explanation:"Menyatakan 'sebanyak itu / sebanding dengan'. Hasil B sebanding atau proporsional dengan jumlah/usaha A."},
  {id:63,sentence:"この店の商品は確かに安いが、品質がよくないから安い（　）よ。",options:["に達した","にすぎない","にもかかわらず","てしょうがない"],answer:1,meaning:"Produk toko ini memang murah, tapi kualitasnya tidak baik, jadi harganya murah hanya wajar saja.",grammar:"〜にすぎない",explanation:"Menyatakan 'hanyalah / tidak lebih dari / sekedar'. Merendahkan atau membatasi makna sesuatu."},
  {id:64,sentence:"ペットを飼う（　）、一生責任持って世話するつもりだけど。",options:["なり","とは限り言えない","以上は","ところ"],answer:2,meaning:"Karena sudah memutuskan memelihara hewan peliharaan, aku bermaksud merawatnya dengan penuh tanggung jawab seumur hidup.",grammar:"〜以上は（いじょうは）",explanation:"Menyatakan 'karena sudah... maka / setelah memutuskan... harus'. Ada nuansa tekad atau kewajiban."},
  {id:65,sentence:"寮を選ぶ（　）注意すべきことの一つは学校までの距離だよ。",options:["ばかり","うえで","まさに","得ない"],answer:1,meaning:"Salah satu hal yang perlu diperhatikan dalam memilih asrama adalah jarak ke kampus.",grammar:"〜うえで",explanation:"Di sini 'うえで' menyatakan 'dalam konteks melakukan / ketika melakukan'. Dalam proses A, ada hal penting yang perlu diperhatikan."},
  {id:66,sentence:"留学先は、ご両親とよく相談した（　）決めてください。",options:["なかれ","ほど","にすぎない","うえで"],answer:3,meaning:"Tolong tentukan tujuan studi luar negeri setelah berdiskusi baik-baik dengan orang tua.",grammar:"〜うえで",explanation:"Di sini 'うえで' menyatakan 'setelah melakukan A, barulah B'. A adalah langkah yang harus dilakukan sebelum B dilakukan."},
  {id:67,sentence:"卒業でこの4年間のことを思い出して、泣き（　）。",options:["にのぼった","そうになった","とする","ないまでも"],answer:1,meaning:"Saat wisuda, aku mengenang 4 tahun ini dan hampir saja menangis.",grammar:"〜そうになった",explanation:"Menyatakan 'hampir saja / nyaris'. Artinya: hampir melakukan atau hampir terjadi sesuatu, tapi akhirnya tidak jadi."},
  {id:68,sentence:"小さい企業だと思って、バカにすること（　）。世界がこの企業の新製品に注目しているのだ。",options:["なかれ","に応じて","ものの","でも"],answer:0,meaning:"Jangan meremehkan hanya karena perusahaannya kecil. Dunia sedang memperhatikan produk baru perusahaan ini.",grammar:"〜なかれ",explanation:"Menyatakan larangan dalam bentuk yang sangat formal/arkaik. Artinya: 'jangan...!'. Biasa dalam tulisan formal atau pepatah."},
  {id:69,sentence:"雪で電車が動いていないから、帰りたくても帰り（　）。",options:["かねない","ようがない","ほど","なりに"],answer:1,meaning:"Karena salju membuat kereta tidak beroperasi, meski ingin pulang pun tidak ada cara untuk pulang.",grammar:"〜ようがない",explanation:"Menyatakan 'tidak ada cara untuk / tidak bisa bagaimanapun'. Lebih kuat dari 'できない'. Polanya: 動詞ます形（語幹）＋ようがない."},
  {id:70,sentence:"彼女はそのニュースを聞く（　）、大声で泣き始めた。",options:["うえで","ものの","つつ","なり"],answer:3,meaning:"Begitu mendengar berita itu, dia langsung menangis dengan keras.",grammar:"〜なり",explanation:"Menyatakan reaksi spontan yang terjadi segera setelah suatu tindakan. Artinya: 'begitu... langsung / setelah... langsung'. Reaksinya sangat cepat dan tidak terduga."},
];

// ── Component ─────────────────────────────────────────────────────────
export default function JapaneseQuiz() {
  const [qList, setQList] = useState(questions);
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState({});   // { [q.id]: {sel, ok} }
  const [popup, setPopup] = useState(false);
  const [picker, setPicker] = useState(false);
  const [fg, setFg] = useState(false);
  const [done, setDone] = useState(false);

  const q    = qList[cur];
  const ca   = ans[q.id];
  const isAns = ca !== undefined;
  const score  = Object.values(ans).filter(a => a.ok).length;
  const nAns   = Object.keys(ans).length;
  const allDone = nAns === qList.length;

  // id → index in current qList (for picker)
  const idMap = {};
  qList.forEach((ql, i) => { idMap[ql.id] = i; });

  function RP(text) {
    if (!fg) return text;
    return parseFG(text).map((s, i) =>
      s.s ? <span key={i}>{s.v}</span>
           : <ruby key={i}>{s.k}<rt style={RT}>{s.r}</rt></ruby>
    );
  }

  function pick(idx) {
    if (isAns) return;
    setAns(p => ({...p, [q.id]: {sel: idx, ok: idx === q.answer}}));
    // ← no auto-popup
  }

  function goNext() {
    setPopup(false);
    if (cur + 1 >= qList.length) setDone(true);
    else setCur(c => c + 1);
  }

  function goBack() {
    setPopup(false);
    if (cur > 0) setCur(c => c - 1);
  }

  function jump(idx) { setCur(idx); setPicker(false); setPopup(false); }

  function reset(list) {
    setQList(list ?? questions);
    setCur(0); setAns({}); setPopup(false); setPicker(false); setDone(false);
  }

  // ── Finish screen ──
  if (done) {
    const p = Math.round((score / qList.length) * 100);
    const [em, msg] = p >= 80 ? ["🎌","優秀！ Luar biasa!"]
                    : p >= 60 ? ["📚","よくできました！ Lumayan bagus!"]
                              : ["💪","もっと頑張ろう！ Semangat!"];
    return (
      <div style={S.page}>
        <div style={S.finCard}>
          <div style={{fontSize:52,marginBottom:8}}>{em}</div>
          <h2 style={S.finTitle}>Kuis Selesai!</h2>
          <p style={S.finMsg}>{msg}</p>
          <div style={S.scoreCircle}>
            <span style={S.scoreN}>{score}</span>
            <span style={S.scoreD}>/{qList.length}</span>
          </div>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginTop:10}}>{p}% Benar</p>
          <div style={{display:"flex",gap:10,marginTop:18}}>
            <button style={{...S.btn,...S.btnSub,flex:1}} onClick={()=>reset()}>🔄 Ulangi</button>
            <button style={{...S.btn,flex:1}} onClick={()=>reset(shuffleArr(questions))}>🔀 Acak & Ulangi</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main view ──
  return (
    <div style={S.page}>

      {/* ── Header ── */}
      <div style={S.hdr}>
        <div style={S.hdrTop}>
          <span style={S.logo}>🇯🇵 文法クイズ</span>
          <span style={S.scorePill}>✔ {score}/{qList.length}</span>
        </div>
        <div style={S.ctrlRow}>
          <button style={fg ? {...S.ctrl,...S.ctrlOn} : S.ctrl} onClick={()=>setFg(f=>!f)}>
            ふりがな <span style={S.tag}>{fg?"ON":"OFF"}</span>
          </button>
          <button style={S.ctrl} onClick={()=>reset(shuffleArr(questions))}>🔀 Acak</button>
          <button style={{...S.ctrl,...S.ctrlPick}} onClick={()=>setPicker(true)}>📋 Pilih Soal</button>
          {allDone && (
            <button style={{...S.ctrl,...S.ctrlDone}} onClick={()=>setDone(true)}>🏁 Hasil</button>
          )}
        </div>
        <div style={S.progBar}>
          <div style={{...S.progFill, width:`${(nAns/qList.length)*100}%`}}/>
        </div>
        <div style={S.progLbl}>Terjawab {nAns}/{qList.length} · Soal No.{q.id}</div>
      </div>

      {/* ── Question Card ── */}
      <div style={S.card}>
        <div style={S.qNum}>No. {q.id}</div>

        <p style={{...S.sent, lineHeight: fg ? 3.0 : 1.9}}>
          {q.sentence.split("（　）").map((pt, i, arr) => (
            <span key={i}>
              {RP(pt)}
              {i < arr.length-1 && (
                <span style={S.blank}>{isAns ? RP(q.options[q.answer]) : "（　　）"}</span>
              )}
            </span>
          ))}
        </p>

        {/* Translation revealed after answering */}
        {isAns && (
          <div style={S.mbox}>
            <span style={S.mlbl}>🇮🇩 Arti Kalimat</span>
            <p style={S.mtxt}>{q.meaning}</p>
          </div>
        )}

        {/* Options */}
        <div style={S.opts}>
          {q.options.map((opt, idx) => {
            let st = {...S.opt};
            if (isAns) {
              if (idx === q.answer)   st = {...st, ...S.optOk};
              else if (idx === ca.sel) st = {...st, ...S.optBad};
              else                     st = {...st, opacity:0.3, cursor:"default"};
            }
            return (
              <button key={idx} style={st} onClick={()=>pick(idx)}>
                <span style={S.optN}>{idx+1}</span>
                <span style={{flex:1,textAlign:"left"}}>{RP(opt)}</span>
                {isAns && idx === q.answer  && <span style={S.bdgOk}>✓</span>}
                {isAns && idx === ca.sel && idx !== q.answer && <span style={S.bdgBad}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={S.nav}>
          <button style={cur===0 ? {...S.btnBack,opacity:0.3} : S.btnBack}
                  onClick={goBack} disabled={cur===0}>← Kembali</button>
          {isAns && (
            <button style={S.btnInfo} onClick={()=>setPopup(true)} title="Penjelasan">❓</button>
          )}
          {isAns && (
            <button style={S.btn} onClick={goNext}>
              {cur+1===qList.length ? "Lihat Hasil 🏁" : "Lanjut →"}
            </button>
          )}
        </div>
      </div>

      {/* ── Question Picker ── */}
      {picker && (
        <div style={S.overlay} onClick={()=>setPicker(false)}>
          <div style={S.sheet} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{color:"#fff",fontWeight:700,fontSize:15}}>📋 Pilih Soal</span>
              <button style={{background:"none",border:"none",color:"rgba(255,255,255,0.45)",fontSize:22,cursor:"pointer"}}
                      onClick={()=>setPicker(false)}>✕</button>
            </div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:11,marginBottom:12}}>
              Terjawab {nAns}/{qList.length} &nbsp;·&nbsp; Benar: {score} &nbsp;·&nbsp; Salah: {nAns - score}
            </div>
            <div style={S.grid}>
              {questions.map(orig => {
                const idx = idMap[orig.id];
                const a   = ans[orig.id];
                const isCur = idx === cur;
                let st = {...S.gBtn};
                if (isCur)    st = {...st, ...S.gBtnCur};
                else if (a?.ok) st = {...st, ...S.gBtnOk};
                else if (a)   st = {...st, ...S.gBtnBad};
                return <button key={orig.id} style={st} onClick={()=>jump(idx)}>{orig.id}</button>;
              })}
            </div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:12,flexWrap:"wrap"}}>
              {[["#f5a623","Aktif"],["#2ed573","Benar"],["#e94560","Salah"],["rgba(255,255,255,0.35)","Belum"]].map(([c,l])=>(
                <span key={l} style={{display:"flex",alignItems:"center",gap:4,color:"rgba(255,255,255,0.45)",fontSize:11}}>
                  <span style={{width:9,height:9,borderRadius:2,background:c,flexShrink:0}}/>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Explanation Popup (manual) ── */}
      {popup && (
        <div style={S.overlay} onClick={()=>setPopup(false)}>
          <div style={S.popSheet} onClick={e=>e.stopPropagation()}>
            <div style={ca?.ok ? S.popBdg : S.popBdgBad}>
              {ca?.ok ? "🎉 Benar!" : "❌ Salah"}
            </div>
            <div style={S.popSec}>
              <span style={S.popLbl}>Jawaban Benar</span>
              <span style={S.popAns}>{RP(q.options[q.answer])}</span>
            </div>
            <div style={S.popSec}>
              <span style={S.popLbl}>📖 Pola Bunpou</span>
              <span style={S.gramTag}>{q.grammar}</span>
              <p style={S.popExpl}>{q.explanation}</p>
            </div>
            <div style={{display:"flex",gap:9,marginTop:8}}>
              <button style={{...S.btnBack,flex:1,borderRadius:12,padding:"11px 0"}}
                      onClick={()=>setPopup(false)}>← Lihat Soal</button>
              <button style={{...S.btn,flex:1}} onClick={goNext}>
                {cur+1===qList.length ? "Selesai 🎌" : "Lanjut →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const S = {
  page:{minHeight:"100vh",background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",fontFamily:"'Noto Sans JP','Segoe UI',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",padding:16,boxSizing:"border-box"},
  hdr:{width:"100%",maxWidth:640,marginBottom:14},
  hdrTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},
  logo:{color:"#e94560",fontWeight:700,fontSize:17,letterSpacing:1},
  scorePill:{background:"#e94560",color:"#fff",borderRadius:20,padding:"3px 12px",fontSize:13,fontWeight:700},
  ctrlRow:{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap"},
  ctrl:{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.14)",color:"rgba(255,255,255,0.6)",borderRadius:10,padding:"6px 11px",cursor:"pointer",fontSize:13,fontWeight:600},
  ctrlOn:{background:"rgba(255,213,128,0.1)",border:"1.5px solid #ffd580",color:"#ffd580"},
  ctrlPick:{background:"rgba(100,149,237,0.1)",border:"1.5px solid rgba(100,149,237,0.5)",color:"rgba(180,200,255,0.85)"},
  ctrlDone:{background:"rgba(46,213,115,0.1)",border:"1.5px solid #2ed573",color:"#2ed573"},
  tag:{fontSize:10,fontWeight:800,letterSpacing:1,background:"rgba(255,255,255,0.12)",borderRadius:4,padding:"1px 5px"},
  progBar:{height:5,background:"rgba(255,255,255,0.1)",borderRadius:10,overflow:"hidden"},
  progFill:{height:"100%",background:"linear-gradient(90deg,#e94560,#f5a623)",borderRadius:10,transition:"width 0.4s ease"},
  progLbl:{color:"rgba(255,255,255,0.38)",fontSize:11,marginTop:4,textAlign:"right"},
  card:{width:"100%",maxWidth:640,background:"rgba(255,255,255,0.05)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:22,boxSizing:"border-box"},
  qNum:{color:"#e94560",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",marginBottom:8},
  sent:{color:"#fff",fontSize:17,marginBottom:16,fontWeight:500},
  blank:{display:"inline-block",background:"rgba(233,69,96,0.18)",border:"1.5px dashed #e94560",borderRadius:6,padding:"2px 11px",color:"#f5a623",fontWeight:700,fontSize:15,margin:"0 2px"},
  mbox:{background:"rgba(245,166,35,0.07)",border:"1px solid rgba(245,166,35,0.22)",borderRadius:10,padding:"9px 13px",marginBottom:16},
  mlbl:{color:"#f5a623",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"},
  mtxt:{color:"rgba(255,255,255,0.82)",fontSize:14,lineHeight:1.65,margin:"5px 0 0",fontStyle:"italic"},
  opts:{display:"flex",flexDirection:"column",gap:9,marginBottom:18},
  opt:{display:"flex",alignItems:"center",gap:11,background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:12,padding:"11px 14px",cursor:"pointer",color:"#fff",fontSize:16,transition:"all 0.18s"},
  optOk:{background:"rgba(46,213,115,0.14)",border:"1.5px solid #2ed573",color:"#2ed573"},
  optBad:{background:"rgba(233,69,96,0.14)",border:"1.5px solid #e94560",color:"#e94560"},
  optN:{background:"rgba(255,255,255,0.14)",borderRadius:6,width:25,height:25,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,flexShrink:0},
  bdgOk:{marginLeft:"auto",background:"#2ed573",color:"#fff",borderRadius:"50%",width:21,height:21,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0},
  bdgBad:{marginLeft:"auto",background:"#e94560",color:"#fff",borderRadius:"50%",width:21,height:21,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0},
  nav:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10},
  btnBack:{background:"transparent",border:"1.5px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.65)",borderRadius:12,padding:"10px 18px",cursor:"pointer",fontSize:13,fontWeight:600},
  btnInfo:{background:"rgba(245,166,35,0.14)",border:"1.5px solid #f5a623",color:"#f5a623",borderRadius:12,width:42,height:42,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  btn:{background:"linear-gradient(135deg,#e94560,#f5a623)",border:"none",color:"#fff",borderRadius:12,padding:"10px 22px",cursor:"pointer",fontSize:14,fontWeight:700,boxShadow:"0 4px 14px rgba(233,69,96,0.35)"},
  btnSub:{background:"rgba(255,255,255,0.09)",border:"1.5px solid rgba(255,255,255,0.18)",boxShadow:"none"},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.72)",backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100,padding:16,boxSizing:"border-box"},
  sheet:{width:"100%",maxWidth:640,background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.11)",borderRadius:"22px 22px 14px 14px",padding:20,maxHeight:"72vh",overflowY:"auto"},
  grid:{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:5,marginBottom:10},
  gBtn:{background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.11)",color:"rgba(255,255,255,0.65)",borderRadius:8,padding:"8px 2px",cursor:"pointer",fontSize:12,fontWeight:600,textAlign:"center"},
  gBtnCur:{background:"rgba(245,166,35,0.22)",border:"2px solid #f5a623",color:"#f5a623"},
  gBtnOk:{background:"rgba(46,213,115,0.13)",border:"1.5px solid #2ed573",color:"#2ed573"},
  gBtnBad:{background:"rgba(233,69,96,0.13)",border:"1.5px solid #e94560",color:"#e94560"},
  popSheet:{width:"100%",maxWidth:640,background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.11)",borderRadius:"22px 22px 14px 14px",padding:22,maxHeight:"80vh",overflowY:"auto"},
  popBdg:{display:"inline-block",background:"rgba(46,213,115,0.14)",border:"1.5px solid #2ed573",color:"#2ed573",borderRadius:20,padding:"4px 15px",fontWeight:700,fontSize:14,marginBottom:14},
  popBdgBad:{display:"inline-block",background:"rgba(233,69,96,0.14)",border:"1.5px solid #e94560",color:"#e94560",borderRadius:20,padding:"4px 15px",fontWeight:700,fontSize:14,marginBottom:14},
  popSec:{marginBottom:14},
  popLbl:{display:"block",color:"rgba(255,255,255,0.4)",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontWeight:600},
  popAns:{display:"inline-block",background:"rgba(245,166,35,0.14)",border:"1.5px solid #f5a623",color:"#f5a623",borderRadius:8,padding:"4px 13px",fontWeight:700,fontSize:17},
  gramTag:{display:"inline-block",background:"rgba(233,69,96,0.13)",border:"1px solid rgba(233,69,96,0.4)",color:"#e94560",borderRadius:8,padding:"3px 11px",fontWeight:700,fontSize:13,marginBottom:7},
  popExpl:{color:"rgba(255,255,255,0.72)",fontSize:13,lineHeight:1.75,margin:0},
  finCard:{width:"100%",maxWidth:380,background:"rgba(255,255,255,0.05)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:22,padding:32,boxSizing:"border-box",textAlign:"center",marginTop:40},
  finTitle:{color:"#fff",fontSize:22,fontWeight:700,margin:"0 0 7px"},
  finMsg:{color:"rgba(255,255,255,0.55)",fontSize:14,margin:"0 0 20px"},
  scoreCircle:{display:"inline-flex",alignItems:"baseline",gap:3,background:"linear-gradient(135deg,#e94560,#f5a623)",borderRadius:"50%",width:110,height:110,justifyContent:"center",boxShadow:"0 8px 28px rgba(233,69,96,0.38)"},
  scoreN:{color:"#fff",fontSize:38,fontWeight:900},
  scoreD:{color:"rgba(255,255,255,0.7)",fontSize:17,fontWeight:600},
};
