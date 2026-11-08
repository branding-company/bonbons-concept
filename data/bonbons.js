// Anush Concept: the 16 bonbons. All prices, origins and dates are SAMPLE data.
// Armenian and Russian copy is a draft pending native review.

export const BONBONS = [
  { slug: 'apricot-thyme', c: '#ff8a2b', shell: '#f3a23d', core: '#ffd089', tags: { fruity: 3, nutty: 0, boozy: 0, floral: 1, intense: 1 },
    ing: ['apricot', 'thyme', 'whitechoc', 'cream', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 1, wine: 2, coffee: 0, tea: 2 }, best: 'mtea',
    en: { n: 'Apricot & Thyme', f: 'Orchard-apricot gel and mountain thyme in white-chocolate ganache.', s: 'Sunday under grandmother’s tree.', t: 'Sun-warm apricot first, then a green, resinous breath of thyme. Clean finish.' },
    ru: { n: 'Абрикос и чабрец', f: 'Гель из садового абрикоса и горный чабрец в ганаше из белого шоколада.', s: 'Воскресенье под бабушкиным деревом.', t: 'Сначала тёплый абрикос, потом свежий смолистый чабрец. Чистое послевкусие.' },
    hy: { n: 'Ծիրան և ուրց', f: 'Այգու ծիրանի գել և լեռնային ուրց սպիտակ շոկոլադի գանաշում։', s: 'Կիրակի՝ տատիկի ծառի տակ։', t: 'Սկզբում արևից տաքացած ծիրան, հետո ուրցի թարմ բուրմունք։ Մաքուր վերջաճաշակ։' } },
  { slug: 'pomegranate-ganache', c: '#c4163a', shell: '#b01232', core: '#7a0a24', tags: { fruity: 3, nutty: 0, boozy: 0, floral: 0, intense: 2 },
    ing: ['pomegranate', 'darkchoc', 'cream', 'butter', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 1, wine: 2, coffee: 1, tea: 1 }, best: 'areni',
    en: { n: 'Pomegranate Ganache', f: 'Dark ganache with a pomegranate reduction.', s: 'Cracked like the fruit, seeds first.', t: 'Deep cocoa, then a bright, tart ruby note that lingers.' },
    ru: { n: 'Гранатовая ганаш', f: 'Ганаш из тёмного шоколада с гранатовой редукцией.', s: 'Раскалывается, как плод: сначала зёрна.', t: 'Глубокое какао, затем яркая кислинка граната, которая долго остаётся.' },
    hy: { n: 'Նռան գանաշ', f: 'Մուգ շոկոլադի գանաշ՝ նռան խտացրած հյութով։', s: 'Կոտրվում է նռան պես՝ նախ հատիկները։', t: 'Խորը կակաո, ապա նռան պայծառ թթվություն, որ երկար մնում է։' } },
  { slug: 'mulberry', c: '#8e3a7e', shell: '#7d2f70', core: '#4f1a47', tags: { fruity: 3, nutty: 0, boozy: 0, floral: 1, intense: 1 },
    ing: ['mulberry', 'milkchoc', 'cream', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 0, wine: 1, coffee: 1, tea: 2 }, best: 'black',
    en: { n: 'Mulberry', f: 'Dried-mulberry confit in milk chocolate.', s: 'Summer pavements stained purple.', t: 'Honeyed, jammy, almost raisin-like, softened by milk chocolate.' },
    ru: { n: 'Тутовник', f: 'Конфи из сушёного тутовника в молочном шоколаде.', s: 'Летние тротуары, окрашенные в фиолетовый.', t: 'Медовый, джемовый, почти изюмный вкус, смягчённый молочным шоколадом.' },
    hy: { n: 'Թութ', f: 'Չորացրած թթի կոնֆի կաթնային շոկոլադում։', s: 'Ամառվա մայթեր՝ մանուշակագույն հետքերով։', t: 'Մեղրային, մուրաբայի նման, գրեթե չամիչի համով՝ կակղեցված կաթնային շոկոլադով։' } },
  { slug: 'sujukh-praline', c: '#b0702f', shell: '#9a5a22', core: '#d9a060', tags: { fruity: 1, nutty: 3, boozy: 0, floral: 0, intense: 2 },
    ing: ['walnut', 'grapemust', 'caramel', 'milkchoc', 'butter'], all: ['milk', 'nuts', 'soy'], pair: { brandy: 2, wine: 1, coffee: 2, tea: 1 }, best: 'brandy5',
    en: { n: 'Sujukh Praline', f: 'Caramelised walnut praline with a grape-must ribbon.', s: 'A village sweet dressed for the city.', t: 'Toasted walnut, a chewy grape-must thread, a little bitterness to keep it honest.' },
    ru: { n: 'Суджух-пралине', f: 'Пралине из карамелизованного грецкого ореха с лентой из виноградного сока.', s: 'Деревенская сладость в городском наряде.', t: 'Жареный орех, тягучая нить виноградного сока и лёгкая горчинка.' },
    hy: { n: 'Սուջուխ պրալինե', f: 'Կարամելացված ընկույզի պրալինե՝ խաղողի ջրի (բեկմեզի) շերտով։', s: 'Գյուղական քաղցրավենիք՝ քաղաքային հագուստով։', t: 'Բոված ընկույզ, ձգվող խաղողային շերտ և թեթև դառնություն։' } },
  { slug: 'gata-caramel', c: '#e0a93a', shell: '#d99a25', core: '#f6d27a', tags: { fruity: 0, nutty: 1, boozy: 0, floral: 0, intense: 1 },
    ing: ['butter', 'caramel', 'gata', 'milkchoc', 'salt'], all: ['milk', 'gluten', 'soy'], pair: { brandy: 1, wine: 0, coffee: 2, tea: 2 }, best: 'cezve',
    en: { n: 'Gata Caramel', f: 'Butter caramel with a crisp gata crumble.', s: 'Everything a gata is, in one bite.', t: 'Buttery, shortbread-sweet, with a crunch that surprises you.' },
    ru: { n: 'Гата-карамель', f: 'Сливочная карамель с хрустящей крошкой гаты.', s: 'Всё, что есть в гате, за один укус.', t: 'Сливочный вкус, сладость песочного теста и неожиданный хруст.' },
    hy: { n: 'Գաթա կարամել', f: 'Կարագային կարամել՝ գաթայի փխրուն փշրանքով։', s: 'Այն ամենը, ինչ գաթան է՝ մեկ պատառով։', t: 'Կարագային, փխրուն խմորի քաղցրությամբ և անսպասելի խրթխրթոցով։' } },
  { slug: 'brandy-truffle', c: '#b8612a', shell: '#a24f1d', core: '#5e2a10', tags: { fruity: 1, nutty: 1, boozy: 3, floral: 0, intense: 3 },
    ing: ['brandy', 'darkchoc', 'cream', 'butter', 'sugar'], all: ['milk', 'soy', 'alcohol'], pair: { brandy: 2, wine: 0, coffee: 2, tea: 0 }, best: 'brandy5',
    en: { n: 'Brandy Truffle', f: 'Armenian brandy ganache in dark chocolate. Contains alcohol.', s: 'For the end of the long dinner.', t: 'Dried fruit, oak and vanilla from the brandy, wrapped in dark cocoa.' },
    ru: { n: 'Трюфель с коньяком', f: 'Ганаш с армянским коньяком в тёмном шоколаде. Содержит алкоголь.', s: 'К концу долгого ужина.', t: 'Сухофрукты, дуб и ваниль коньяка в оболочке из тёмного какао.' },
    hy: { n: 'Կոնյակի տրյուֆել', f: 'Հայկական կոնյակի գանաշ մուգ շոկոլադում։ Պարունակում է ալկոհոլ։', s: 'Երկար ընթրիքի վերջում։', t: 'Կոնյակի չորացրած միրգը, կաղնին ու վանիլը՝ մուգ կակաոյի մեջ փաթաթված։' } },
  { slug: 'tarragon-lime', c: '#5fa36a', shell: '#4f9660', core: '#b9e0a8', tags: { fruity: 2, nutty: 0, boozy: 0, floral: 2, intense: 1 },
    ing: ['tarragon', 'lime', 'whitechoc', 'cream', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 0, wine: 2, coffee: 0, tea: 2 }, best: 'voskehat',
    en: { n: 'Tarragon & Lime', f: 'Tarragon cream and a lime gel in white chocolate.', s: 'The green lemonade of childhood, grown up.', t: 'Anise-green tarragon, sharp lime, a cool finish.' },
    ru: { n: 'Тархун и лайм', f: 'Крем из тархуна и гель из лайма в белом шоколаде.', s: 'Зелёный лимонад из детства, повзрослевший.', t: 'Анисовый тархун, острый лайм и прохладное послевкусие.' },
    hy: { n: 'Թարխուն և լայմ', f: 'Թարխունի կրեմ և լայմի գել սպիտակ շոկոլադում։', s: 'Մանկության կանաչ լիմոնադը՝ մեծացած։', t: 'Անիսոնի նման թարխուն, սուր լայմ և զով վերջաճաշակ։' } },
  { slug: 'rose-petal-jam', c: '#f07aa0', shell: '#e9688f', core: '#ffc2d6', tags: { fruity: 1, nutty: 0, boozy: 0, floral: 3, intense: 0 },
    ing: ['rose', 'whitechoc', 'sugar', 'cream'], all: ['milk', 'soy'], pair: { brandy: 0, wine: 1, coffee: 0, tea: 2 }, best: 'green',
    en: { n: 'Rose Petal Jam', f: 'Rose-petal jam in white chocolate.', s: 'A spoonful from the good jar.', t: 'Soft, perfumed, sweet; like walking past a garden wall.' },
    ru: { n: 'Розовое варенье', f: 'Варенье из лепестков розы в белом шоколаде.', s: 'Ложка из той самой банки.', t: 'Нежный, ароматный и сладкий вкус, как прогулка вдоль садовой ограды.' },
    hy: { n: 'Վարդի մուրաբա', f: 'Վարդի թերթիկների մուրաբա սպիտակ շոկոլադում։', s: 'Գդալ այն լավ բանկայից։', t: 'Նուրբ, բուրավետ ու քաղցր՝ ինչպես այգու պատի կողքով անցնելը։' } },
  { slug: 'sea-buckthorn', c: '#ff9f1c', shell: '#f28f0e', core: '#ffd266', tags: { fruity: 3, nutty: 0, boozy: 0, floral: 0, intense: 2 },
    ing: ['seabuckthorn', 'vanilla', 'whitechoc', 'cream', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 0, wine: 2, coffee: 0, tea: 2 }, best: 'late',
    en: { n: 'Sea-buckthorn', f: 'Tart sea-buckthorn gel in vanilla ganache.', s: 'The sharp one. Everyone has a favourite.', t: 'Tart, almost tropical, calmed by vanilla.' },
    ru: { n: 'Облепиха', f: 'Кислый гель из облепихи в ванильном ганаше.', s: 'Самая дерзкая. У каждого свой любимчик.', t: 'Кислая, почти тропическая, смягчённая ванилью.' },
    hy: { n: 'Օբլեպիխա', f: 'Օբլեպիխայի թթվաշ գել վանիլային գանաշում։', s: 'Ամենասուրը։ Յուրաքանչյուրն ունի իր սիրելին։', t: 'Թթվաշ, գրեթե արևադարձային՝ վանիլով մեղմացված։' } },
  { slug: 'salted-caramel', c: '#c98a3c', shell: '#b87a2e', core: '#e9b66a', tags: { fruity: 0, nutty: 0, boozy: 0, floral: 0, intense: 1 },
    ing: ['caramel', 'butter', 'salt', 'milkchoc', 'cream'], all: ['milk', 'soy'], pair: { brandy: 1, wine: 0, coffee: 2, tea: 1 }, best: 'cezve',
    en: { n: 'Salted Caramel', f: 'Soft caramel with flaked salt in milk chocolate.', s: 'The classic, done properly.', t: 'Burnt sugar, butter, a crackle of salt.' },
    ru: { n: 'Солёная карамель', f: 'Мягкая карамель с хлопьями соли в молочном шоколаде.', s: 'Классика, сделанная как надо.', t: 'Жжёный сахар, масло и хруст соли.' },
    hy: { n: 'Աղի կարամել', f: 'Փափուկ կարամել աղի փաթիլներով՝ կաթնային շոկոլադում։', s: 'Դասականը՝ ինչպես հարկն է։', t: 'Այրված շաքար, կարագ և աղի թեթև խրթխրթոց։' } },
  { slug: 'hazelnut-gianduja', c: '#8a4b2a', shell: '#7a3f20', core: '#c58a5a', tags: { fruity: 0, nutty: 3, boozy: 0, floral: 0, intense: 1 },
    ing: ['hazelnut', 'milkchoc', 'cocoa', 'sugar'], all: ['milk', 'nuts', 'soy'], pair: { brandy: 1, wine: 0, coffee: 2, tea: 1 }, best: 'espresso',
    en: { n: 'Hazelnut Gianduja', f: 'Roasted-hazelnut gianduja, silky and thick.', s: 'Comfort in a shell.', t: 'Deep roasted hazelnut, velvety, long.' },
    ru: { n: 'Фундук-джандуйя', f: 'Джандуйя из обжаренного фундука, шелковистая и густая.', s: 'Уют в глазури.', t: 'Глубокий вкус обжаренного фундука, бархатистый и долгий.' },
    hy: { n: 'Ֆնդուկի ջանդույա', f: 'Բոված ֆնդուկի ջանդույա՝ մետաքսանման ու թանձր։', s: 'Հարմարավետություն թաղանթի մեջ։', t: 'Խորը բոված ֆնդուկ, թավշյա և երկար։' } },
  { slug: 'coffee-cardamom', c: '#5a3a2a', shell: '#4a2f22', core: '#8a6040', tags: { fruity: 0, nutty: 1, boozy: 0, floral: 1, intense: 3 },
    ing: ['coffee', 'cardamom', 'darkchoc', 'cream', 'butter'], all: ['milk', 'soy'], pair: { brandy: 2, wine: 0, coffee: 1, tea: 1 }, best: 'brandy5',
    en: { n: 'Coffee & Cardamom', f: 'Cezve-style coffee ganache with cardamom.', s: 'The morning pot, after dinner.', t: 'Dark roast and warm cardamom, with a clean bitter edge.' },
    ru: { n: 'Кофе и кардамон', f: 'Кофейный ганаш в стиле джезвы с кардамоном.', s: 'Утренняя джезва после ужина.', t: 'Тёмная обжарка и тёплый кардамон с чистой горчинкой.' },
    hy: { n: 'Սուրճ և հիլ', f: 'Ջեզվեով պատրաստված սուրճի գանաշ՝ հիլով։', s: 'Առավոտյան ջեզվեն՝ ընթրիքից հետո։', t: 'Մութ բովում, տաք հիլ և մաքուր դառնություն։' } },
  { slug: 'dark-70', c: '#2b1810', shell: '#2b1810', core: '#4a2a1a', tags: { fruity: 0, nutty: 0, boozy: 0, floral: 0, intense: 3 },
    ing: ['cocoa70', 'butter', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 2, wine: 2, coffee: 2, tea: 0 }, best: 'areni',
    en: { n: 'Dark 70%', f: 'Single-origin dark ganache (origin: sample).', s: 'For people who say they do not like sweets.', t: 'Red fruit, a woody edge, a long, dry finish.' },
    ru: { n: 'Тёмный 70%', f: 'Ганаш из тёмного шоколада одного происхождения (происхождение: образец).', s: 'Для тех, кто говорит, что не любит сладкое.', t: 'Красные ягоды, древесные ноты и долгое сухое послевкусие.' },
    hy: { n: 'Մուգ շոկոլադ 70%', f: 'Մեկ տարածաշրջանի կակաոյից մուգ գանաշ (ծագումը՝ նմուշ)։', s: 'Նրանց համար, ովքեր ասում են, թե քաղցրը չեն սիրում։', t: 'Կարմիր հատապտուղներ, փայտային երանգ և երկար չոր վերջաճաշակ։' } },
  { slug: 'pistachio', c: '#a8cf5a', shell: '#97c04a', core: '#cfe79a', tags: { fruity: 0, nutty: 3, boozy: 0, floral: 1, intense: 1 },
    ing: ['pistachio', 'whitechoc', 'sugar', 'butter'], all: ['milk', 'nuts', 'soy'], pair: { brandy: 0, wine: 1, coffee: 1, tea: 2 }, best: 'green',
    en: { n: 'Pistachio', f: 'Stone-ground pistachio praline.', s: 'Green, proud and a little smug.', t: 'Roasted, creamy, gently salty.' },
    ru: { n: 'Фисташка', f: 'Пралине из фисташек каменного помола.', s: 'Зелёная, гордая и слегка самодовольная.', t: 'Жареный, сливочный вкус с лёгкой солью.' },
    hy: { n: 'Պիստակ', f: 'Քարե ջրաղացով աղացած պիստակի պրալինե։', s: 'Կանաչ, հպարտ և մի քիչ սևեռուն։', t: 'Բոված, սերուցքային, թեթևակի աղի։' } },
  { slug: 'honey-walnut', c: '#d9a441', shell: '#c9922f', core: '#f1cc7a', tags: { fruity: 0, nutty: 2, boozy: 0, floral: 1, intense: 1 },
    ing: ['honey', 'walnut', 'caramel', 'milkchoc', 'goldleaf'], all: ['milk', 'nuts', 'soy'], pair: { brandy: 1, wine: 2, coffee: 1, tea: 2 }, best: 'late',
    en: { n: 'Mountain Honey & Walnut', f: 'Honey caramel and walnut, finished with gold dust.', s: 'The one for the top of the box.', t: 'Floral mountain honey and toasted walnut, with a hint of shimmer.' },
    ru: { n: 'Горный мёд и грецкий орех', f: 'Медовая карамель и грецкий орех, золотая пыль сверху.', s: 'Та самая, что ложится на верх коробки.', t: 'Цветочный горный мёд и жареный орех с лёгким мерцанием.' },
    hy: { n: 'Լեռնային մեղր և ընկույզ', f: 'Մեղրային կարամել և ընկույզ՝ ոսկե փոշով։', s: 'Այն, որ դրվում է տուփի վերևում։', t: 'Ծաղկային լեռնային մեղր և բոված ընկույզ՝ թեթև շողքով։' } },
  { slug: 'quince-cinnamon', c: '#c9b037', shell: '#b99f2b', core: '#e6d27a', tags: { fruity: 2, nutty: 0, boozy: 0, floral: 1, intense: 1 },
    ing: ['quince', 'cinnamon', 'milkchoc', 'sugar'], all: ['milk', 'soy'], pair: { brandy: 1, wine: 2, coffee: 1, tea: 2 }, best: 'black',
    en: { n: 'Quince & Cinnamon', f: 'Quince compote with cinnamon in milk chocolate.', s: 'Autumn, folded in.', t: 'Tender, honeyed quince with a warm cinnamon edge.' },
    ru: { n: 'Айва и корица', f: 'Компот из айвы с корицей в молочном шоколаде.', s: 'Осень, завёрнутая внутрь.', t: 'Нежная медовая айва с тёплой корицей.' },
    hy: { n: 'Սերկևիլ և դարչին', f: 'Սերկևիլի կոմպոտ դարչինով՝ կաթնային շոկոլադում։', s: 'Աշունը՝ ներսում փաթաթված։', t: 'Նուրբ, մեղրային սերկևիլ՝ տաք դարչինի երանգով։' } },
];

