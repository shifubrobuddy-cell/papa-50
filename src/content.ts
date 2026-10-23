export interface TimelineItem {
  year: string;
  title: string;
  location?: string;
  description: string;
  descriptionUrdu?: string;
  photo?: string;
  photoAlt?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  captionUrdu?: string;
  dateOrTag: string;
  rotation: number;
}

export interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
  color?: string;
}

export const birthdayContent = {
  // Personal Details
  fatherName: "Mustafa",
  fatherNickname: "Abu-g",
  sonName: "Mohammad Tameem Mustafa",
  birthDate: "1976-10-23T00:00:00",
  milestoneAge: 50,
  
  // Music Configuration
  music: {
    title: "Best of KK Mashup (Bollywood Evergreen)",
    src: "/music/song.mp3",
    fallbackSrc: "/assets/aistudio/Best_of_KK___Nonstop_Mashup_2026___Hit_Songs_Collection___Bollywood_Evergreen_Hits___The_Prince_87c36611.mp3",
  },

  // Hero Section
  hero: {
    badge: "GOLDEN JUBILEE • 1976 — 2026",
    title: "Happy 50th Birthday,",
    subtitle: "Born 1976 • Still the strongest, kindest pillar of our lives",
    subtitleUrdu: "1976 mein shuru hui yeh dastaan • Hamari zindagi ka sabse mazboot sahara",
    heroPhoto: "/photos/photo-now.jpg",
    heroPhotoFallback: "/assets/aistudio/image_1124e117.png",
  },

  // Then & Now Comparison
  thenAndNow: {
    title: "50 Years of Grace",
    subtitle: "Same gentle smile. Countless sacrifices. An unmatched legacy.",
    youngPhoto: "/photos/photo-young.jpg",
    youngPhotoFallback: "/assets/aistudio/image_fe619735.png",
    youngLabel: "With Little Tameem",
    youngYear: "The Early Years",
    nowPhoto: "/photos/photo-now.jpg",
    nowPhotoFallback: "/assets/aistudio/image_1124e117.png",
    nowLabel: "50 Years Strong",
    nowYear: "Today (2026)",
    caption: "Same smile. Different chapter. The heart that sheltered us all.",
    captionUrdu: "Wahi shafqat bhari muskaan, wahi hifazat karne wala dil.",
  },

  // Journey Timeline (1976 -> 2026)
  timeline: [
    {
      year: "1976",
      title: "The Golden Beginning",
      location: "23 October 1976",
      description: "A kind soul was born into this world. Destined to become a protector, a provider, and the anchor of a blessed family.",
      descriptionUrdu: "23 October 1976 ko ek azeem shaksiyat ne janam liya — jo aage chal kar hamara sabse bada sahara bane.",
      photo: "/photos/photo-young.jpg",
      photoAlt: "Early years with young Tameem in Abu-g's arms",
    },
    {
      year: "Journey to Abha",
      title: "Stepping into the Desert",
      location: "Abha, Saudi Arabia",
      description: "Leaving the comfort of home behind, Abu-g stepped onto unfamiliar lands in Abha to build a dignified life and secure future for all of us.",
      descriptionUrdu: "Apna aaraam chhod kar Abha ki sar-zameen par qadam rakha, taake hamara mustaqbil roshan ho sake.",
      photo: "/photos/family-8.jpg",
      photoAlt: "Abu-g at festive gathering standing tall",
    },
    {
      year: "Dammam & Khobar",
      title: "Endless Hard Work & Quiet Strength",
      location: "Eastern Province (Dammam → Khobar)",
      description: "Working tirelessly day and night across Dammam and Khobar. No matter how tough work was, he never brought worry home — only warmth, safety, and encouragement.",
      descriptionUrdu: "Dammam aur Khobar mein din raat mehnat ki. Kabhi kisi cheez ki kami mehsoos nahi hone di, bas har haal mein hamiin sambhala.",
      photo: "/photos/family-5.jpg",
      photoAlt: "Abu-g standing strong with calmness and dignity",
    },
    {
      year: "Late Night on the Scooty",
      title: "Cold Hands, Warm Heart",
      location: "Returning from Ilyas & Isteyak's Shadi",
      description: "Late at night, the winter wind was freezing cold. Abu-g's hands and wrists were numbed by the bitter chill, yet he took the full force of the wind just to shield me from the cold. In that moment, I knew I never needed any other friend in this world.",
      descriptionUrdu: "Ilyas aur Isteyak ki shadi se wapsi par late night scooty par wo thandi hawayen... Abu-g ke haath aur kalai thand se jam rahe the par unhone mujhe bacha kar rakha. Mujhe mehsoos hua ke jab aise Abu hain toh mujhe kisi aur dost ki zaroorat hi nahi.",
      photo: "/photos/childhood-with-dad.jpg",
      photoAlt: "Abu-g protecting his son Tameem",
    },
    {
      year: "Riyadh & New Heights",
      title: "The Pillar of Our World",
      location: "Riyadh, Saudi Arabia",
      description: "From Abha to Dammam, Khobar, and now Riyadh — his steadfast guidance and silent sacrifices laid every brick of the foundation I stand upon today.",
      descriptionUrdu: "Abha se Dammam, Khobar aur phir Riyadh tak — aaj main jahan bhi khada hoon, sab unki qurbaniyon aur duao ka nateeja hai.",
      photo: "/photos/family-7.jpg",
      photoAlt: "Sultan Palace with family — proud father with his children",
    },
    {
      year: "2026",
      title: "50 Golden Years (Golden Jubilee)",
      location: "Today",
      description: "Half a century of goodness, humility, honor, and unending love. Today, we celebrate not just 50 years of a man, but 50 years of a superhero.",
      descriptionUrdu: "Pachaas saal ki shafqat, sabr aur be-laus mohabbat. Happy 50th Birthday to the greatest father on earth!",
      photo: "/photos/family-1.jpg",
      photoAlt: "Abu-g's joyful Golden Jubilee celebration smile",
    },
  ] as TimelineItem[],

  // Family Gallery (All 10 Real Family Photos)
  gallery: [
    {
      id: "photo-young-dad",
      src: "/photos/childhood-with-dad.jpg",
      alt: "Abu-g holding little Tameem in his arms",
      caption: "In your arms, I learned what true safety and love feels like.",
      captionUrdu: "Aapki baahon mein maine hifazat aur be-panaah mohabbat ka matlab seekha.",
      dateOrTag: "Childhood Memory",
      rotation: -3,
    },
    {
      id: "photo-birthday-cap",
      src: "/photos/family-1.jpg",
      alt: "Abu-g wearing celebration birthday cap with a gentle smile",
      caption: "The birthday boy! May this bright smile never leave your face.",
      captionUrdu: "Hamare pyare Abu-g! Allah aapki muskaan ko hamesha barkaraar rakhe.",
      dateOrTag: "Celebration",
      rotation: 2,
    },
    {
      id: "photo-sultan-palace",
      src: "/photos/family-7.jpg",
      alt: "Abu-g with daughter and son at Sultan Palace wedding",
      caption: "Sultan Palace Wedding — Surrounded by the children he raised with love.",
      captionUrdu: "Sultan Palace mein bachon ke sath — ek baap ka asal sarmaya.",
      dateOrTag: "Family Wedding",
      rotation: -2,
    },
    {
      id: "photo-shadi-canopy",
      src: "/photos/family-8.jpg",
      alt: "Abu-g in sunglasses and white shirt under yellow celebration canopy",
      caption: "Dressed with timeless grace and quiet confidence.",
      captionUrdu: "Hamare dashing Abu-g! Hamesha shandaar aur pur-waqar.",
      dateOrTag: "Wedding Celebrations",
      rotation: 3,
    },
    {
      id: "photo-relaxing-sofa",
      src: "/photos/family-9.jpg",
      alt: "Abu-g relaxing with a warm peaceful smile on the blue sofa",
      caption: "The peaceful warmth of home in your gentle smile.",
      captionUrdu: "Ghar ka sukoon, aapki muskaan mein basne wali rehmat.",
      dateOrTag: "Home & Peace",
      rotation: -1,
    },
    {
      id: "photo-mom-dad-selfie",
      src: "/photos/family-2.jpg",
      alt: "Abu-g and Ammi smiling together",
      caption: "Two souls who built our whole world with their hands.",
      captionUrdu: "Wo do hastiyan jinhone hamare aashiyane ko jannat banaya.",
      dateOrTag: "Companionship",
      rotation: 2,
    },
    {
      id: "photo-mom-dad-home",
      src: "/photos/family-3.jpg",
      alt: "Abu-g and Ammi at home in blue and white",
      caption: "Our true home has always been wherever you both are.",
      captionUrdu: "Ghar wahan hota hai jahan aap dono ka saaya ho.",
      dateOrTag: "Together Always",
      rotation: -2,
    },
    {
      id: "photo-eid-traditional",
      src: "/photos/family-4.jpg",
      alt: "Abu-g and Ammi in white traditional festive wear",
      caption: "Grace, dignity, and elegance — dressed in pure blessings.",
      captionUrdu: "Paak aur khush-haal lamhat, duaon se bhari zindagi.",
      dateOrTag: "Festive Blessings",
      rotation: 2,
    },
    {
      id: "photo-dad-standing",
      src: "/photos/family-5.jpg",
      alt: "Abu-g standing tall with calmness and dignity",
      caption: "My eternal role model. Quiet strength in every stride.",
      captionUrdu: "Mere ideal, meri taqat, meri pehchaan.",
      dateOrTag: "Quiet Strength",
      rotation: -3,
    },
    {
      id: "photo-son-tameem",
      src: "/photos/family-6.jpg",
      alt: "Mohammad Tameem Mustafa standing by the fountains",
      caption: "Whatever I am standing as today, it is all because of you, Abu-g.",
      captionUrdu: "Aaj main jahan bhi hoon, sab aapke dam qadam se hai.",
      dateOrTag: "Your Son, Tameem",
      rotation: 1,
    },
  ] as GalleryPhoto[],

  // Son's Letter (Detailed, Realistic, Deeply Emotional)
  myLetter: {
    salutation: "Dearest Abu-g,",
    salutationUrdu: "Pyaare Abu-g,",
    bodyEnglish: `Today you turn 50, and as I sit down to write this, words feel too small to hold everything you mean to me.

Throughout my life, from the days you traveled from Abha to Dammam, to Khobar, and then to Riyadh, you gave every drop of your energy, your youth, and your peace so that our family could flourish. You never once complained, and you never let us feel the weight of the struggles you were carrying on your shoulders.

I will never forget that cold winter night when we were riding home on the scooty from Ilyas and Isteyak's shadi. The freezing wind was piercing, and your hands and wrists were completely icy and numb. Yet you stood firm, shielding me with your back so that not a single gust of bitter wind touched me. Sitting behind you that night, wrapped in your protection, I felt the purest happiness. I thought to myself: when Allah has blessed me with a father like him, I don't ever need anyone else in this world. You were my friend, my guardian, and my entire world.

I know I haven't always been perfect. I know there were times I made mistakes, times I tested your patience, and times I upset you. But you never abandoned me. You held my hand with greater firmness, guided me with gentle wisdom, and believed in me when I couldn't even believe in myself.

Whatever I am today, wherever I stand, and every success I ever achieve belongs entirely to your sacrifices and your prayers. I have never said these words out loud enough, but today from the bottom of my heart: I love you more than life itself, Abu-g. You are my superhero, my pride, and my everything.

Happy 50th Birthday, Papa. May Allah bless you with a long, healthy, joyful life filled with peace and contentment.`,
    
    bodyUrdu: `Aaj aap 50 saal ke ho gaye hain, aur yeh khat likhte waqt alfaz kam pad rahe hain ke main aapki shafqat aur ehsaanaat ka shukriya kaise ada karoon.

Aapka wo safar — Abha se Dammam, Khobar aur phir Riyadh tak — aapne apni jawani, apni khushiyan aur apna aaraam hum par nichawar kar diya. Aapne humein har cheez faraham ki aur kabhi mehsoos nahi hone diya ke aap parde ke peeche kitni dushwariyan jhel rahe the.

Mujhe wo raat hamesha yaad rahegi jab hum Ilyas aur Isteyak ki shadi se late night scooty par laut rahe the. Bahar kitni sakht thand thi... aapke haath aur kalai thand se bilkul jam chuke the, lekin aap aage dhaal ban kar baithe rahe taake thand mujhe na lage. Us waqt aapke peeche baith kar mujhe itna sukoon tha ke maine socha — jab mere paas aise Abu hain, toh mujhe duniya ke kisi dost ki zaroorat hi nahi.

Yaqeenan maine apni nadaniyon se aapka dil dukhaya hoga, ghalatiyan ki hongi, lekin aapne kabhi mera haath nahi chhoda. Hamesha sambhala, rasta dikhaya aur duao se nawaza.

Aaj main jahan bhi khada hoon, sab aapki qurbaniyon ki badaulat hai. Maine shayad kabhi zubaan se itna khul kar nahi kaha, lekin aaj kehna chahta hoon: Abu-g, aap mere sab kuch hain. Main aapse be-inteha mohabbat karta hoon.

Happy 50th Birthday, Abu-g! Allah Ta'ala aapko sehat, lambi umar aur dhero khushiyan ata farmaye.`,
    
    signOff: "With eternal love and gratitude,",
    signOffUrdu: "Aapka hamesha shukr-guzaar beta,",
    signature: "Mohammad Tameem Mustafa",
  },

  // 50 Reasons I Love You (Card Flip Grid)
  fiftyReasons: [
    { num: 1, title: "Your Endless Sacrifices", text: "Leaving home and moving to Abha, Dammam, Khobar, and Riyadh to build our future." },
    { num: 2, title: "The Freezing Scooty Ride", text: "How your hands and wrists froze in the bitter cold just to shield me from the wind after Ilyas & Isteyak's shadi." },
    { num: 3, title: "Unconditional Provider", text: "You gave us everything we ever wished for, even before we asked." },
    { num: 4, title: "Never Abandoning Me", text: "No matter how many mistakes I made, you stood by me and guided me back on track." },
    { num: 5, title: "You Are My Best Friend", text: "With a father like you, I never felt the need for anyone else." },
    { num: 6, title: "Silent Strength", text: "You carried heavy burdens with a calm smile so we wouldn't worry." },
    { num: 7, title: "Your Radiant Smile", text: "That warm, reassuring smile that makes every fear disappear." },
    { num: 8, title: "Never Complaining", text: "Working long hours without a single whisper of self-pity." },
    { num: 9, title: "Your Gentle Guidance", text: "Teaching me right from wrong through patience rather than anger." },
    { num: 10, title: "Protecting Our Dignity", text: "Always ensuring our family held our heads high everywhere." },
    { num: 11, title: "The Hardest Worker", text: "Setting the gold standard of discipline and commitment for me." },
    { num: 12, title: "Your Forgiving Heart", text: "Always wiping the slate clean whenever I faltered." },
    { num: 13, title: "Believing In My Dreams", text: "Backing my ambitions when the world doubted." },
    { num: 14, title: "Your Generous Soul", text: "Helping others in secret without boasting or pride." },
    { num: 15, title: "The Pillar of Our Home", text: "Keeping our whole family united and grounded in values." },
    { num: 16, title: "The Warmth in Your Voice", text: "Every phone call starts with genuine care for how I am doing." },
    { num: 17, title: "Honesty Above All", text: "Living with pure integrity and earning every single penny with halal dignity." },
    { num: 18, title: "Putting Us Before Yourself", text: "Buying what we needed even when you needed things for yourself." },
    { num: 19, title: "Patience in Adversity", text: "Showing me how a real man responds when life gets difficult." },
    { num: 20, title: "Your Unspoken Prayers", text: "Knowing that your quiet tahajjud and dua are what keep me safe." },
    { num: 21, title: "The Best Husband to Ammi", text: "Showing me how to honor and respect a life partner with gentleness." },
    { num: 22, title: "Humility", text: "Never showing arrogance despite achieving so much across decades." },
    { num: 23, title: "The Safe Harbor", text: "No storm outside feels dangerous as long as I know you are in my corner." },
    { num: 24, title: "Teaching Me Respect", text: "Leading by example in how you speak to elders, family, and strangers." },
    { num: 25, title: "Holding My Hand as a Child", text: "Guiding my tiny footsteps until I could walk on my own." },
    { num: 26, title: "Listening Without Judging", text: "Letting me speak my heart out whenever I felt lost." },
    { num: 27, title: "Your Wisdom", text: "One sentence of advice from you untangles weeks of confusion." },
    { num: 28, title: "Celebrating My Small Wins", text: "The pride in your eyes whenever I achieved even a modest milestone." },
    { num: 29, title: "Never Doubting Me", text: "Giving me the confidence to face the world." },
    { num: 30, title: "Selfless Love", text: "A love that asks for nothing in return and gives everything." },
    { num: 31, title: "Enduring the Heat and Cold", text: "Braving Saudi Arabia's harshest summers and winters for our comfort." },
    { num: 32, title: "Your Laugh", text: "The heartwarming sound that brightens any room instantly." },
    { num: 33, title: "Keeping Promises", text: "Your word was always as solid as stone." },
    { num: 34, title: "The Way You Defended Me", text: "Standing up for me like an unshakable wall whenever I was vulnerable." },
    { num: 35, title: "Instilling Faith", text: "Reminding me that Allah is always with those who are patient and truthful." },
    { num: 36, title: "Your Pure Heart", text: "Free of malice, jealousy, or bitterness towards anyone." },
    { num: 37, title: "Our Childhood Memories", text: "The simple car rides, shared snacks, and moments of laughter." },
    { num: 38, title: "Your Unyielding Work Ethic", text: "Waking up before sunrise year after year without taking shortcuts." },
    { num: 39, title: "Teaching Me to Be a Man", text: "Showing me that real strength is found in kindness and responsibility." },
    { num: 40, title: "Your Quiet Tears", text: "The tears you hid so that we would only ever see your bravery." },
    { num: 41, title: "Welcoming Everyone", text: "Making our home a sanctuary of hospitality for guests and relatives." },
    { num: 42, title: "Your Calming Presence", text: "Just seeing you sitting in the living room brings an unmatched peace." },
    { num: 43, title: "Standing Tall at 50", text: "Carrying 50 years of honor and grace on your shoulders." },
    { num: 44, title: "Giving Me Your Name", text: "I wear 'Mohammad Tameem Mustafa' as the greatest badge of honor." },
    { num: 45, title: "Never Giving Up on Me", text: "Even when I disappointed you, your belief in my redemption never wavered." },
    { num: 46, title: "Your Modesty", text: "Never boasting about the sacrifices you made for our education and future." },
    { num: 47, title: "The Best Companion", text: "Enjoying the little things — a hot cup of chai, good food, and peaceful talk." },
    { num: 48, title: "Your Love for Family", text: "Always striving to keep relatives connected and cherished." },
    { num: 49, title: "Making Me Proud Every Day", text: "Whenever someone hears I am Mustafa's son, they speak of you with pure respect." },
    { num: 50, title: "You Are My Everything", text: "I have no words left, Abu-g — you are simply the greatest blessing of my existence." },
  ],

  // Dua Card
  dua: {
    enabled: true,
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    reference: "Surah Al-Isra (17:24)",
    transliteration: "Rabbir-hamhuma kama rabbayani sagheera",
    translationEnglish: "My Lord, bestow Your mercy upon my parents, as they cherished and raised me when I was small.",
    translationUrdu: "Aye mere Rab! Mere walidain par raham farma, jis tarah unhone bachpan mein meri parwarish ki.",
    personalDua: "May Allah grant Abu-g vibrant health, endless barakah in every breath, protection from all harm, and the highest ranks of Jannah. Ameen.",
  },

  // Initial Family Wishes for the Wish Wall
  defaultWishes: [
    {
      id: "wish-1",
      name: "Mohammad Tameem Mustafa",
      relation: "Son",
      message: "Abu-g, you are my real-life superhero. Thank you for protecting me on that cold scooty ride and throughout my entire life. Happy 50th Golden Jubilee!",
      timestamp: "Today",
      color: "gold",
    },
    {
      id: "wish-2",
      name: "Ammi",
      relation: "Wife",
      message: "Happy 50th Birthday to my companion of a lifetime. May Allah grant you health, peace, and lifelong happiness.",
      timestamp: "Today",
      color: "rose",
    },
    {
      id: "wish-3",
      name: "Family in Riyadh & India",
      relation: "Loving Family",
      message: "Congratulations on reaching your Golden Jubilee! Your kindness and support have touched every one of us.",
      timestamp: "Today",
      color: "amber",
    },
  ] as Wish[],
};
