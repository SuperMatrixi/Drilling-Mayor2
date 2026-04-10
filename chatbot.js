/* ══════════════════════════════════════════════════════
   CHATBOT AzA – Dschang 2026 – Opération Ville Propre
   chatbot.js  –  v3.0
   Languages: FR · EN · YEMBA
   Voice: Web Speech API (female, African-accent preference)
   FAQ: 40 questions trilingual
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── STATE ── */
  let opened = false;
  let azaLang = localStorage.getItem('azaLang') || localStorage.getItem('lang') || 'fr';
  let voiceEnabled = false;
  let synth = window.speechSynthesis;
  let voices = [];

  const win     = document.getElementById('AzA-window');
  const trigger = document.getElementById('AzA-trigger');
  const badge   = document.getElementById('AzA-badge');
  const msgs    = document.getElementById('mb-messages');
  const input   = document.getElementById('mb-input');
  const send    = document.getElementById('mb-send');

  /* ── LOAD VOICES ── */
  function loadVoices() {
    voices = synth.getVoices();
  }
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
  loadVoices();

  /* ── PICK BEST VOICE ── */
  function pickVoice(lang) {
    if (!voices.length) voices = synth.getVoices();
    const langCode = lang === 'en' ? 'en' : 'fr';
    // Prefer female African / French African voices
    const preferred = ['Google français', 'Microsoft Hortense', 'Amelie', 'Thomas',
                       'Google US English', 'Samantha', 'Karen'];
    let v = voices.find(v => v.lang.startsWith(langCode) && /female|woman|féminin/i.test(v.name));
    if (!v) v = voices.find(v => v.lang.startsWith(langCode));
    if (!v) v = voices.find(v => v.lang.startsWith('fr'));
    return v || null;
  }

  /* ── SPEAK ── */
  function speak(text) {
    if (!voiceEnabled || !synth) return;
    synth.cancel();
    const clean = text.replace(/<[^>]+>/g, '').replace(/[🧹💧🌟🤝🌱✅⚠️💬📅🏆🌤️🌿💪🏛️🎓]/g, '');
    const utt = new SpeechSynthesisUtterance(clean);
    utt.rate  = 1.05;
    utt.pitch = 1.1;
    utt.volume = 0.95;
    const v = pickVoice(azaLang);
    if (v) utt.voice = v;
    utt.lang = azaLang === 'en' ? 'en-US' : 'fr-FR';
    synth.speak(utt);
  }

  /* ══════════════════════════════════════════════════
     40 FAQ – TRILINGUAL: FR · EN · YEMBA
  ══════════════════════════════════════════════════ */
  const FAQ = [

    /* ── CATÉGORIE A: Opération Ville Propre ── */
    {
      q: /ville propre|clean city|opération|propreté|assainissement|nettoyage|Dschang propre|opération ville|ville propre/i,
      fr: "🧹 L'<strong>Opération Ville Propre</strong> est notre action phare ! Chaque dimanche, des équipes citoyennes coordonnées par le MRC nettoient les quartiers de Dschang – ramassage des déchets, désherbage, peinture des trottoirs. Rejoignez-nous ! 📅",
      en: "🧹 <strong>Clean City Operation</strong> is our flagship action! Every Sunday, citizen teams coordinated by the MRC clean Dschang's neighbourhoods – waste collection, weeding, pavement painting. Join us! 📅",
      yb: "🧹 Opération Ville Propre – Efʉ' ŋkwa (dimanche), alεt atseŋεŋ̄gyā MRC á gɔ nzhɛ́ Dschang. Mbū é gɔ ntswaŋ tswaŋ ! Leso'ne !"
    },
    {
      q: /quand.*(prochaine|prochain|suivante|next).*(opération|ville propre|clean city|nettoyage)/i,
      fr: "📅 La prochaine <strong>Opération Ville Propre</strong> est prévue le <strong>dimanche prochain</strong>. Rejoignez notre groupe WhatsApp pour recevoir les annonces en temps réel !",
      en: "📅 The next <strong>Clean City Operation</strong> is planned for <strong>next Sunday</strong>. Join our WhatsApp group to receive real-time announcements!",
      yb: "📅 Opération Ville Propre – Efʉ' ŋkwa lā'. Leso'ne WhatsApp mefuŋte njhʉ̄ !"
    },
    {
      q: /comment.*(participer|rejoindre|particip|join|volunteer|bénévol)/i,
      fr: "🤝 Pour participer : remplissez le formulaire <strong>WhatsApp</strong> en bas de page, ou contactez-nous directement. Tout le monde est bienvenu – jeunes, seniors, associations !",
      en: "🤝 To participate: fill in the <strong>WhatsApp</strong> form at the bottom of the page, or contact us directly. Everyone is welcome – youth, seniors, associations!",
      yb: "🤝 Leso'ne : Leshūŋ formulaire WhatsApp leziŋ ŋ̄gyā. Ŋkwa mbū – mɔ́ pɔ́ efɔ – leso'ne !"
    },
    {
      q: /pourquoi.*(ville propre|propreté|nettoyage)|why.*(clean|cleanliness)/i,
      fr: "🌿 Dschang mérite une ville propre et digne ! La propreté améliore la santé publique, attire les investisseurs et renforce la fierté citoyenne. Comme dit le proverbe Yemba : <em>Ŋiŋ a phiɛ athʉ́, á ejhʉ́ ntá</em> – plante l'arbre aujourd'hui, mange les fruits demain.",
      en: "🌿 Dschang deserves a clean, dignified city! Cleanliness improves public health, attracts investors and strengthens civic pride. As the Yemba proverb says: <em>Ŋiŋ a phiɛ athʉ́, á ejhʉ́ ntá</em> – plant the tree today, eat the fruit tomorrow.",
      yb: "🌿 Dschang á ejhʉ́ ntá tɛ' ! Ŋiŋ a phiɛ athʉ́, á ejhʉ́ ntá – leshūŋ nzhɛ́ ŋ̄gyā ŋkwa."
    },
    {
      q: /résultat|bilan|impact|result|achievement/i,
      fr: "✅ Depuis janvier 2026 : <strong>12 quartiers</strong> nettoyés, <strong>500+ bénévoles</strong> mobilisés, <strong>8 tonnes</strong> de déchets collectés. Dschang se transforme ! 💪",
      en: "✅ Since January 2026: <strong>12 neighbourhoods</strong> cleaned, <strong>500+ volunteers</strong> mobilised, <strong>8 tonnes</strong> of waste collected. Dschang is transforming! 💪",
      yb: "✅ Jan 2026 : quartiers 12 á gɔ ŋkwa, mbū 500+ leso'ne, déchets 8 tonnes. Dschang á ndʉʼɛ́ !"
    },

    /* ── CATÉGORIE B: 100 Forages ── */
    {
      q: /100 forages?|cent forages?|100 puits|100 wells|eau potable|water wells/i,
      fr: "💧 Le programme <strong>100 Forages</strong> est notre engagement central : 100 puits d'eau potable répartis en 3 phases sur tout Dschang, équipés de pompes solaires et gérés par des coopératives locales. Accès à l'eau 24h/24 pour tous !",
      en: "💧 The <strong>100 Wells</strong> program is our central commitment: 100 drinking water wells in 3 phases across Dschang, equipped with solar pumps and managed by local cooperatives. 24/7 water access for all!",
      yb: "💧 Programme 100 Forages – meŋ ŋkwa Dschang. Phases 3 – meŋ ŋkāŋ ŋkwa efʉ' ŋkwa !"
    },
    {
      q: /phase [123]|phase 1|phase 2|phase 3/i,
      fr: "📋 <strong>Phase 1</strong> (An 1) : 25 forages dans les quartiers prioritaires.<br><strong>Phase 2</strong> (An 2) : 40 forages en zones péri-urbaines.<br><strong>Phase 3</strong> (An 3) : 35 forages dans les villages ruraux.",
      en: "📋 <strong>Phase 1</strong> (Year 1): 25 wells in priority neighbourhoods.<br><strong>Phase 2</strong> (Year 2): 40 wells in peri-urban zones.<br><strong>Phase 3</strong> (Year 3): 35 wells in rural villages.",
      yb: "📋 Phase 1 : forages 25 – mefɔ ŋkwa. Phase 2 : 40. Phase 3 : 35 meŋgyā."
    },
    {
      q: /financement|finance|budget|cost|coût|payer|argent|FCFA|money/i,
      fr: "💰 Le programme est financé par un <strong>partenariat public-privé</strong>. Budget estimé : <strong>500 millions FCFA</strong> sur 3 ans, avec l'appui de la diaspora, des ONG et des collectivités locales.",
      en: "💰 The program is funded through a <strong>public-private partnership</strong>. Estimated budget: <strong>500 million CFA francs</strong> over 3 years, with diaspora, NGO and local authority support.",
      yb: "💰 Budget : 500 000 000 FCFA – 3 efʉ'. Lekāk diaspora, ONG pɔ́ alεt."
    },

    /* ── CATÉGORIE C: Serge Baresi Tessa & Programme ── */
    {
      q: /qui est|who is|serge|baresi|tessa|candidat|maire|candidate/i,
      fr: "🌟 <strong>Serge Baresi Tessa</strong> est le candidat MRC à la mairie de Dschang 2026 – architecte du mental, lauréat du Grand Prix de l'Excellence Africaine (2025), leader de l'Opération Ville Propre et porteur du programme 100 Forages – 100 Pistes – 100% Savoir.",
      en: "🌟 <strong>Serge Baresi Tessa</strong> is the MRC candidate for Dschang mayor 2026 – architect of mindset, laureate of the African Excellence Award (2025), leader of the Clean City Operation and champion of the 100 Wells – 100 Roads – 100% Knowledge program.",
      yb: "🌟 Serge Baresi Tessa – efɔ MRC Dschang 2026. Grand Prix Excellence Africaine 2025. Azwíŋ Dschang ŋkwa !"
    },
    {
      q: /programme|vision|plan|projet|platform/i,
      fr: "📋 Le programme repose sur <strong>6 piliers</strong> : 1) Eau (100 forages) · 2) Éducation & démocratie · 3) Agriculture moderne · 4) Santé accessible · 5) Infrastructures · 6) Ville Propre & emploi local.",
      en: "📋 The program rests on <strong>6 pillars</strong>: 1) Water (100 wells) · 2) Education & democracy · 3) Modern agriculture · 4) Accessible healthcare · 5) Infrastructure · 6) Clean City & local employment.",
      yb: "📋 Programme – piliers 6 : 1) meŋ · 2) leshūŋ · 3) ajʉ'εfa' · 4) ŋkāŋnɛ̄t · 5) nzhɛ́ · 6) Ville Propre & afā'."
    },
    {
      q: /MRC|mouvement renaissance|parti|party|politique|political/i,
      fr: "🏛️ Le <strong>MRC</strong> (Mouvement pour la Renaissance du Cameroun), fondé et présidé par Maurice Kamto, est le parti qui soutient Serge Baresi Tessa à Dschang. Un parti ancré dans les valeurs de démocratie, transparence et développement.",
      en: "🏛️ The <strong>MRC</strong> (Movement for the Renaissance of Cameroon), founded and led by Maurice Kamto, is the party backing Serge Baresi Tessa in Dschang. A party rooted in democracy, transparency and development.",
      yb: "🏛️ MRC – Maurice Kamto – azwíŋ ŋkwa Cameroun. Lekāk Serge Baresi Tessa Dschang 2026."
    },
    {
      q: /élection|election|vote|2026|date|quand/i,
      fr: "📅 Les élections municipales 2026-2027 n'ont pas encore de date officielle. Restez connectés sur ce site et notre groupe WhatsApp pour l'annonce officielle. En attendant : <strong>l'Opération Ville Propre</strong> continue chaque dimanche !",
      en: "📅 The 2026-2027 municipal elections don't have an official date yet. Stay tuned on this site and our WhatsApp group for the official announcement. In the meantime: <strong>Clean City Operation</strong> continues every Sunday!",
      yb: "📅 Élections 2026 – lā' pɔ́ njhʉ̄ á njhʉ njhʉ. Leso'ne WhatsApp mefuŋte !"
    },
    {
      q: /Kamto|Maurice Kamto|président MRC/i,
      fr: "🌟 <strong>Maurice Kamto</strong> est le Président du MRC et figure centrale de l'opposition camerounaise. Il soutient personnellement la candidature de Serge Baresi Tessa à Dschang.",
      en: "🌟 <strong>Maurice Kamto</strong> is the MRC President and central figure of the Cameroonian opposition. He personally supports Serge Baresi Tessa's candidacy in Dschang.",
      yb: "🌟 Maurice Kamto – efɔ MRC. Lekāk Serge Baresi Tessa Dschang ŋkwa."
    },

    /* ── CATÉGORIE D: Vision & Projets ── */
    {
      q: /eau|water|forage|puits|well|potable/i,
      fr: "💧 L'accès à l'<strong>eau potable</strong> est une priorité absolue. 100 forages équipés de pompes solaires, maintenus par des coopératives locales, pour que chaque habitant de Dschang ait de l'eau 24h/24.",
      en: "💧 Access to <strong>drinking water</strong> is an absolute priority. 100 solar-powered wells, maintained by local cooperatives, so every Dschang resident has water 24/7.",
      yb: "💧 Meŋ ŋkāŋ – priority ŋkwa ! 100 forages – lekāk mbū ŋkwa Dschang – meŋ efʉ' ŋkwa !"
    },
    {
      q: /éducation|education|école|school|savoir|knowledge|formation/i,
      fr: "🏫 <strong>100% Savoir</strong> : réhabilitation de toutes les écoles vétustes, création de centres de formation professionnelle, et consultation citoyenne tous les 4 mois pour un gouvernement proche des habitants.",
      en: "🏫 <strong>100% Knowledge</strong>: rehabilitation of all dilapidated schools, creation of vocational training centres, and citizen consultation every 4 months for governance close to residents.",
      yb: "🏫 Leshūŋ ŋkwa – menyiŋ menyiŋ nnɛ̄t leshūŋ, mefuŋte mbū ánε 4 efʉ'."
    },
    {
      q: /santé|health|hôpital|hospital|médicament|medicine|médecin/i,
      fr: "🏥 Extension des <strong>centres de santé</strong>, approvisionnement garanti en médicaments essentiels, et unités mobiles de soins pour les villages éloignés – parce que la santé n'a pas de prix.",
      en: "🏥 Extension of <strong>health centres</strong>, guaranteed supply of essential medicines, and mobile care units for remote villages – because health is priceless.",
      yb: "🏥 Menyiŋ ŋkāŋnɛ̄t – centres de santé, mankhwala ŋkwa, leziŋ mefɔ."
    },
    {
      q: /route|piste|infrastructure|road|bitumage|transport/i,
      fr: "🛣️ <strong>100 Pistes</strong> : bitumage des routes rurales, installation d'éclairage public solaire et désenclavement des villages périphériques pour relier Dschang à tous ses territoires.",
      en: "🛣️ <strong>100 Roads</strong>: paving rural roads, installing solar public lighting, and opening up peripheral villages to connect Dschang to all its territories.",
      yb: "🛣️ 100 Pistes – mɛnzhɛ meŋgyā – eshhʉ̄ thʉ̄ pɔ́ leziŋ mefɔ."
    },
    {
      q: /emploi|job|travail|work|jeune|youth|startup|économi/i,
      fr: "💼 Zone économique spéciale, incubateur de startups et programme de <strong>micro-financement pour les jeunes</strong> – parce que Dschang doit devenir un pôle d'excellence économique en Afrique centrale.",
      en: "💼 Special economic zone, startup incubator, and <strong>youth micro-financing program</strong> – because Dschang must become a centre of economic excellence in Central Africa.",
      yb: "💼 Zone économique – incubateur startups – micro-financement mɔ́ – Dschang ŋkwa !"
    },
    {
      q: /agriculture|farm|agriculteur|paysan|irrigation/i,
      fr: "🌾 Soutien aux <strong>agriculteurs locaux</strong> de la Menoua : accès aux intrants, systèmes d'irrigation intelligents et connexion aux marchés régionaux et nationaux. La terre de Dschang est riche – exploitons-la avec intelligence !",
      en: "🌾 Support for <strong>local farmers</strong> in Menoua: access to inputs, smart irrigation systems, and connection to regional and national markets. Dschang's land is rich – let's farm it intelligently!",
      yb: "🌾 Lekāk mefɔ ajʉ'εfa' – irrigation, esaá, pɔ́ nzhɛ́ leziŋ. Menoua á gɔ ŋkwa !"
    },
    {
      q: /diaspora|diaspoland|étranger|abroad/i,
      fr: "🌍 Le projet <strong>Diaspoland</strong> connecte la diaspora de Dschang avec sa ville d'origine. Investissements, transferts de compétences, co-développement – la diaspora est un pilier du Dschang de demain.",
      en: "🌍 The <strong>Diaspoland</strong> project connects Dschang's diaspora with their hometown. Investments, skills transfer, co-development – the diaspora is a pillar of tomorrow's Dschang.",
      yb: "🌍 Diaspoland – mbū Dschang ŋkwa – leziŋ ŋkɔŋne pɔ́ lekāk ŋkwa."
    },

    /* ── CATÉGORIE E: Yemba & Culture ── */
    {
      q: /yemba|langue yemba|language yemba|parle yemba|speak yemba|ŋkwɔ|meshuŋne/i,
      fr: "🗣️ Le <strong>Yemba</strong> (Yɛmba) est la langue bamileke de Dschang, parlée par ~500 000 personnes. Je parle Yemba ! Dites-moi <em>'Metsa'te !'</em> (Bonjour !) et essayons ensemble 😊",
      en: "🗣️ <strong>Yemba</strong> (Yɛmba) is the Bamileke language of Dschang, spoken by ~500,000 people. I speak Yemba! Say <em>'Metsa'te !'</em> (Hello!) and let's try together 😊",
      yb: "🗣️ Yemba – shuŋne ŋkwa Dschang ! Metsa'te ! Meŋ á shuŋ Yemba. Lezεte menu !"
    },
    {
      q: /bonjour|hello|salut|hi|metsa'te|salutation|greeting/i,
      fr: "👋 <strong>Metsa'te !</strong> (Bonjour en Yemba) – Je suis AzA, née à Dschang. Comment puis-je vous aider à naviguer dans notre belle ville propre ? 🌿",
      en: "👋 <strong>Metsa'te !</strong> (Hello in Yemba) – I'm AzA, born in Dschang. How can I help you navigate our clean and beautiful city? 🌿",
      yb: "👋 Metsa'te ! Meŋ nzhɛ́ AzA – mɔ́ Dschang. Mefuŋte ánε leziŋ Dschang ŋkwa ?"
    },
    {
      q: /proverbe|proverb|sagesse|wisdom|yemba proverb/i,
      fr: "🌿 Un proverbe Yemba pour vous : <strong><em>Séŋ nchu a gɛ te mbáʼá ŋka á</em></strong> – « L'oiseau qui chante seul ne fait pas de nid. » Ensemble, nous construisons Dschang ! 🤝",
      en: "🌿 A Yemba proverb for you: <strong><em>Séŋ nchu a gɛ te mbáʼá ŋka á</em></strong> – 'The bird that sings alone makes no nest.' Together, we build Dschang! 🤝",
      yb: "🌿 Séŋ nchu a gɛ te mbáʼá ŋka á – L'oiseau seul ne fait pas de nid. Mbū é gɔ ntswaŋ tswaŋ Dschang !"
    },
    {
      q: /merci|thank|ŋkwa|tɛ'/i,
      fr: "😊 <strong>Tɛ' tɛ' !</strong> (Merci beaucoup en Yemba) Vous êtes très gentil(le) ! C'est un plaisir de vous guider. Autre chose ?",
      en: "😊 <strong>Tɛ' tɛ' !</strong> (Thank you very much in Yemba) You're very kind! It's a pleasure to guide you. Anything else?",
      yb: "😊 Tɛ' tɛ' ! Azwíŋ ŋkɔŋne. Mefuŋte ánε ŋkwa ?"
    },
    {
      q: /comment.*(dire|traduire|translate|say).*(yemba)/i,
      fr: "🗣️ Quelques mots Yemba essentiels : <br>• <em>Metsa'te</em> = Bonjour <br>• <em>Tɛ'</em> = Merci / Beaucoup <br>• <em>Ndém</em> = Dieu <br>• <em>Ŋkwa</em> = Tout / Ensemble <br>• <em>efɔ</em> = Chef <br>• <em>mɔ́</em> = Enfant",
      en: "🗣️ Key Yemba words: <br>• <em>Metsa'te</em> = Hello <br>• <em>Tɛ'</em> = Thank you / A lot <br>• <em>Ndém</em> = God <br>• <em>Ŋkwa</em> = All / Together <br>• <em>efɔ</em> = Chief <br>• <em>mɔ́</em> = Child",
      yb: "🗣️ Meshuŋne Yemba : Metsa'te = Bonjour · Tɛ' = Merci · Ndém = Dieu · Ŋkwa = Tout · efɔ = Chef · mɔ́ = Enfant"
    },
    {
      q: /bamileke|bamileké|culture|tradition|héritage|heritage/i,
      fr: "🌍 Dschang est le cœur du pays Bamileke et berceau de la langue Yemba. Une culture de travail, d'entrepreneuriat et de communauté. <em>Mbū é gɔ ntswaŋ tswaŋ</em> – Quand toutes les mains s'unissent, rien n'est impossible !",
      en: "🌍 Dschang is the heart of Bamileke country and cradle of the Yemba language. A culture of work, entrepreneurship and community. <em>Mbū é gɔ ntswaŋ tswaŋ</em> – When all hands unite, nothing is impossible!",
      yb: "🌍 Dschang – ŋ̄gyā Yemba & Bamileke. Mbū é gɔ ntswaŋ tswaŋ – ŋkwa tɛ' !"
    },

    /* ── CATÉGORIE F: Contact & Actions ── */
    {
      q: /contact|message|email|mail|écrire|write/i,
      fr: "📧 Utilisez le <strong>formulaire de contact</strong> en bas de cette page pour nous écrire. Nous répondons dans les 48h. Pour l'urgence : rejoignez directement notre groupe WhatsApp !",
      en: "📧 Use the <strong>contact form</strong> at the bottom of this page to write to us. We respond within 48 hours. For urgency: join our WhatsApp group directly!",
      yb: "📧 Leshūŋ meshuŋne – formulaire leziŋ ŋ̄gyā. Mepiŋne 48h. WhatsApp – lezεte !"
    },
    {
      q: /whatsapp|groupe|group|rejoindre|join/i,
      fr: "📱 Rejoignez notre <strong>groupe WhatsApp</strong> de campagne ! Remplissez le formulaire en bas de la page avec votre numéro et votre quartier. Vous recevrez les actualités, dates d'opérations et annonces officielles.",
      en: "📱 Join our campaign <strong>WhatsApp group</strong>! Fill in the form at the bottom of the page with your number and neighbourhood. You'll receive news, operation dates and official announcements.",
      yb: "📱 Leso'ne WhatsApp – leshūŋ formulaire pɔ́ numéro. Mefuŋte ánε njhʉ̄ pɔ́ lā' !"
    },
    {
      q: /don|donner|give|donate|soutenir|support|financer/i,
      fr: "💝 Votre soutien compte énormément ! Contactez-nous via le formulaire en choisissant « Don » dans le sujet. Chaque contribution, grande ou petite, aide Dschang à se transformer.",
      en: "💝 Your support means the world! Contact us via the form by choosing 'Don' in the subject. Every contribution, big or small, helps Dschang transform.",
      yb: "💝 Lekāk ŋkɔŋne – don ŋkwa. Leshūŋ formulaire – sujet 'Don'. Tɛ' tɛ' !"
    },
    {
      q: /bénévole|volunteer|volontaire|aider|help/i,
      fr: "🙋 Devenez <strong>bénévole</strong> ! Chaque dimanche, des centaines de Dschangeois nettoient leur ville. Inscrivez-vous via le formulaire WhatsApp et indiquez « Bénévole ». On vous attend ! 🧹",
      en: "🙋 Become a <strong>volunteer</strong>! Every Sunday, hundreds of Dschang residents clean their city. Sign up via the WhatsApp form and select 'Volunteer'. We're waiting for you! 🧹",
      yb: "🙋 Leso'ne bénévole ! Efʉ' ŋkwa (dimanche) – mbū tɛ' á gɔ nzhɛ́ Dschang. Leshūŋ WhatsApp !"
    },
    {
      q: /facebook|instagram|youtube|social|réseaux|suivre|follow/i,
      fr: "📱 Suivez-nous sur : <br>• <strong>Facebook</strong> : fb.com/SergeBaresiTessa <br>• <strong>Instagram</strong> : @dschang2026 <br>• <strong>YouTube</strong> : @DSCHANG2026 <br>Pour les actualités quotidiennes de l'Opération Ville Propre !",
      en: "📱 Follow us on: <br>• <strong>Facebook</strong>: fb.com/SergeBaresiTessa <br>• <strong>Instagram</strong>: @dschang2026 <br>• <strong>YouTube</strong>: @DSCHANG2026 <br>For daily Clean City Operation news!",
      yb: "📱 Metsa'te nzhɛ́ leziŋ : Facebook · Instagram @dschang2026 · YouTube @DSCHANG2026 !"
    },

    /* ── CATÉGORIE G: Dschang ── */
    {
      q: /où est|where is|dschang|ville|city|localisation|location|menoua/i,
      fr: "📍 <strong>Dschang</strong> est une ville universitaire située dans le département de la Menoua, Région de l'Ouest du Cameroun. Coordonnées : <strong>5.4440°N, 10.0575°E</strong>. Altitude ~1400m – une ville au climat frais et agréable, berceau de la culture Yemba et Bamileke.",
      en: "📍 <strong>Dschang</strong> is a university city in the Menoua department, West Region of Cameroon. Coordinates: <strong>5.4440°N, 10.0575°E</strong>. Altitude ~1400m – a city with a fresh, pleasant climate, cradle of Yemba and Bamileke culture.",
      yb: "📍 Dschang – ŋ̄gyā ŋkwa Menoua, Cameroun Ouest. 5.4440°N, 10.0575°E. Altitude 1400m – Ŋ̄gyā Yemba ŋkwa !"
    },
    {
      q: /météo|weather|temps|température|climate|pluie|rain|soleil|sun/i,
      fr: "🌤️ Dschang jouit d'un climat frais et montagnard (altitude ~1400m). Températures moyennes : <strong>18-24°C</strong>. Saison des pluies : mars-novembre. Consultez le ticker en haut de page pour la météo du jour !",
      en: "🌤️ Dschang has a fresh, mountainous climate (altitude ~1400m). Average temperatures: <strong>18-24°C</strong>. Rainy season: March-November. Check the ticker at the top of the page for today's weather!",
      yb: "🌤️ Dschang – eshhʉ̄ thʉ̄ ŋkāŋ – altitude 1400m – 18-24°C. Lezεte ticker leziŋ ŋkwa !"
    },
    {
      q: /université|university|campus|étudiant|student|savoir|knowledge/i,
      fr: "🎓 L'<strong>Université de Dschang</strong> est la première université de la zone CEMAC. Elle accueille des milliers d'étudiants africains. La «&nbsp;Cité du Savoir&nbsp;» – et demain, grâce à notre programme, une ville encore plus belle et propre !",
      en: "🎓 The <strong>University of Dschang</strong> is the leading university in the CEMAC zone. It hosts thousands of African students. The 'City of Knowledge' – and tomorrow, thanks to our program, an even more beautiful and clean city!",
      yb: "🎓 Université de Dschang – leshūŋ ŋkwa CEMAC. Cité du Savoir – Dschang ŋkwa !"
    },

    /* ── CATÉGORIE H: Chatbot AzA ── */
    {
      q: /aza|chatbot|assistant|qui es-tu|who are you|ton nom|your name/i,
      fr: "💬 Je suis <strong>AzA</strong> ! Une goutte d'eau bleue née à Dschang, votre guide multilingue (Français, English, Yemba). Je suis ici pour vous informer sur l'Opération Ville Propre, le programme de Serge Baresi Tessa et la belle ville de Dschang. Posez-moi vos questions !",
      en: "💬 I'm <strong>AzA</strong>! A blue water drop born in Dschang, your multilingual guide (French, English, Yemba). I'm here to inform you about the Clean City Operation, Serge Baresi Tessa's programme and the beautiful city of Dschang. Ask me anything!",
      yb: "💬 Meŋ nzhɛ́ AzA ! Goutte d'eau – mɔ́ Dschang – shuŋ FR, EN, Yemba. Mefuŋte ánε ŋkwa !"
    },
    {
      q: /langue|language|shuŋne|français|english|yemba|parler/i,
      fr: "🌍 Je parle <strong>3 langues</strong> : Français, English et Yemba ! Cliquez sur les boutons FR · EN · YB dans ma barre pour changer de langue. <em>Mbū é gɔ ntswaŋ tswaŋ</em> – ensemble nous communiquons mieux !",
      en: "🌍 I speak <strong>3 languages</strong>: French, English and Yemba! Click the FR · EN · YB buttons in my header to switch languages. <em>Mbū é gɔ ntswaŋ tswaŋ</em> – together we communicate better!",
      yb: "🌍 AzA á shuŋ 3 shuŋne : FR · EN · Yemba ! Lezεte boutons FR · EN · YB. Mbū é gɔ ntswaŋ tswaŋ !"
    },
    {
      q: /voix|voice|audio|parler|speak|son|sound/i,
      fr: "🔊 La fonction voix est disponible ! Pour l'activer, tapez « voix on » et AzA parlera avec une voix féminine africaine. Tapez « voix off » pour désactiver.",
      en: "🔊 Voice function is available! To activate it, type 'voice on' and AzA will speak with an African female voice. Type 'voice off' to deactivate.",
      yb: "🔊 Voix AzA – tapez 'voix on' – meŋ á shuŋ ! 'voix off' – lepap."
    },

    /* ── DEFAULT (fallback) ── */
    {
      q: /./,
      fr: "💬 Merci pour votre question ! Pour une réponse plus précise, utilisez les boutons rapides ci-dessus ou contactez-nous via le formulaire. Je suis AzA, votre guide Dschang 2026 en Français, English et Yemba ! 🌿",
      en: "💬 Thank you for your question! For a more precise answer, use the quick buttons above or contact us via the form. I'm AzA, your Dschang 2026 guide in French, English and Yemba! 🌿",
      yb: "💬 Tɛ' ! Mefuŋte ánε ŋkwa – lezεte formulaire. AzA – nzhɛ́ Dschang 2026. Metsa'te !"
    }
  ];

  /* ── GET ANSWER ── */
  function getAnswer(q) {
    const lower = q.toLowerCase();
    for (let i = 0; i < FAQ.length; i++) {
      if (FAQ[i].q.test(lower)) {
        return FAQ[i][azaLang] || FAQ[i].fr;
      }
    }
    return FAQ[FAQ.length - 1][azaLang] || FAQ[FAQ.length - 1].fr;
  }

  /* ── GREETING ── */
  function getGreeting() {
    const greetings = {
      fr: "👋 <strong>Metsa'te !</strong> Je m'appelle <strong>AzA</strong>, née à Dschang. Comment puis-je vous aider à naviguer dans notre belle ville propre ? Choisissez une question rapide ou écrivez-moi ! 🌿",
      en: "👋 <strong>Metsa'te !</strong> My name is <strong>AzA</strong>, born in Dschang. How can I help you navigate our clean and beautiful city? Choose a quick question or write to me! 🌿",
      yb: "👋 <strong>Metsa'te !</strong> Meŋ nzhɛ́ <strong>AzA</strong>, mɔ́ Dschang. Mefuŋte ánε leziŋ ŋ̄gyā ŋkwa ŋkāŋ Dschang ? Lezεte menu pɔ́ leshūŋ meŋ ! 🌿"
    };
    return greetings[azaLang] || greetings.fr;
  }

  /* ── ADD MESSAGE ── */
  function addMsg(text, isBot) {
    const wrap = document.createElement('div');
    wrap.className = 'mb-msg ' + (isBot ? 'mb-bot' : 'mb-user');
    if (isBot) {
      wrap.innerHTML = `<div class="mb-msg-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18" style="display:block">
          <defs><radialGradient id="mdg2" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#80e8ff"/>
            <stop offset="100%" stop-color="#0077cc"/>
          </radialGradient></defs>
          <path d="M12 1C12 1 3 10 3 15.5C3 20 7 23 12 23C17 23 21 20 21 15.5C21 10 12 1 12 1Z" fill="url(#mdg2)"/>
          <circle cx="9.5" cy="17" r="1.4" fill="#003a73"/>
          <circle cx="14.5" cy="17" r="1.4" fill="#003a73"/>
          <path d="M9 20.5 Q12 22 15 20.5" stroke="#003a73" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        </svg></div><div class="mb-bubble">${text}</div>`;
    } else {
      wrap.innerHTML = `<div class="mb-bubble">${text}</div>`;
    }
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return wrap;
  }

  /* ── TYPING INDICATOR ── */
  function showTyping() {
    const t = document.createElement('div');
    t.className = 'mb-msg mb-bot mb-typing';
    t.innerHTML = `<div class="mb-msg-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" style="display:block">
        <defs><radialGradient id="mdg3" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#80e8ff"/>
          <stop offset="100%" stop-color="#0077cc"/>
        </radialGradient></defs>
        <path d="M12 1C12 1 3 10 3 15.5C3 20 7 23 12 23C17 23 21 20 21 15.5C21 10 12 1 12 1Z" fill="url(#mdg3)"/>
      </svg></div>
      <div class="mb-bubble"><div class="mb-dots">
        <div class="mb-dot"></div><div class="mb-dot"></div><div class="mb-dot"></div>
      </div></div>`;
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    return t;
  }

  /* ── SEND MESSAGE ── */
  function azaSendMsg() {
    const text = input.value.trim();
    if (!text) return;

    // Voice commands
    if (/voix on|voice on/i.test(text)) {
      voiceEnabled = true;
      input.value = '';
      addMsg(text, false);
      const r = addMsg('🔊 Voix activée ! Je parle maintenant.', true);
      speak('Voix activée, je parle maintenant.');
      return;
    }
    if (/voix off|voice off/i.test(text)) {
      voiceEnabled = false;
      if (synth) synth.cancel();
      input.value = '';
      addMsg(text, false);
      addMsg('🔇 Voix désactivée.', true);
      return;
    }

    addMsg(text, false);
    input.value = '';
    const typing = showTyping();
    setTimeout(function () {
      msgs.removeChild(typing);
      const answer = getAnswer(text);
      const msg = addMsg(answer, true);
      if (voiceEnabled) speak(answer);
    }, 800 + Math.random() * 500);
  }

  /* ── AZA LANGUAGE ── */
  window.setAzaLang = function (lang) {
    azaLang = lang;
    localStorage.setItem('azaLang', lang);
    ['fr', 'en', 'yb'].forEach(function (l) {
      const btn = document.getElementById('aza-' + l);
      if (btn) {
        btn.classList.toggle('active', l === lang);
      }
    });
    // Update input placeholder
    const placeholders = { fr: 'Posez votre question…', en: 'Ask your question…', yb: 'Lezεte menu…' };
    if (input) input.placeholder = placeholders[lang] || placeholders.fr;
  };

  /* ── TOGGLE / OPEN / CLOSE ── */
  window.toggleChatbot = function () {
    opened = !opened;
    win.classList.toggle('aza-open', opened);
    win.setAttribute('aria-hidden', !opened);
    trigger.setAttribute('aria-expanded', opened);
    if (opened) {
      if (badge) badge.style.opacity = '0';
      if (msgs.children.length === 0) {
        setTimeout(function () {
          addMsg(getGreeting(), true);
          if (voiceEnabled) speak(getGreeting());
        }, 350);
      }
      if (input) input.focus();
    }
  };

  window.closeChatbot = function () {
    opened = false;
    win.classList.remove('aza-open');
    win.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
  };

  /* ── QUICK QUESTIONS (chip buttons) ── */
  window.azaQuickQ = function (btn) {
    const lang = azaLang;
    const q = btn.getAttribute('data-' + lang) || btn.getAttribute('data-fr') || btn.textContent;
    if (input) {
      input.value = q;
      azaSendMsg();
    }
  };

  /* Legacy alias */
  window.mbQuickQ = window.azaQuickQ;

  /* ── EVENTS ── */
  if (send) send.addEventListener('click', azaSendMsg);
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); azaSendMsg(); }
    });
  }

  /* ── INIT LANG ── */
  window.setAzaLang(azaLang);

})();