export const BY_SLUG = Object.fromEntries(BONBONS.map((b, i) => [b.slug, { ...b, i }]));

export const ING = {
  apricot: ['apricot', 'абрикос', 'ծիրան'], thyme: ['mountain thyme', 'горный чабрец', 'լեռնային ուրց'], whitechoc: ['white chocolate', 'белый шоколад', 'սպիտակ շոկոլադ'],
  milkchoc: ['milk chocolate', 'молочный шоколад', 'կաթնային շոկոլադ'], darkchoc: ['dark chocolate', 'тёмный шоколад', 'մուգ շոկոլադ'], cream: ['cream', 'сливки', 'սերուցք'],
  butter: ['butter', 'сливочное масло', 'կարագ'], sugar: ['sugar', 'сахар', 'շաքար'], pomegranate: ['pomegranate', 'гранат', 'նուռ'], mulberry: ['mulberry', 'тутовник', 'թութ'],
  walnut: ['walnut', 'грецкий орех', 'ընկույզ'], grapemust: ['grape must', 'виноградный сок (бекмез)', 'խաղողի ջուր (բեկմեզ)'], caramel: ['caramel', 'карамель', 'կարամել'],
  gata: ['gata (wheat flour, butter)', 'гата (пшеничная мука, масло)', 'գաթա (ցորենի ալյուր, կարագ)'], salt: ['sea salt', 'морская соль', 'ծովի աղ'], brandy: ['Armenian brandy', 'армянский коньяк', 'հայկական կոնյակ'],
  tarragon: ['tarragon', 'тархун', 'թարխուն'], lime: ['lime', 'лайм', 'լայմ'], rose: ['rose petals', 'лепестки розы', 'վարդի թերթիկներ'], seabuckthorn: ['sea-buckthorn', 'облепиха', 'օբլեպիխա'],
  vanilla: ['vanilla', 'ваниль', 'վանիլ'], hazelnut: ['hazelnut', 'фундук', 'ֆնդուկ'], cocoa: ['cocoa', 'какао', 'կակաո'], coffee: ['coffee', 'кофе', 'սուրճ'], cardamom: ['cardamom', 'кардамон', 'հիլ'],
  cocoa70: ['dark chocolate 70%', 'тёмный шоколад 70%', 'մուգ շոկոլադ 70%'], pistachio: ['pistachio', 'фисташка', 'պիստակ'], honey: ['mountain honey', 'горный мёд', 'լեռնային մեղր'],
  goldleaf: ['edible gold dust', 'съедобная золотая пыль', 'ուտելի ոսկե փոշի'], quince: ['quince', 'айва', 'սերկևիլ'], cinnamon: ['cinnamon', 'корица', 'դարչին'],
};
export const ALLERGEN = { milk: ['milk', 'молоко', 'կաթ'], nuts: ['tree nuts', 'орехи', 'ընկույզ'], gluten: ['gluten', 'глютен', 'գլյուտեն'], soy: ['soy (lecithin)', 'соя (лецитин)', 'սոյա (լեցիտին)'], alcohol: ['alcohol', 'алкоголь', 'ալկոհոլ'] };
export const DRINK = {
  brandy5: ['5-year Armenian brandy', 'армянский коньяк 5 лет', '5 տարեկան հայկական կոնյակ', 'brandy'],
  areni: ['Areni red', 'красное Арени', 'Արենի կարմիր գինի', 'wine'], voskehat: ['Voskehat white', 'белое Воскеат', 'Ոսկեհատ սպիտակ գինի', 'wine'],
  late: ['late-harvest dessert wine', 'десертное вино позднего сбора', 'ուշ բերքահավաքի աղանդերային գինի', 'wine'],
  cezve: ['cezve coffee, medium sweet', 'кофе из джезвы, средней сладости', 'ջեզվեով սուրճ, միջին քաղցր', 'coffee'], espresso: ['espresso', 'эспрессо', 'էսպրեսո', 'coffee'],
  mtea: ['mountain-herb tea', 'горный травяной чай', 'լեռնային խոտաբույսերի թեյ', 'tea'], green: ['jasmine green tea', 'зелёный чай с жасмином', 'հասմիկով կանաչ թեյ', 'tea'],
  black: ['black tea with orange peel', 'чёрный чай с апельсиновой коркой', 'սև թեյ նարնջի կճեպով', 'tea'],
};

