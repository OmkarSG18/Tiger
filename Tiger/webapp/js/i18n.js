/**
 * CredAlt — Internationalization (i18n)
 * Supports: English, Hindi, Kannada, Telugu, Tamil
 */

let currentLang = 'en';

const LANGUAGES = {
    en: { label: 'English', flag: 'EN' },
    hi: { label: 'Hindi', flag: 'HI' },
    kn: { label: 'Kannada', flag: 'KN' },
    te: { label: 'Telugu', flag: 'TE' },
    ta: { label: 'Tamil', flag: 'TA' },
};

const TRANSLATIONS = {
    // ── Login Page ────────────────────────────────────────────────────
    tagline: {
        en: "Alternative Credit Scoring for Everyone",
        hi: "सभी के लिए वैकल्पिक क्रेडिट स्कोरिंग",
        kn: "ಎಲ್ಲರಿಗಾಗಿ ಪರ್ಯಾಯ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರಿಂಗ್",
        te: "అందరి కోసం ప్రత్యామ్నాయ క్రెడిట్ స్కోరింగ్",
        ta: "அனைவருக்கும் மாற்று கடன் மதிப்பீடு"
    },
    subtitle: {
        en: "Empowering India's underbanked with fair, data-driven trust scores",
        hi: "भारत के अल्पसेवित लोगों को निष्पक्ष, डेटा-संचालित विश्वास स्कोर के साथ सशक्त बनाना",
        kn: "ನ್ಯಾಯಯುತ, ಡೇಟಾ-ಆಧಾರಿತ ವಿಶ್ವಾಸ ಅಂಕಗಳೊಂದಿಗೆ ಭಾರತದ ಅಲ್ಪಬ್ಯಾಂಕ್ ಜನರನ್ನು ಸಬಲೀಕರಣ",
        te: "న్యాయమైన, డేటా-ఆధారిత నమ్మకం స్కోర్‌లతో భారతదేశపు అల్ప బ్యాంకింగ్ ప్రజలను శక్తివంతం చేయడం",
        ta: "நியாயமான, தரவு சார்ந்த நம்பகத்தன்மை மதிப்பெண்களுடன் இந்தியாவின் குறைந்த வங்கி மக்களை வலுப்படுத்துதல்"
    },
    selectProfileType: {
        en: "Select Your Profile Type",
        hi: "अपना प्रोफ़ाइल प्रकार चुनें",
        kn: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        te: "మీ ప్రొఫైల్ రకాన్ని ఎంచుకోండి",
        ta: "உங்கள் சுயவிவர வகையை தேர்ந்தெடுக்கவும்"
    },
    selectProfileDesc: {
        en: "Choose a role to explore pre-trained credit profiles, or create your own",
        hi: "पूर्व-प्रशिक्षित क्रेडिट प्रोफाइल देखने के लिए एक भूमिका चुनें, या अपना खुद का बनाएं",
        kn: "ಪೂರ್ವ-ತರಬೇತಿ ಕ್ರೆಡಿಟ್ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        te: "ముందుగా శిక్షణ పొందిన క్రెడిట్ ప్రొఫైల్‌లను అన్వేషించడానికి పాత్రను ఎంచుకోండి",
        ta: "முன் பயிற்சி பெற்ற கடன் சுயவிவரங்களை ஆராய ஒரு பாத்திரத்தை தேர்ந்தெடுக்கவும்"
    },
    customProfile: {
        en: "Custom Profile",
        hi: "कस्टम प्रोफ़ाइल",
        kn: "ಕಸ್ಟಮ್ ಪ್ರೊಫೈಲ್",
        te: "కస్టమ్ ప్రొఫైల్",
        ta: "தனிப்பயன் சுயவிவரம்"
    },
    customProfileDesc: {
        en: "Enter your own values and see your alternative credit score",
        hi: "अपने मान दर्ज करें और अपना वैकल्पिक क्रेडिट स्कोर देखें",
        kn: "ನಿಮ್ಮ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಪರ್ಯಾಯ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ನೋಡಿ",
        te: "మీ విలువలను నమోదు చేయండి మరియు మీ ప్రత్యామ్నాయ క్రెడిట్ స్కోర్ చూడండి",
        ta: "உங்கள் மதிப்புகளை உள்ளிட்டு உங்கள் மாற்று கடன் மதிப்பெண்ணைப் பாருங்கள்"
    },

    // ── Dashboard ─────────────────────────────────────────────────────
    switchRole: {
        en: "Switch Role",
        hi: "भूमिका बदलें",
        kn: "ಪಾತ್ರ ಬದಲಿಸಿ",
        te: "పాత్ర మార్చు",
        ta: "பாத்திரம் மாற்று"
    },
    selectProfile: {
        en: "Select Profile:",
        hi: "प्रोफ़ाइल चुनें:",
        kn: "ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ:",
        te: "ప్రొఫైల్ ఎంచుకోండి:",
        ta: "சுயவிவரத்தை தேர்ந்தெடு:"
    },
    chooseProfile: {
        en: "-- Choose a profile --",
        hi: "-- प्रोफ़ाइल चुनें --",
        kn: "-- ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ --",
        te: "-- ప్రొఫైల్ ఎంచుకోండి --",
        ta: "-- சுயவிவரத்தை தேர்வு --"
    },

    // ── Tabs ───────────────────────────────────────────────────────────
    tabScore: {
        en: "Score Analysis",
        hi: "स्कोर विश्लेषण",
        kn: "ಸ್ಕೋರ್ ವಿಶ್ಲೇಷಣೆ",
        te: "స్కోర్ విశ్లేషణ",
        ta: "மதிப்பெண் பகுப்பாய்வு"
    },
    tabBreakdown: {
        en: "Factor Breakdown",
        hi: "कारक विश्लेषण",
        kn: "ಅಂಶ ವಿಭಜನೆ",
        te: "కారకాల విభజన",
        ta: "காரணி பிரிவு"
    },
    tabRadar: {
        en: "Signal Radar",
        hi: "सिग्नल रडार",
        kn: "ಸಿಗ್ನಲ್ ರೇಡಾರ್",
        te: "సిగ్నల్ రాడార్",
        ta: "சிக்னல் ரேடார்"
    },
    tabGoal: {
        en: "Goal Planner",
        hi: "लक्ष्य योजनाकार",
        kn: "ಗುರಿ ಯೋಜಕ",
        te: "లక్ష్య ప్రణాళికకుడు",
        ta: "இலக்கு திட்டமிடல்"
    },
    tabCustom: {
        en: "Custom Input",
        hi: "कस्टम इनपुट",
        kn: "ಕಸ್ಟಮ್ ಇನ್‌ಪುಟ್",
        te: "కస్టమ్ ఇన్‌పుట్",
        ta: "தனிப்பயன் உள்ளீடு"
    },

    // ── Score Section ──────────────────────────────────────────────────
    credaltScore: {
        en: "CredAlt Score",
        hi: "क्रेडऑल्ट स्कोर",
        kn: "CredAlt ಸ್ಕೋರ್",
        te: "CredAlt స్కోర్",
        ta: "CredAlt மதிப்பெண்"
    },
    cibilScore: {
        en: "CIBIL Score",
        hi: "सिबिल स्कोर",
        kn: "CIBIL ಸ್ಕೋರ್",
        te: "CIBIL స్కోర్",
        ta: "CIBIL மதிப்பெண்"
    },
    quickStats: {
        en: "Quick Stats",
        hi: "त्वरित आँकड़े",
        kn: "ತ್ವರಿತ ಅಂಕಿಅಂಶ",
        te: "త్వరిత గణాంకాలు",
        ta: "விரைவு புள்ளிவிவரங்கள்"
    },
    monthlyIncome: {
        en: "Monthly Income",
        hi: "मासिक आय",
        kn: "ಮಾಸಿಕ ಆದಾಯ",
        te: "నెలవారీ ఆదాయం",
        ta: "மாத வருமானம்"
    },
    savings: {
        en: "Savings",
        hi: "बचत",
        kn: "ಉಳಿತಾಯ",
        te: "పొదుపు",
        ta: "சேமிப்பு"
    },
    upiTxns: {
        en: "UPI Txns/mo",
        hi: "UPI लेन-देन/माह",
        kn: "UPI ವಹಿವಾಟು/ತಿಂ",
        te: "UPI లావాదేవీలు/నెల",
        ta: "UPI பரிவர்த்தனை/மாதம்"
    },
    billRegularity: {
        en: "Bill Regularity",
        hi: "बिल नियमितता",
        kn: "ಬಿಲ್ ನಿಯಮಿತತೆ",
        te: "బిల్లు క్రమబద్ధత",
        ta: "பில் ஒழுங்குமுறை"
    },
    traditionalVsCredalt: {
        en: "Traditional vs CredAlt",
        hi: "पारंपरिक बनाम क्रेडऑल्ट",
        kn: "ಸಾಂಪ್ರದಾಯಿಕ vs CredAlt",
        te: "సాంప్రదాయ vs CredAlt",
        ta: "பாரம்பரிய vs CredAlt"
    },
    whyAltScoring: {
        en: "Why alternative scoring matters",
        hi: "वैकल्पिक स्कोरिंग क्यों मायने रखती है",
        kn: "ಪರ್ಯಾಯ ಸ್ಕೋರಿಂಗ್ ಏಕೆ ಮುಖ್ಯ",
        te: "ప్రత్యామ్నాయ స్కోరింగ్ ఎందుకు ముఖ్యం",
        ta: "மாற்று மதிப்பீடு ஏன் முக்கியம்"
    },

    // ── Score Reasoning ───────────────────────────────────────────────
    scoreReasoning: {
        en: "Score Reasoning",
        hi: "स्कोर का कारण",
        kn: "ಸ್ಕೋರ್ ಕಾರಣ",
        te: "స్కోర్ కారణం",
        ta: "மதிப்பெண் காரணம்"
    },
    whyThisScore: {
        en: "Why did you get this score?",
        hi: "आपको यह स्कोर क्यों मिला?",
        kn: "ನಿಮಗೆ ಈ ಸ್ಕೋರ್ ಏಕೆ ಬಂದಿದೆ?",
        te: "మీకు ఈ స్కోర్ ఎందుకు వచ్చింది?",
        ta: "இந்த மதிப்பெண் ஏன் வந்தது?"
    },
    improvementChecklist: {
        en: "Improvement Checklist",
        hi: "सुधार चेकलिस्ट",
        kn: "ಸುಧಾರಣೆ ಪಟ್ಟಿ",
        te: "మెరుగుదల చెక్‌లిస్ట్",
        ta: "மேம்பாட்டு பட்டியல்"
    },
    actionsToImprove: {
        en: "Actions to improve your score",
        hi: "अपना स्कोर सुधारने के उपाय",
        kn: "ನಿಮ್ಮ ಸ್ಕೋರ್ ಸುಧಾರಿಸಲು ಕ್ರಮಗಳು",
        te: "మీ స్కోర్‌ని మెరుగుపరచడానికి చర్యలు",
        ta: "உங்கள் மதிப்பெண்ணை மேம்படுத்த நடவடிக்கைகள்"
    },
    contributingFactors: {
        en: "Contributing Factors",
        hi: "योगदान करने वाले कारक",
        kn: "ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು",
        te: "దోహదం చేసే కారకాలు",
        ta: "பங்களிக்கும் காரணிகள்"
    },

    // ── CIBIL Weight Labels ───────────────────────────────────────────
    paymentHistory: {
        en: "Payment History",
        hi: "भुगतान इतिहास",
        kn: "ಪಾವತಿ ಇತಿಹಾಸ",
        te: "చెల్లింపు చరిత్ర",
        ta: "கட்டண வரலாறு"
    },
    creditExposure: {
        en: "Credit Exposure",
        hi: "क्रेडिट एक्सपोज़र",
        kn: "ಕ್ರೆಡಿಟ್ ಎಕ್ಸ್ಪೋಷರ್",
        te: "క్రెడిట్ ఎక్స్‌పోజర్",
        ta: "கடன் வெளிப்பாடு"
    },
    creditTypeDuration: {
        en: "Credit Type & Duration",
        hi: "क्रेडिट प्रकार और अवधि",
        kn: "ಕ್ರೆಡಿಟ್ ಪ್ರಕಾರ ಮತ್ತು ಅವಧಿ",
        te: "క్రెడిట్ రకం & వ్యవధి",
        ta: "கடன் வகை & காலம்"
    },
    newCreditInquiries: {
        en: "New Credit / Inquiries",
        hi: "नया क्रेडिट / पूछताछ",
        kn: "ಹೊಸ ಕ್ರೆಡಿಟ್ / ವಿಚಾರಣೆ",
        te: "కొత్త క్రెడిట్ / విచారణలు",
        ta: "புதிய கடன் / விசாரணைகள்"
    },

    // ── Improvement Tips ──────────────────────────────────────────────
    tipPayOnTime: {
        en: "Pay your dues on time: Payment history accounts for 30% of your score.",
        hi: "समय पर अपना भुगतान करें: भुगतान इतिहास आपके स्कोर का 30% है।",
        kn: "ನಿಮ್ಮ ಬಾಕಿಗಳನ್ನು ಸಮಯಕ್ಕೆ ಪಾವತಿಸಿ: ಪಾವತಿ ಇತಿಹಾಸವು ನಿಮ್ಮ ಸ್ಕೋರ್‌ನ 30%.",
        te: "మీ బకాయిలను సమయానికి చెల్లించండి: చెల్లింపు చరిత్ర మీ స్కోర్‌లో 30%.",
        ta: "உங்கள் நிலுவைகளை சரியான நேரத்தில் செலுத்துங்கள்: கட்டண வரலாறு உங்கள் மதிப்பெண்ணில் 30%."
    },
    tipLowerUtilization: {
        en: "Lower your credit utilization: Keep your spending below 30% of your available limit.",
        hi: "क्रेडिट उपयोग कम करें: अपने खर्च को उपलब्ध सीमा के 30% से नीचे रखें।",
        kn: "ಕ್ರೆಡಿಟ್ ಬಳಕೆ ಕಡಿಮೆ ಮಾಡಿ: ನಿಮ್ಮ ಖರ್ಚನ್ನು ಲಭ್ಯ ಮಿತಿಯ 30% ಒಳಗೆ ಇರಿಸಿ.",
        te: "క్రెడిట్ వినియోగాన్ని తగ్గించండి: మీ ఖర్చులను అందుబాటులో ఉన్న పరిమితిలో 30% లోపు ఉంచండి.",
        ta: "கடன் பயன்பாட்டை குறைக்கவும்: உங்கள் செலவை கிடைக்கும் வரம்பில் 30% க்கு கீழே வைக்கவும்."
    },
    tipDiversify: {
        en: "Diversify your credit mix: Balance unsecured loans with secured loans.",
        hi: "क्रेडिट मिश्रण में विविधता लाएं: असुरक्षित ऋणों को सुरक्षित ऋणों से संतुलित करें।",
        kn: "ಕ್ರೆಡಿಟ್ ಮಿಶ್ರಣವನ್ನು ವೈವಿಧ್ಯಗೊಳಿಸಿ: ಅಸುರಕ್ಷಿತ ಸಾಲಗಳನ್ನು ಸುರಕ್ಷಿತ ಸಾಲಗಳೊಂದಿಗೆ ಸಮತೋಲನಗೊಳಿಸಿ.",
        te: "క్రెడిట్ మిక్స్‌ని వైవిధ్యపరచండి: అసురక్షిత రుణాలను సురక్షిత రుణాలతో సమతుల్యం చేయండి.",
        ta: "கடன் கலவையை பல்வகைப்படுத்துங்கள்: பாதுகாப்பற்ற கடன்களை பாதுகாப்பான கடன்களுடன் சமநிலைப்படுத்துங்கள்."
    },
    tipLimitInquiries: {
        en: "Limit hard inquiries: Avoid applying for multiple credits simultaneously.",
        hi: "कठोर पूछताछ सीमित करें: एक साथ कई क्रेडिट के लिए आवेदन करने से बचें।",
        kn: "ಕಠಿಣ ವಿಚಾರಣೆಗಳನ್ನು ಮಿತಿಗೊಳಿಸಿ: ಏಕಕಾಲದಲ್ಲಿ ಅನೇಕ ಕ್ರೆಡಿಟ್‌ಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ.",
        te: "కఠినమైన విచారణలను పరిమితం చేయండి: ఏకకాలంలో అనేక క్రెడిట్‌ల కోసం దరఖాస్తు చేయడం మానుకోండి.",
        ta: "கடின விசாரணைகளை கட்டுப்படுத்துங்கள்: ஒரே நேரத்தில் பல கடன்களுக்கு விண்ணப்பிப்பதை தவிர்க்கவும்."
    },

    // ── Reasoning Messages (templates) ────────────────────────────────
    excellentReason: {
        en: "Your score is Excellent because you have maintained strong payment consistency ({paymentPct}%) and kept credit utilization under control ({utilizationPct}%). Your diverse credit profile and stable employment history further strengthen your creditworthiness.",
        hi: "आपका स्कोर उत्कृष्ट है क्योंकि आपने मजबूत भुगतान स्थिरता ({paymentPct}%) बनाए रखी है और क्रेडिट उपयोग नियंत्रित ({utilizationPct}%) रखा है। आपकी विविध क्रेडिट प्रोफ़ाइल और स्थिर रोजगार इतिहास आपकी साख को मजबूत करता है।",
        kn: "ನಿಮ್ಮ ಸ್ಕೋರ್ ಅತ್ಯುತ್ತಮವಾಗಿದೆ ಏಕೆಂದರೆ ನೀವು ಬಲವಾದ ಪಾವತಿ ಸ್ಥಿರತೆ ({paymentPct}%) ಕಾಯ್ದುಕೊಂಡಿದ್ದೀರಿ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಬಳಕೆಯನ್ನು ನಿಯಂತ್ರಣದಲ್ಲಿ ({utilizationPct}%) ಇರಿಸಿದ್ದೀರಿ.",
        te: "మీ స్కోర్ అద్భుతంగా ఉంది ఎందుకంటే మీరు బలమైన చెల్లింపు స్థిరత్వాన్ని ({paymentPct}%) కొనసాగించారు మరియు క్రెడిట్ వినియోగాన్ని ({utilizationPct}%) నియంత్రణలో ఉంచారు.",
        ta: "உங்கள் மதிப்பெண் சிறப்பாக உள்ளது, ஏனெனில் நீங்கள் வலுவான கட்டண நிலைத்தன்மையை ({paymentPct}%) பராமரித்துள்ளீர்கள் மற்றும் கடன் பயன்பாட்டை ({utilizationPct}%) கட்டுப்பாட்டில் வைத்துள்ளீர்கள்."
    },
    goodReason: {
        en: "Your score is Good. Your payment track record ({paymentPct}%) and credit utilization ({utilizationPct}%) are healthy. To move to Excellent, focus on maintaining consistency and diversifying your credit types.",
        hi: "आपका स्कोर अच्छा है। आपका भुगतान रिकॉर्ड ({paymentPct}%) और क्रेडिट उपयोग ({utilizationPct}%) स्वस्थ है। उत्कृष्ट स्कोर के लिए, स्थिरता बनाए रखें और अपने क्रेडिट प्रकारों में विविधता लाएं।",
        kn: "ನಿಮ್ಮ ಸ್ಕೋರ್ ಉತ್ತಮವಾಗಿದೆ. ನಿಮ್ಮ ಪಾವತಿ ದಾಖಲೆ ({paymentPct}%) ಮತ್ತು ಕ್ರೆಡಿಟ್ ಬಳಕೆ ({utilizationPct}%) ಆರೋಗ್ಯಕರವಾಗಿದೆ.",
        te: "మీ స్కోర్ మంచిగా ఉంది. మీ చెల్లింపు ట్రాక్ రికార్డ్ ({paymentPct}%) మరియు క్రెడిట్ వినియోగం ({utilizationPct}%) ఆరోగ్యకరంగా ఉన్నాయి.",
        ta: "உங்கள் மதிப்பெண் நல்லது. உங்கள் கட்டண பதிவு ({paymentPct}%) மற்றும் கடன் பயன்பாடு ({utilizationPct}%) ஆரோக்கியமானது."
    },
    fairReason: {
        en: "Your score is Fair. Your payment history ({paymentPct}%) needs improvement and credit utilization ({utilizationPct}%) is moderately high. Irregular payments and limited credit diversity are pulling your score down.",
        hi: "आपका स्कोर ठीक-ठाक है। आपके भुगतान इतिहास ({paymentPct}%) में सुधार की ज़रूरत है और क्रेडिट उपयोग ({utilizationPct}%) मध्यम रूप से अधिक है। अनियमित भुगतान आपके स्कोर को नीचे ला रहे हैं।",
        kn: "ನಿಮ್ಮ ಸ್ಕೋರ್ ಸಾಧಾರಣವಾಗಿದೆ. ನಿಮ್ಮ ಪಾವತಿ ಇತಿಹಾಸ ({paymentPct}%) ಸುಧಾರಣೆ ಬೇಕು ಮತ್ತು ಕ್ರೆಡಿಟ್ ಬಳಕೆ ({utilizationPct}%) ಮಧ್ಯಮ ಹೆಚ್ಚಾಗಿದೆ.",
        te: "మీ స్కోర్ సాధారణంగా ఉంది. మీ చెల్లింపు చరిత్ర ({paymentPct}%) మెరుగుపడాలి మరియు క్రెడిట్ వినియోగం ({utilizationPct}%) మితంగా ఎక్కువగా ఉంది.",
        ta: "உங்கள் மதிப்பெண் சராசரி. உங்கள் கட்டண வரலாறு ({paymentPct}%) மேம்படுத்த வேண்டும் மற்றும் கடன் பயன்பாடு ({utilizationPct}%) மிதமாக அதிகமாக உள்ளது."
    },
    poorReason: {
        en: "Your score is low primarily due to inconsistent payment history ({paymentPct}%) and a high credit utilization ratio ({utilizationPct}%). Limited financial products and frequent credit applications are further impacting your score negatively.",
        hi: "आपका स्कोर कम है, मुख्य रूप से असंगत भुगतान इतिहास ({paymentPct}%) और उच्च क्रेडिट उपयोग अनुपात ({utilizationPct}%) के कारण। सीमित वित्तीय उत्पाद और बार-बार क्रेडिट आवेदन आपके स्कोर को और नकारात्मक रूप से प्रभावित कर रहे हैं।",
        kn: "ನಿಮ್ಮ ಸ್ಕೋರ್ ಕಡಿಮೆ, ಮುಖ್ಯವಾಗಿ ಅಸಮಂಜಸ ಪಾವತಿ ಇತಿಹಾಸ ({paymentPct}%) ಮತ್ತು ಹೆಚ್ಚಿನ ಕ್ರೆಡಿಟ್ ಬಳಕೆ ಅನುಪಾತ ({utilizationPct}%) ಕಾರಣ.",
        te: "మీ స్కోర్ తక్కువగా ఉంది, ప్రధానంగా అస్థిర చెల్లింపు చరిత్ర ({paymentPct}%) మరియు అధిక క్రెడిట్ వినియోగ నిష్పత్తి ({utilizationPct}%) కారణంగా.",
        ta: "உங்கள் மதிப்பெண் குறைவாக உள்ளது, முக்கியமாக சீரற்ற கட்டண வரலாறு ({paymentPct}%) மற்றும் அதிக கடன் பயன்பாட்டு விகிதம் ({utilizationPct}%) காரணமாக."
    },

    // ── Goal Planner ──────────────────────────────────────────────────
    goalPlannerTitle: {
        en: "Financial Goal Planner",
        hi: "वित्तीय लक्ष्य योजनाकार",
        kn: "ಹಣಕಾಸು ಗುರಿ ಯೋಜಕ",
        te: "ఆర్థిక లక్ష్య ప్రణాళికకుడు",
        ta: "நிதி இலக்கு திட்டமிடல்"
    },
    targetAmount: {
        en: "Target Amount",
        hi: "लक्ष्य राशि",
        kn: "ಗುರಿ ಮೊತ್ತ",
        te: "లక్ష్య మొత్తం",
        ta: "இலக்கு தொகை"
    },
    timeline: {
        en: "Timeline (months)",
        hi: "समयरेखा (महीने)",
        kn: "ಟೈಮ್‌ಲೈನ್ (ತಿಂಗಳು)",
        te: "టైమ్‌లైన్ (నెలలు)",
        ta: "காலவரிசை (மாதங்கள்)"
    },
    currentSavings: {
        en: "Current Savings",
        hi: "वर्तमान बचत",
        kn: "ಪ್ರಸ್ತುತ ಉಳಿತಾಯ",
        te: "ప్రస్తుత పొదుపు",
        ta: "தற்போதைய சேமிப்பு"
    },
    generateRoadmap: {
        en: "Generate Roadmap",
        hi: "रोडमैप बनाएं",
        kn: "ರೋಡ್‌ಮ್ಯಾಪ್ ರಚಿಸಿ",
        te: "రోడ్‌మ్యాప్ రూపొందించు",
        ta: "வழிகாட்டி உருவாக்கு"
    },
    calculateScore: {
        en: "Calculate Score",
        hi: "स्कोर की गणना करें",
        kn: "ಸ್ಕೋರ್ ಲೆಕ್ಕ ಹಾಕಿ",
        te: "స్కోర్ లెక్కించు",
        ta: "மதிப்பெண் கணக்கிடு"
    },
    reset: {
        en: "Reset",
        hi: "रीसेट",
        kn: "ಮರುಹೊಂದಿಸಿ",
        te: "రీసెట్",
        ta: "மீட்டமை"
    },

    // ── Risk Categories ───────────────────────────────────────────────
    excellent: {
        en: "Excellent", hi: "उत्कृष्ट", kn: "ಅತ್ಯುತ್ತಮ", te: "అద్భుతం", ta: "சிறப்பு"
    },
    good: {
        en: "Good", hi: "अच्छा", kn: "ಉತ್ತಮ", te: "మంచి", ta: "நல்லது"
    },
    fair: {
        en: "Fair", hi: "ठीक-ठाक", kn: "ಸಾಧಾರಣ", te: "సాధారణం", ta: "சராசரி"
    },
    poor: {
        en: "Poor", hi: "कम", kn: "ಕಡಿಮೆ", te: "తక్కువ", ta: "குறைவு"
    },
    noHistory: {
        en: "No History", hi: "कोई इतिहास नहीं", kn: "ಇತಿಹಾಸವಿಲ್ಲ", te: "చరిత్ర లేదు", ta: "வரலாறு இல்லை"
    },
    approved: {
        en: "Approved", hi: "स्वीकृत", kn: "ಅನುಮೋದಿತ", te: "ఆమోదించబడింది", ta: "அங்கீகரிக்கப்பட்டது"
    },
    rejected: {
        en: "Rejected", hi: "अस्वीकृत", kn: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ", te: "తిరస్కరించబడింది", ta: "நிராகரிக்கப்பட்டது"
    },
    language: {
        en: "Language", hi: "भाषा", kn: "ಭಾಷೆ", te: "భాష", ta: "மொழி"
    },
    signalStrengthRadar: {
        en: "Signal Strength Radar",
        hi: "सिग्नल शक्ति रडार",
        kn: "ಸಿಗ್ನಲ್ ಶಕ್ತಿ ರೇಡಾರ್",
        te: "సిగ్నల్ బలం రాడార్",
        ta: "சிக்னல் வலிமை ரேடார்"
    },
    signalDesc: {
        en: "Strength of alternative data signals across categories",
        hi: "श्रेणियों में वैकल्पिक डेटा संकेतों की ताकत",
        kn: "ವಿಭಾಗಗಳಲ್ಲಿ ಪರ್ಯಾಯ ಡೇಟಾ ಸಂಕೇತಗಳ ಶಕ್ತಿ",
        te: "వర్గాలలో ప్రత్యామ్నాయ డేటా సంకేతాల బలం",
        ta: "வகைகளில் மாற்று தரவு சமிக்ஞைகளின் வலிமை"
    }
};

/**
 * Get a translated string by key, using current language.
 * Supports template variables like {paymentPct}.
 */
function t(key, replacements) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    let str = entry[currentLang] || entry['en'] || key;
    if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
            str = str.replace(`{${k}}`, v);
        }
    }
    return str;
}

/**
 * Switch the active language and update all DOM elements.
 */
function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

    // Trigger custom event for dynamic re-rendering
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Build language selector dropdown HTML.
 */
function buildLanguageSelector(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<select class="form-select lang-select" id="langSelect" onchange="switchLanguage(this.value)" style="width:auto; min-width:120px; padding:8px 12px; font-size:0.82rem;">`;
    for (const [code, info] of Object.entries(LANGUAGES)) {
        const selected = code === currentLang ? 'selected' : '';
        html += `<option value="${code}" ${selected}>${info.flag} ${info.label}</option>`;
    }
    html += `</select>`;
    container.innerHTML = html;
}
