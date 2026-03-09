/**
 * 職種ごとのイメージ画像URL（Unsplash）
 * Unsplashの写真は無料で使用可能（https://unsplash.com/license）
 */

const u = (id: string, w = 400, h = 250) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const jobImageMap: Record<string, string> = {
  // ── IT・テクノロジー ──
  'web-engineer': u('photo-1461749280684-dccba630e2f6'),     // code on screen
  'infra-engineer': u('photo-1558494949-ef010cbdcc31'),      // server room
  'data-scientist': u('photo-1551288049-bebda4e38f71'),      // data dashboard
  'security-engineer': u('photo-1555949963-ff9fe0c870eb'),   // cybersecurity
  'it-pm': u('photo-1552664730-d307ca884978'),               // team meeting
  'ai-engineer': u('photo-1677442136019-21780ecad995'),      // AI visualization
  'game-programmer': u('photo-1542751371-adc38448a05e'),     // gaming setup
  'qa-engineer': u('photo-1516321318423-f06f85e504b3'),      // testing
  'tech-support': u('photo-1531482615713-2afd69097998'),     // help desk
  'se': u('photo-1504639725590-34d0984388bd'),               // coding

  // ── クリエイティブ ──
  'web-designer': u('photo-1467232004584-a241de8bcf5d'),     // design tools
  'graphic-designer': u('photo-1626785774573-4b799315345d'),  // graphic work
  'ux-designer': u('photo-1586717791821-3f44a563fa4c'),      // UX wireframe
  'video-creator': u('photo-1574717024653-61fd2cf4d44d'),    // video editing
  'photographer': u('photo-1452587925148-ce544e77e70d'),     // photographer
  'sound-creator': u('photo-1598488035139-bdbb2231cb64'),    // music studio
  'game-designer': u('photo-1556438064-2d7646166914'),       // game design
  'interior-designer': u('photo-1618221195710-dd6b41faaea6'), // interior
  'copywriter': u('photo-1455390582262-044cdead277a'),       // writing
  'animator': u('photo-1534972195531-d756b9bfa9f2'),         // animation

  // ── 営業・ビジネス ──
  'corporate-sales': u('photo-1560472355-536de3962603'),     // business meeting
  'personal-sales': u('photo-1556742049-0cfed4f6a45d'),      // handshake
  'hr-sales': u('photo-1521791136064-7986c2920216'),         // recruitment
  'real-estate-sales': u('photo-1560518883-ce09059eeffa'),   // real estate
  'mr': u('photo-1576091160550-2173dba999ef'),               // medical sales
  'overseas-sales': u('photo-1526304640581-d334cdbbf45e'),   // global business
  'customer-success': u('photo-1556745757-8d76bdb6984b'),    // customer support
  'insurance-sales': u('photo-1554224155-8d04cb21cd6c'),     // insurance

  // ── マーケティング・広告 ──
  'ad-planner': u('photo-1533750349088-cd871a92f312'),       // advertising
  'pr': u('photo-1557804506-669a67965ba0'),                  // PR event
  'marketing': u('photo-1460925895917-afdab827c52f'),        // marketing
  'digital-marketer': u('photo-1432888622747-4eb9a8efeb07'),  // digital marketing
  'media-planner': u('photo-1504711434969-e33886168d6c'),    // media
  'sns-marketer': u('photo-1611162617474-5b21e879e113'),     // social media
  'market-researcher': u('photo-1460925895917-afdab827c52f'), // research data

  // ── コンサル・金融 ──
  'management-consultant': u('photo-1454165804606-c3d57bc86b40'), // consulting
  'it-consultant': u('photo-1553877522-43269d4ea984'),       // IT consulting
  'hr-consultant': u('photo-1573497620053-ea5300f94f21'),    // HR consulting
  'bank-staff': u('photo-1501167786227-4cba60f6d58f'),       // bank
  'securities-sales': u('photo-1611974789855-9c2a0a7236a3'), // stock market
  'fp': u('photo-1554224155-6726b3ff858f'),                  // financial planning
  'actuary': u('photo-1554224154-22dec7ec8818'),             // calculations
  'investment-banker': u('photo-1486406146926-c627a92ad1ab'), // finance district

  // ── 管理・バックオフィス ──
  'general-admin': u('photo-1497366216548-37526070297c'),    // office desk
  'accounting': u('photo-1554224155-3a58922a22c3'),          // accounting
  'hr-staff': u('photo-1573497019940-1c28c88b4f3e'),         // HR
  'legal-staff': u('photo-1589829545856-d10d557cf95f'),      // legal documents
  'general-affairs': u('photo-1497366811353-6870744d04b2'),   // office
  'secretary': u('photo-1573496359142-b8d87734a5a2'),        // secretary
  'procurement': u('photo-1586528116311-ad8dd3c8310d'),      // supply chain
  'internal-audit': u('photo-1450101499163-c8848e968838'),   // audit

  // ── メーカー・製造 ──
  'product-planner': u('photo-1559136555-9303baea8ebd'),     // product planning
  'production-manager': u('photo-1581091226825-a6a2a5aee158'), // factory
  'quality-control': u('photo-1581092160562-40aa08e78837'),  // quality check
  'production-engineer': u('photo-1565043666747-69f6646db940'), // engineering
  'researcher': u('photo-1532094349884-543bc11b234d'),       // research lab
  'patent-ip': u('photo-1450101499163-c8848e968838'),        // patent

  // ── 医療・福祉 ──
  'doctor': u('photo-1579684385127-1ef15d508118'),           // doctor
  'nurse': u('photo-1576091160399-112ba8d25d1d'),            // nurse
  'pharmacist': u('photo-1585435557343-3b092031a831'),       // pharmacy
  'physical-therapist': u('photo-1576091160550-2173dba999ef'), // therapy
  'care-worker': u('photo-1576765608535-5f04d1e3f289'),      // care
  'social-worker': u('photo-1559839734-2b71ea197ec2'),       // social work
  'dietitian': u('photo-1490645935967-10de6ba17061'),        // nutrition
  'clinical-technologist': u('photo-1579154204601-01588f351e67'), // lab
  'dental-hygienist': u('photo-1606811971618-4486d14f3f99'),  // dental

  // ── 教育・法律・公務 ──
  'school-teacher': u('photo-1509062522246-3755977927d7'),   // classroom
  'university-researcher': u('photo-1532094349884-543bc11b234d'), // research
  'cram-school-teacher': u('photo-1580582932707-520aed937b7b'), // tutoring
  'nursery-teacher': u('photo-1587654780291-39c9404d7cf0'),  // nursery
  'lawyer': u('photo-1589829545856-d10d557cf95f'),           // law
  'tax-accountant': u('photo-1554224155-3a58922a22c3'),      // tax
  'judicial-scrivener': u('photo-1450101499163-c8848e968838'), // legal docs
  'social-insurance-labor': u('photo-1554224154-22dec7ec8818'), // documents
  'national-civil-servant': u('photo-1523292562811-8fa7962a78c8'), // government
  'local-civil-servant': u('photo-1517245386807-bb43f82c33c4'), // city hall
  'police-fire': u('photo-1517263904808-5dc91e3e7044'),      // emergency

  // ── サービス・ライフスタイル ──
  'retail-sales': u('photo-1441986300917-64674bd600d8'),     // retail shop
  'hotel-staff': u('photo-1566073771259-6a8506099945'),      // hotel lobby
  'travel-planner': u('photo-1488646953014-85cb44e25828'),   // travel
  'chef': u('photo-1556910103-1c02745aae4d'),                // chef cooking
  'patissier': u('photo-1486427944544-d2c246c4df14'),        // pastry
  'restaurant-manager': u('photo-1517248135467-4c7edcad34c4'), // restaurant
  'hairdresser': u('photo-1560066984-138dadb4c035'),         // hair salon
  'fashion-designer': u('photo-1558618666-fcd25c85f82e'),    // fashion
  'beauty-advisor': u('photo-1596462502278-27bfdc403348'),   // beauty
  'sports-trainer': u('photo-1534438327276-14e5300c3a48'),   // gym trainer
  'event-producer': u('photo-1540575467063-178a50e2fd60'),   // event
  'entertainment-manager': u('photo-1514525253161-7a46d19cd819'), // entertainment

  // ── インフラ・その他 ──
  'architect': u('photo-1503387762-592deb58ef4e'),           // architecture
  'construction-manager': u('photo-1504307651254-35680f356dfd'), // construction
  'real-estate-developer': u('photo-1486325212027-8081e485255e'), // development
  'surveyor': u('photo-1581092918056-0c4c3acd3789'),         // surveying
  'logistics-manager': u('photo-1586528116311-ad8dd3c8310d'), // logistics
  'trade-admin': u('photo-1494412574643-ff11b0a5eb95'),      // shipping
  'customs-broker': u('photo-1494412574643-ff11b0a5eb95'),   // customs
  'journalist': u('photo-1504711434969-e33886168d6c'),       // journalism
  'editor': u('photo-1457369804613-52c61a468e7d'),           // editing
  'translator': u('photo-1456513080510-7bf3a84b82f8'),       // translation
  'librarian': u('photo-1507842217343-583bb7270b66'),        // library
  'curator': u('photo-1554907984-15263bfd63bd'),             // museum
  'farmer': u('photo-1500937386664-56d1dfef3854'),           // farming
  'environmental-consultant': u('photo-1473448912268-2022ce9509d8'), // environment
  'energy-engineer': u('photo-1509391366360-2e959784a276'),  // energy
  'pilot': u('photo-1436491865332-7a61a109db05'),            // cockpit
  'sdf': u('photo-1579912437766-7896df6d3cd3'),              // military
  'trading-company': u('photo-1526304640581-d334cdbbf45e'),  // trading
  'pharmacist-industry': u('photo-1532094349884-543bc11b234d'), // pharma research
};

/** 職種IDから画像URLを取得（フォールバックなし） */
export function getJobImageUrl(jobId: string): string | undefined {
  return jobImageMap[jobId];
}