// Sample prices in AMD. Larger boxes cost less per bonbon (the "bigger box" lever).
export const SIZES = [4, 9, 16, 25];
export const PRICE = { 4: 4800, 9: 10200, 16: 17600, 25: 26500 };
export const RIBBONS = [
  { id: 'pom', c: '#c4163a', n: ['Pomegranate', 'Гранат', 'Նուռ'] }, { id: 'gold', c: '#d9a441', n: ['Gold', 'Золото', 'Ոսկի'] },
  { id: 'rose', c: '#f07aa0', n: ['Rose', 'Роза', 'Վարդ'] }, { id: 'pist', c: '#8fb84a', n: ['Pistachio', 'Фисташка', 'Պիստակ'] },
  { id: 'cream', c: '#fff3e0', n: ['Cream', 'Сливки', 'Սերուցք'] }, { id: 'mul', c: '#8e3a7e', n: ['Mulberry', 'Тутовник', 'Թութ'] },
];
// Sample FX: AMD per 1 unit of currency
export const FX = { AMD: 1, USD: 390, EUR: 425, RUB: 4.4 };

// Occasion boxes: ready presets that load into the builder
export const OCCASIONS = [
  { id: 'newyear', c: '#c4163a', size: 16, ribbon: 'gold', items: ['pomegranate-ganache', 'honey-walnut', 'brandy-truffle', 'sujukh-praline', 'gata-caramel', 'quince-cinnamon', 'coffee-cardamom', 'dark-70', 'salted-caramel', 'hazelnut-gianduja', 'pistachio', 'mulberry', 'pomegranate-ganache', 'honey-walnut', 'sujukh-praline', 'gata-caramel'],
    en: ['New Year', 'Gold, pomegranate and brandy: the box for the table and the toast.'], ru: ['Новый год', 'Золото, гранат и коньяк: коробка для стола и тоста.'], hy: ['Ամանոր', 'Ոսկի, նուռ և կոնյակ․ տուփ սեղանի և կենացի համար։'] },
  { id: 'valentine', c: '#f07aa0', size: 9, ribbon: 'pom', items: ['rose-petal-jam', 'pomegranate-ganache', 'mulberry', 'rose-petal-jam', 'dark-70', 'pomegranate-ganache', 'sea-buckthorn', 'pistachio', 'rose-petal-jam'],
    en: ['Valentine’s Day', 'Rose, ruby and a little dark chocolate to say what you mean.'], ru: ['День святого Валентина', 'Роза, рубин и немного тёмного шоколада, чтобы сказать главное.'], hy: ['Սուրբ Վալենտինի օր', 'Վարդ, ռուբին և մի քիչ մուգ շոկոլադ՝ ասելու ինչ պետք է։'] },
  { id: 'march8', c: '#ffb347', size: 9, ribbon: 'rose', items: ['apricot-thyme', 'rose-petal-jam', 'tarragon-lime', 'honey-walnut', 'pistachio', 'sea-buckthorn', 'apricot-thyme', 'rose-petal-jam', 'quince-cinnamon'],
    en: ['March 8', 'Spring colours: apricot, rose and green. Flowers on the side.'], ru: ['8 Марта', 'Весенние цвета: абрикос, роза и зелень. Цветы отдельно.'], hy: ['Մարտի 8', 'Գարնանային գույներ՝ ծիրան, վարդ և կանաչ։ Ծաղիկները՝ առանձին։'] },
  { id: 'wedding', c: '#e0a93a', size: 25, ribbon: 'cream', items: ['honey-walnut', 'rose-petal-jam', 'pistachio', 'apricot-thyme', 'honey-walnut', 'rose-petal-jam', 'pistachio', 'apricot-thyme', 'honey-walnut', 'rose-petal-jam', 'pistachio', 'apricot-thyme', 'honey-walnut', 'rose-petal-jam', 'pistachio', 'apricot-thyme', 'honey-walnut', 'rose-petal-jam', 'pistachio', 'apricot-thyme', 'honey-walnut', 'rose-petal-jam', 'pistachio', 'apricot-thyme', 'honey-walnut'],
    en: ['Weddings & christenings', 'Gold and cream favours, in 4-piece boxes for every guest (from 30 boxes).'], ru: ['Свадьбы и крестины', 'Бонбоньерки в золоте и сливочном цвете для каждого гостя (от 30 коробок).'], hy: ['Հարսանիք և մկրտություն', 'Ոսկե և սերուցքագույն հուշանվերներ յուրաքանչյուր հյուրի համար (30 տուփից)։'] },
  { id: 'birthday', c: '#ff8a2b', size: 16, ribbon: 'pist', items: ['apricot-thyme', 'tarragon-lime', 'salted-caramel', 'sea-buckthorn', 'hazelnut-gianduja', 'mulberry', 'pistachio', 'gata-caramel', 'rose-petal-jam', 'coffee-cardamom', 'quince-cinnamon', 'pomegranate-ganache', 'honey-walnut', 'dark-70', 'apricot-thyme', 'sea-buckthorn'],
    en: ['Birthdays', 'One of everything fun. Add a card and we write it by hand.'], ru: ['Дни рождения', 'Всего по чуть-чуть. Добавьте открытку, и мы напишем её от руки.'], hy: ['Ծննդյան օր', 'Ամեն ինչից՝ մի քիչ։ Ավելացրեք բացիկ, և մենք այն ձեռքով կգրենք։'] },
];

export const SAMPLE_SESSIONS = [
  { dow: 6, slots: ['11:00', '15:00'], seats: 8 },
  { dow: 3, slots: ['18:30'], seats: 6 },
];
