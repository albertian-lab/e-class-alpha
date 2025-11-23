
import { Assignment, AttendanceStatus, ScheduleMap, Student } from "./types";

export const CLASSES = Array.from({ length: 11 }, (_, i) => {
    const num = i + 1;
    return `11 P ${num < 10 ? '0' + num : num}`;
});

// Admin Passwords per Class
export const CLASS_PASSWORDS: Record<string, string> = {};
CLASSES.forEach((className, index) => {
    CLASS_PASSWORDS[className] = `smansa${index + 1}`;
});

// Subject Codes Mapping
export const SUBJECT_MAP: Record<string, string> = {
    "PABP": "Pendidikan Agama",
    "PJOK": "Penjasorkes",
    "BINGTL": "B. Inggris Tingkat Lanjut",
    "BJEP": "Bahasa Jepang",
    "SR": "Seni Rupa",
    "BIND": "Bahasa Indonesia",
    "BK": "Bimbingan Konseling",
    "SOSI": "Sosiologi",
    "BIDTL": "B. Indonesia Tingkat Lanjut",
    "MM": "Matematika",
    "SEJA": "Sejarah",
    "PRKY": "Prakarya",
    "MLBJ": "Muatan Lokal B. Jawa",
    "PEPA": "Pendidikan Pancasila",
    "BING": "Bahasa Inggris",
    "FISI": "Fisika",
    "KIMI": "Kimia",
    "BIOL": "Biologi",
    "EKON": "Ekonomi",
    "GEOG": "Geografi",
    "INFO": "Informatika",
    "MMTL": "Matematika Tingkat Lanjut",
    "PD": "Projek / Pulang Dini",
    "U": "Upacara",
    "IST": "Istirahat"
};

// Full Student Database extracted from OCR
// Note: "11-P-01" in PDF is normalized to "11 P 01" to match app convention
export const STUDENTS_DB: Student[] = [
  // Page 1 (11 P 01)
  { nis: "13183", nisn: "0089973209", name: "ABDAN PANJI SAPUTRO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13183" },
  { nis: "13186", nisn: "0083144377", name: "ADINDA KHUMAIROH SHODIK", gender: "P", religion: "Islam", classId: "11 P 01", id: "13186" },
  { nis: "13198", nisn: "0095606260", name: "AHMAD RIZKY SAPUTRA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13198" },
  { nis: "13217", nisn: "0097857387", name: "ANA KHANIFAN", gender: "P", religion: "Islam", classId: "11 P 01", id: "13217" },
  { nis: "13261", nisn: "0081792508", name: "BESCHA SHIREEN PUTRI ASMADIYAR", gender: "P", religion: "Islam", classId: "11 P 01", id: "13261" },
  { nis: "13267", nisn: "0086746198", name: "BUNGA CECILIA WIBOWO", gender: "P", religion: "Islam", classId: "11 P 01", id: "13267" },
  { nis: "13270", nisn: "0098523812", name: "CANAYA PUTRI AULIA", gender: "P", religion: "Islam", classId: "11 P 01", id: "13270" },
  { nis: "13281", nisn: "0088326980", name: "CHRISTIAN TONI ARIYANTO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13281" },
  { nis: "13288", nisn: "0086886171", name: "DARA AYU ANASTASYA", gender: "P", religion: "Islam", classId: "11 P 01", id: "13288" },
  { nis: "13294", nisn: "0089645050", name: "DESI ANTIKA SARI", gender: "P", religion: "Islam", classId: "11 P 01", id: "13294" },
  { nis: "13298", nisn: "0088333373", name: "DIDE SATRIA VALENTINO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13298" },
  { nis: "13307", nisn: "0099861714", name: "EKA FIRDA APRILIASARI", gender: "P", religion: "Islam", classId: "11 P 01", id: "13307" },
  { nis: "13312", nisn: "0088063276", name: "ENDY WICAKSANA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13312" },
  { nis: "13323", nisn: "0091882328", name: "FANCY ALEXANDER REMUS KURNIAWAN", gender: "L", religion: "Katholik", classId: "11 P 01", id: "13323" },
  { nis: "13332", nisn: "0086483683", name: "FERI AHMAD FERNANDA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13332" },
  { nis: "13334", nisn: "0091536933", name: "FERRISKA PRATISTA", gender: "P", religion: "Islam", classId: "11 P 01", id: "13334" },
  { nis: "13340", nisn: "0084888852", name: "GADING RAYA RAMADHANI CHRISDIANTO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13340" },
  { nis: "13348", nisn: "0096369656", name: "HAFIZ FAKHRI ARFA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13348" },
  { nis: "13352", nisn: "0099527336", name: "HANNY SETYANINGRUM", gender: "P", religion: "Islam", classId: "11 P 01", id: "13352" },
  { nis: "13356", nisn: "0096609749", name: "HELMI RAHMAN HAKIM", gender: "L", religion: "Islam", classId: "11 P 01", id: "13356" },
  { nis: "13372", nisn: "0092731116", name: "JONA ARRAYA BEKA PUTRA PRASETYA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13372" },
  { nis: "13381", nisn: "0097319539", name: "KEVIN YAYI KUSUMO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13381" },
  { nis: "13395", nisn: "0083247642", name: "LINDA DEVITA ALZAHRA", gender: "P", religion: "Islam", classId: "11 P 01", id: "13395" },
  { nis: "13423", nisn: "3090881306", name: "MUHAMMAD AKBAR BASMALLAH", gender: "L", religion: "Islam", classId: "11 P 01", id: "13423" },
  { nis: "13430", nisn: "0086619053", name: "MUHAMMAD HAKKIAN NAZILI", gender: "L", religion: "Islam", classId: "11 P 01", id: "13430" },
  { nis: "13435", nisn: "0082433636", name: "MUHAMMAD PRIYAGUNG DAMAR SASONGKO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13435" },
  { nis: "13470", nisn: "0082536689", name: "NOVIANA MUFLIKHA", gender: "P", religion: "Islam", classId: "11 P 01", id: "13470" },
  { nis: "13480", nisn: "0086364168", name: "PRAYATA CELIO ARGANANTA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13480" },
  { nis: "13496", nisn: "0088703238", name: "REIHAN GALANG SETIAWAN", gender: "L", religion: "Islam", classId: "11 P 01", id: "13496" },
  { nis: "13505", nisn: "0083398048", name: "RICKY BAGUS ALBERTO PUTRA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13505" },
  { nis: "13523", nisn: "0089178688", name: "SELA ANINDITA", gender: "P", religion: "Islam", classId: "11 P 01", id: "13523" },
  { nis: "13524", nisn: "0088347310", name: "SEVYA SALSABILLAH NUGRAINI", gender: "P", religion: "Islam", classId: "11 P 01", id: "13524" },
  { nis: "13555", nisn: "0085181976", name: "YOGA ADITYA PRATAMA", gender: "L", religion: "Islam", classId: "11 P 01", id: "13555" },
  { nis: "13561", nisn: "0084162401", name: "ZAKKY TAMAMI RIDLO", gender: "L", religion: "Islam", classId: "11 P 01", id: "13561" },
  
  // Page 1 & 2 (11 P 02)
  { nis: "13189", nisn: "0081248142", name: "ADRIAN DJATI PERMANA", gender: "L", religion: "Islam", classId: "11 P 02", id: "13189" },
  { nis: "13196", nisn: "0087056558", name: "AHMAD MAULANA AFFANDI", gender: "L", religion: "Islam", classId: "11 P 02", id: "13196" },
  { nis: "13199", nisn: "3092051453", name: "AIDA APRILIA SARI", gender: "P", religion: "Islam", classId: "11 P 02", id: "13199" },
  { nis: "13207", nisn: "0099358283", name: "ALIA AFIF ZAKIYA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13207" },
  { nis: "13222", nisn: "0083543691", name: "ANGELINA LEONY VINANDA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13222" },
  { nis: "13231", nisn: "0091950066", name: "ANNISA MAHARANI", gender: "P", religion: "Islam", classId: "11 P 02", id: "13231" },
  { nis: "13273", nisn: "3082201699", name: "CELLONA SALSABILA IRWANDA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13273" },
  { nis: "13309", nisn: "0085539546", name: "ELSA MEIRINA PUTRI KRISTANTO", gender: "P", religion: "Kristen", classId: "11 P 02", id: "13309" },
  { nis: "13325", nisn: "0085302571", name: "FARADIZ OQUEVADZAN WIBOWO", gender: "L", religion: "Islam", classId: "11 P 02", id: "13325" },
  { nis: "13354", nisn: "3093927158", name: "HAVA HASBI SYAFIAR MAULANA ATTAR", gender: "L", religion: "Islam", classId: "11 P 02", id: "13354" },
  { nis: "13366", nisn: "3080636502", name: "IQBAL MAULANA JATMIKO", gender: "L", religion: "Islam", classId: "11 P 02", id: "13366" },
  { nis: "13376", nisn: "0084120439", name: "JUWITA TRI ANGGRAINI", gender: "P", religion: "Islam", classId: "11 P 02", id: "13376" },
  { nis: "13382", nisn: "3087941748", name: "KEYSHA MEYCHARLA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13382" },
  { nis: "13393", nisn: "0091326544", name: "LADIYA SUHENDRO", gender: "P", religion: "Islam", classId: "11 P 02", id: "13393" },
  { nis: "13399", nisn: "0081084644", name: "LUKFIAN DWI KURNIAWAN", gender: "L", religion: "Islam", classId: "11 P 02", id: "13399" },
  { nis: "13401", nisn: "0099127089", name: "MARIA LALITA VISTARA", gender: "P", religion: "Kristen", classId: "11 P 02", id: "13401" },
  { nis: "13407", nisn: "0098564912", name: "MITZYLEA YIERRA CHRISTABEL", gender: "P", religion: "Kristen", classId: "11 P 02", id: "13407" },
  { nis: "13410", nisn: "3084428260", name: "MOCHAMAD KHOIRUMAN", gender: "L", religion: "Islam", classId: "11 P 02", id: "13410" },
  { nis: "13439", nisn: "0094989422", name: "MUHAMMAD RIZQY APRILLIANSYAHR", gender: "L", religion: "Islam", classId: "11 P 02", id: "13439" },
  { nis: "13456", nisn: "0085934780", name: "NATHANIA OCTAGRACIA STHEVANNY", gender: "P", religion: "Kristen", classId: "11 P 02", id: "13456" },
  { nis: "13464", nisn: "0082267600", name: "NIRAYA FILRIZKY", gender: "P", religion: "Islam", classId: "11 P 02", id: "13464" },
  { nis: "13467", nisn: "0086792882", name: "NOAN DHESTA ARTSAVINA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13467" },
  { nis: "13491", nisn: "0083996692", name: "RAHMADDIA OSYA WIDYANATA", gender: "L", religion: "Islam", classId: "11 P 02", id: "13491" },
  { nis: "13502", nisn: "0089702513", name: "REZA MAULANA AZIDAN", gender: "L", religion: "Islam", classId: "11 P 02", id: "13502" },
  { nis: "13506", nisn: "0087845747", name: "RISKA MELISA PITASARI", gender: "P", religion: "Islam", classId: "11 P 02", id: "13506" },
  { nis: "13514", nisn: "3099731871", name: "ROMNEYA NARARYA PUTRI KINASIH", gender: "P", religion: "Islam", classId: "11 P 02", id: "13514" },
  { nis: "13518", nisn: "0083982080", name: "SAMUEL EVANDER GILBERT", gender: "L", religion: "Kristen", classId: "11 P 02", id: "13518" },
  { nis: "13545", nisn: "0084036153", name: "VENSKA SALWA AZURA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13545" },
  { nis: "13547", nisn: "0086043129", name: "WARIDDAL INTI'BAH", gender: "P", religion: "Islam", classId: "11 P 02", id: "13547" },
  { nis: "13548", nisn: "0088320036", name: "WIDYA JAYANTI CAHYANINGRUM", gender: "P", religion: "Islam", classId: "11 P 02", id: "13548" },
  { nis: "13549", nisn: "3095642235", name: "WINEDAR MAULIA ARDHINI", gender: "P", religion: "Islam", classId: "11 P 02", id: "13549" },
  { nis: "13556", nisn: "0091219174", name: "YOGA K, HADI PRATAMA", gender: "L", religion: "Islam", classId: "11 P 02", id: "13556" },
  { nis: "13557", nisn: "3076684572", name: "YULIA LILIK NURHAYATI", gender: "P", religion: "Islam", classId: "11 P 02", id: "13557" },
  { nis: "13563", nisn: "0089382655", name: "ZETA JOEVINA", gender: "P", religion: "Islam", classId: "11 P 02", id: "13563" },

  // Page 2 (11 P 03)
  { nis: "13200", nisn: "3092078975", name: "AISYAH RIZKY JANUAR", gender: "P", religion: "Islam", classId: "11 P 03", id: "13200" },
  { nis: "13218", nisn: "0077271930", name: "ANANDA RACHO PUTRA NUGROHO", gender: "L", religion: "Islam", classId: "11 P 03", id: "13218" },
  { nis: "13221", nisn: "0083375899", name: "ANGELINA HAPPY FANANI IRMALIA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13221" },
  { nis: "13227", nisn: "0085699116", name: "ANITA ELPI MAHARANI", gender: "P", religion: "Islam", classId: "11 P 03", id: "13227" },
  { nis: "13234", nisn: "0084940308", name: "ARENTA BELVA AMELIA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13234" },
  { nis: "13236", nisn: "0087120087", name: "ARJUN EKA SANUSI", gender: "L", religion: "Islam", classId: "11 P 03", id: "13236" },
  { nis: "13251", nisn: "0095619607", name: "AURELLIA LEVI MEISYAH", gender: "P", religion: "Islam", classId: "11 P 03", id: "13251" },
  { nis: "13257", nisn: "0083289037", name: "AZZA ANNISA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13257" },
  { nis: "13278", nisn: "0082679516", name: "CHILMA AFFAT SYAKINA AHDANISA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13278" },
  { nis: "13300", nisn: "0088392139", name: "DIMAS MA'AROUF JULIANSYAH", gender: "L", religion: "Islam", classId: "11 P 03", id: "13300" },
  { nis: "13308", nisn: "0092610148", name: "ELISIA NADHIR", gender: "P", religion: "Islam", classId: "11 P 03", id: "13308" },
  { nis: "13310", nisn: "0091917918", name: "ELVIRA ELSYA KIRANA PUTRI", gender: "P", religion: "Islam", classId: "11 P 03", id: "13310" },
  { nis: "13313", nisn: "0088957484", name: "ENRICO FAREL GEOVANI", gender: "L", religion: "Islam", classId: "11 P 03", id: "13313" },
  { nis: "13317", nisn: "0094533524", name: "EVRILLIAN RISKY SAPUTRA", gender: "L", religion: "Islam", classId: "11 P 03", id: "13317" },
  { nis: "13350", nisn: "3095926857", name: "HANA KHAIRUNISA HAMIDA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13350" },
  { nis: "13351", nisn: "0086233707", name: "HANIF ROIHANAH SHOFI", gender: "P", religion: "Islam", classId: "11 P 03", id: "13351" },
  { nis: "13355", nisn: "0085127379", name: "HELLEN MEGA VERNANDA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13355" },
  { nis: "13371", nisn: "0095866232", name: "JOCELLIN VANESYA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13371" },
  { nis: "13386", nisn: "0088653342", name: "KHANSA NABILA HADI HANIFAH", gender: "P", religion: "Islam", classId: "11 P 03", id: "13386" },
  { nis: "13389", nisn: "0091692673", name: "KIRANA MISHYA PUTRI WAHYUDA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13389" },
  { nis: "13396", nisn: "0093219968", name: "LINTANG NUR AYUNNI", gender: "P", religion: "Islam", classId: "11 P 03", id: "13396" },
  { nis: "13416", nisn: "3095419096", name: "MOHAMMAD MALFY RISEY", gender: "L", religion: "Islam", classId: "11 P 03", id: "13416" },
  { nis: "13429", nisn: "0091083866", name: "MUHAMMAD FAZIL JAUHAR TIANUSRA", gender: "L", religion: "Islam", classId: "11 P 03", id: "13429" },
  { nis: "13441", nisn: "0098073718", name: "MUHAMMAD SATRIO MAULANA", gender: "L", religion: "Islam", classId: "11 P 03", id: "13441" },
  { nis: "13442", nisn: "3098117747", name: "MUHAMMAD SUFI FATHURAHMAN", gender: "L", religion: "Islam", classId: "11 P 03", id: "13442" },
  { nis: "13503", nisn: "0098302994", name: "RHYLLA SYAFA' ATTRISHA AULIYA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13503" },
  { nis: "13510", nisn: "0088833054", name: "RIZKI DWI CAHYANTI", gender: "P", religion: "Islam", classId: "11 P 03", id: "13510" },
  { nis: "13513", nisn: "3088407993", name: "ROLANDO FERDIAN RIZKI RAMADHANI", gender: "L", religion: "Islam", classId: "11 P 03", id: "13513" },
  { nis: "13530", nisn: "0076438907", name: "SURYA GURUNG", gender: "L", religion: "Islam", classId: "11 P 03", id: "13530" },
  { nis: "13533", nisn: "0098440862", name: "TAKHIARA IRANIA RIZQITHA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13533" },
  { nis: "13542", nisn: "0085235528", name: "TUTUT RAHAYU CAHYANINGTIYAS", gender: "P", religion: "Islam", classId: "11 P 03", id: "13542" },
  { nis: "13544", nisn: "3097145025", name: "UMROTUL KHAYUMI SU'UDAH", gender: "P", religion: "Islam", classId: "11 P 03", id: "13544" },
  { nis: "13546", nisn: "0099865924", name: "VIRSYA CLARISMA DIVISALMANTA", gender: "P", religion: "Islam", classId: "11 P 03", id: "13546" },
  { nis: "13558", nisn: "0085213710", name: "YUNA MARCHELL NAZAR PUTRA", gender: "L", religion: "Islam", classId: "11 P 03", id: "13558" },

  // Page 3 (11 P 04)
  { nis: "13208", nisn: "0097263030", name: "ALIA MELFIN RUDIA", gender: "P", religion: "Islam", classId: "11 P 04", id: "13208" },
  { nis: "13229", nisn: "0088701389", name: "ANNISA ELOK RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 04", id: "13229" },
  { nis: "13283", nisn: "0088195176", name: "CINTA DWI HARDININGTYAS", gender: "P", religion: "Islam", classId: "11 P 04", id: "13283" },
  { nis: "13311", nisn: "0086809555", name: "ELVIRA SEPTYA RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 04", id: "13311" },
  { nis: "13321", nisn: "3080464412", name: "FADLI RIDI FACHRIZA", gender: "L", religion: "Islam", classId: "11 P 04", id: "13321" },
  { nis: "13328", nisn: "0086219356", name: "FARELL WILLIAM BAGASKARA", gender: "L", religion: "Islam", classId: "11 P 04", id: "13328" },
  { nis: "13335", nisn: "0088562663", name: "FERY ARDIANSYAH", gender: "L", religion: "Islam", classId: "11 P 04", id: "13335" },
  { nis: "13345", nisn: "0071673898", name: "GELSI HUWAIDA PUSPONEGARI", gender: "P", religion: "Islam", classId: "11 P 04", id: "13345" },
  { nis: "13347", nisn: "0088570981", name: "GLADIAN ZWETA AZZAHRAWANI", gender: "P", religion: "Islam", classId: "11 P 04", id: "13347" },
  { nis: "13365", nisn: "0084668358", name: "INTAN KHABIBATUL MAQFIROH", gender: "P", religion: "Islam", classId: "11 P 04", id: "13365" },
  { nis: "13370", nisn: "3087750951", name: "JIHAN NAILA RIFDAH", gender: "P", religion: "Islam", classId: "11 P 04", id: "13370" },
  { nis: "13384", nisn: "0085969671", name: "KEZIA LUNA PRAMUDYA", gender: "P", religion: "Islam", classId: "11 P 04", id: "13384" },
  { nis: "13391", nisn: "0083353421", name: "KISSYA DE LAURA", gender: "P", religion: "Islam", classId: "11 P 04", id: "13391" },
  { nis: "13400", nisn: "0093896153", name: "M, RIFQI MAULANA WAHYUDI", gender: "L", religion: "Islam", classId: "11 P 04", id: "13400" },
  { nis: "13403", nisn: "0092249781", name: "MARISA SUSMITA AINI", gender: "P", religion: "Islam", classId: "11 P 04", id: "13403" },
  { nis: "13408", nisn: "0093512478", name: "MOCH, IBRAHIM MOVIET AL AMIN", gender: "L", religion: "Islam", classId: "11 P 04", id: "13408" },
  { nis: "13411", nisn: "0081237223", name: "MOCHAMMAD SHAFFAN PRAMONO", gender: "L", religion: "Islam", classId: "11 P 04", id: "13411" },
  { nis: "13413", nisn: "0089053613", name: "MOHAMAD REYHAN DAFANTA", gender: "L", religion: "Islam", classId: "11 P 04", id: "13413" },
  { nis: "13420", nisn: "0081787049", name: "MUHAMAD IKHBAL PRATAMA", gender: "L", religion: "Islam", classId: "11 P 04", id: "13420" },
  { nis: "13426", nisn: "0098356056", name: "MUHAMMAD DAVID MAULAN", gender: "L", religion: "Islam", classId: "11 P 04", id: "13426" },
  { nis: "13446", nisn: "0092706639", name: "NABILA SYIFA WARDHANY", gender: "P", religion: "Islam", classId: "11 P 04", id: "13446" },
  { nis: "13452", nisn: "0087007440", name: "NAJWA DESFIRLIA PUTRI WIDODO", gender: "P", religion: "Islam", classId: "11 P 04", id: "13452" },
  { nis: "13455", nisn: "3090921515", name: "NASIFA RIZKYA ROFI'I", gender: "P", religion: "Islam", classId: "11 P 04", id: "13455" },
  { nis: "13473", nisn: "3092807614", name: "NUR AILSA BILQIS ZHIVERILL", gender: "P", religion: "Islam", classId: "11 P 04", id: "13473" },
  { nis: "13479", nisn: "0082197205", name: "PRAHESTA WAHYUNENDYA", gender: "L", religion: "Islam", classId: "11 P 04", id: "13479" },
  { nis: "13481", nisn: "0099563792", name: "PRINCES AGREESTA LOVELY TIENDRA", gender: "P", religion: "Islam", classId: "11 P 04", id: "13481" },
  { nis: "13489", nisn: "0093532930", name: "RAFKA ZAGA DAMAIAR", gender: "L", religion: "Islam", classId: "11 P 04", id: "13489" },
  { nis: "13504", nisn: "0089076045", name: "RIAN NURMA SANDY", gender: "P", religion: "Islam", classId: "11 P 04", id: "13504" },
  { nis: "13512", nisn: "0086581724", name: "ROI ARDI ASMORO DEWO", gender: "L", religion: "Islam", classId: "11 P 04", id: "13512" },
  { nis: "13521", nisn: "0081446994", name: "SARI AGUSTIN", gender: "P", religion: "Islam", classId: "11 P 04", id: "13521" },
  { nis: "13525", nisn: "0084114770", name: "SEZY YUNINGTYAS", gender: "P", religion: "Islam", classId: "11 P 04", id: "13525" },
  { nis: "13535", nisn: "3087770686", name: "TALITHA TSAQIF", gender: "P", religion: "Islam", classId: "11 P 04", id: "13535" },
  { nis: "13537", nisn: "0081524140", name: "TANTY JULIANINGTYAS", gender: "P", religion: "Islam", classId: "11 P 04", id: "13537" },
  { nis: "13562", nisn: "0082850215", name: "ZALFA NAZIFA FITRIA NIZAR ILANA", gender: "P", religion: "Islam", classId: "11 P 04", id: "13562" },

  // Page 4 (11 P 05)
  { nis: "13187", nisn: "0086355210", name: "ADITIA HUSIN BATISTUTA", gender: "L", religion: "Islam", classId: "11 P 05", id: "13187" },
  { nis: "13188", nisn: "0088113552", name: "ADIVA SEPTA BELQIS RAHMADANI SANTOSO", gender: "P", religion: "Islam", classId: "11 P 05", id: "13188" },
  { nis: "13191", nisn: "0097979943", name: "AHMAD AFFAN YUSRIYYAH", gender: "L", religion: "Islam", classId: "11 P 05", id: "13191" },
  { nis: "13192", nisn: "3099283697", name: "AHMAD ALFAN ALFIAN MANASIK", gender: "L", religion: "Islam", classId: "11 P 05", id: "13192" },
  { nis: "13211", nisn: "0095388442", name: "ALMIRA SANIYYAH CLARISSA PUTRI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13211" },
  { nis: "13212", nisn: "0071066838", name: "ALVINA NUR HIDAYAH", gender: "P", religion: "Islam", classId: "11 P 05", id: "13212" },
  { nis: "13214", nisn: "3095263931", name: "ALVIZA NUR HIDAYAH", gender: "P", religion: "Islam", classId: "11 P 05", id: "13214" },
  { nis: "13223", nisn: "0092713059", name: "ANGGA FEBRIAN SETYO NUGROHO", gender: "L", religion: "Islam", classId: "11 P 05", id: "13223" },
  { nis: "13226", nisn: "0089923940", name: "ANGGUN ASTA NEYSA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13226" },
  { nis: "13258", nisn: "0095798522", name: "BASHILIA NADINE ELVIANA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13258" },
  { nis: "13265", nisn: "0097365912", name: "BRENDA NAJLA PUTRI BIANTARA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13265" },
  { nis: "13271", nisn: "0099490058", name: "CANDY WINDYA VALENTERA DARMA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13271" },
  { nis: "13282", nisn: "3088871314", name: "CINDY NUR HIDAYAH", gender: "P", religion: "Islam", classId: "11 P 05", id: "13282" },
  { nis: "13295", nisn: "0081995678", name: "DESTIA PUTRI AMALIA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13295" },
  { nis: "13326", nisn: "0089545644", name: "FARANDY GHATHFAN CALVINDORO", gender: "L", religion: "Islam", classId: "11 P 05", id: "13326" },
  { nis: "13358", nisn: "3091879367", name: "HIRA PUTRI SARASWATI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13358" },
  { nis: "13359", nisn: "0087831639", name: "IFATH PUTRI HIDAYAH", gender: "P", religion: "Islam", classId: "11 P 05", id: "13359" },
  { nis: "13364", nisn: "0091223900", name: "INDRA DEVI SETIAWATI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13364" },
  { nis: "13390", nisn: "0095811948", name: "KIRANA WANGSA PUTRI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13390" },
  { nis: "13392", nisn: "0099146573", name: "KOMANG FREDELLA SURYAASTAWAN SUCIPTA", gender: "L", religion: "Hindu", classId: "11 P 05", id: "13392" },
  { nis: "13404", nisn: "0097588766", name: "MAULIDYA RANA PUTRI TUNGGA DEWI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13404" },
  { nis: "13412", nisn: "0097879298", name: "MOH, RAFANSYAH BAGUS HARFANO", gender: "L", religion: "Islam", classId: "11 P 05", id: "13412" },
  { nis: "13417", nisn: "3085691208", name: "MOHAMMAD RIFQI UBAIDILLAH", gender: "L", religion: "Islam", classId: "11 P 05", id: "13417" },
  { nis: "13428", nisn: "0091705104", name: "MUHAMMAD FAWWAS MUHYIZABID PRAWIRA ARRIFANI", gender: "L", religion: "Islam", classId: "11 P 05", id: "13428" },
  { nis: "13433", nisn: "0082928362", name: "MUHAMMAD IQBAL SATRIO WIJAKSONO", gender: "L", religion: "Islam", classId: "11 P 05", id: "13433" },
  { nis: "13436", nisn: "0093816611", name: "MUHAMMAD RAFFI", gender: "L", religion: "Islam", classId: "11 P 05", id: "13436" },
  { nis: "13472", nisn: "0085597642", name: "NUR AISYAH WAROHMAH", gender: "P", religion: "Islam", classId: "11 P 05", id: "13472" },
  { nis: "13476", nisn: "3097032247", name: "NURUL ANISA ILMIYAH", gender: "P", religion: "Islam", classId: "11 P 05", id: "13476" },
  { nis: "13482", nisn: "0093367680", name: "PRISCILLIA IDA NATISHA REVI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13482" },
  { nis: "13483", nisn: "0083922055", name: "PUAN KATARA KHAYRERA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13483" },
  { nis: "13487", nisn: "0094438490", name: "RACHELITA QEISYA PUTRI ANA", gender: "P", religion: "Islam", classId: "11 P 05", id: "13487" },
  { nis: "13515", nisn: "3099641914", name: "ROSITA RASYIDA ARINI", gender: "P", religion: "Islam", classId: "11 P 05", id: "13515" },

  // Page 5 (11 P 06)
  { nis: "13195", nisn: "0085684523", name: "AHMAD IQSAL ARIADI", gender: "L", religion: "Islam", classId: "11 P 06", id: "13195" },
  { nis: "13219", nisn: "0082013250", name: "ANANDICHA ERVANA PUTRA PRAWIRA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13219" },
  { nis: "13220", nisn: "3098123924", name: "ANDRE SHANDY MUZAKI", gender: "L", religion: "Islam", classId: "11 P 06", id: "13220" },
  { nis: "13238", nisn: "0091058923", name: "ARMILDA HANIFAH LAYANA", gender: "P", religion: "Islam", classId: "11 P 06", id: "13238" },
  { nis: "13245", nisn: "0097450605", name: "AULIA NABILLA SETIAWAN", gender: "P", religion: "Islam", classId: "11 P 06", id: "13245" },
  { nis: "13247", nisn: "0087900164", name: "AURA FITRI ISTIQOMAH", gender: "P", religion: "Islam", classId: "11 P 06", id: "13247" },
  { nis: "13260", nisn: "0097584668", name: "BERNESSA RAKA DURIANTO", gender: "L", religion: "Islam", classId: "11 P 06", id: "13260" },
  { nis: "13263", nisn: "3087816167", name: "BIMA APRILIANSYAH", gender: "L", religion: "Islam", classId: "11 P 06", id: "13263" },
  { nis: "13274", nisn: "0085443677", name: "CEVIN ADILA PUTRA PRAKA YUDHA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13274" },
  { nis: "13275", nisn: "0085681732", name: "CHECA ALREZA ARIANTO", gender: "L", religion: "Islam", classId: "11 P 06", id: "13275" },
  { nis: "13289", nisn: "0082034688", name: "DAVI RAHMADAN PUTRA ISWARA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13289" },
  { nis: "13299", nisn: "0082099057", name: "DIFTAR GEMA MAULANA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13299" },
  { nis: "13322", nisn: "0099480264", name: "FAIRUS AZKA NUHA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13322" },
  { nis: "13338", nisn: "0097468345", name: "FYARLLA MUFIDATUZ ZAHIYAH", gender: "P", religion: "Islam", classId: "11 P 06", id: "13338" },
  { nis: "13339", nisn: "0087455424", name: "GADING ALFINZA NUGRAHA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13339" },
  { nis: "13341", nisn: "0092724146", name: "GASTIANDIRRIJAL WIKO FEBRIANSAH", gender: "L", religion: "Islam", classId: "11 P 06", id: "13341" },
  { nis: "13357", nisn: "0099198548", name: "HILMI RIF'AT ISHOMI", gender: "L", religion: "Islam", classId: "11 P 06", id: "13357" },
  { nis: "13388", nisn: "0094092094", name: "KIRANA EKA DAMAR PRATOLLAH", gender: "P", religion: "Islam", classId: "11 P 06", id: "13388" },
  { nis: "13415", nisn: "0082212826", name: "MOHAMMAD FATIHKHUL HUDA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13415" },
  { nis: "13424", nisn: "0097383200", name: "MUHAMMAD ARVAN KHASYAFI", gender: "L", religion: "Islam", classId: "11 P 06", id: "13424" },
  { nis: "13431", nisn: "0092993122", name: "MUHAMMAD HAMDAN AL-AMIN", gender: "L", religion: "Islam", classId: "11 P 06", id: "13431" },
  { nis: "13437", nisn: "0094676492", name: "MUHAMMAD RAJA DICKSON", gender: "L", religion: "Islam", classId: "11 P 06", id: "13437" },
  { nis: "13444", nisn: "0082028615", name: "MUHHAMMAD UBAI DHIA ARFIN", gender: "L", religion: "Islam", classId: "11 P 06", id: "13444" },
  { nis: "13459", nisn: "0094247117", name: "NAURA SYIFA AMRINA IKRAM IDI", gender: "P", religion: "Islam", classId: "11 P 06", id: "13459" },
  { nis: "13460", nisn: "0095873620", name: "NAYA KEYLLA RAHMASARI", gender: "P", religion: "Islam", classId: "11 P 06", id: "13460" },
  { nis: "13468", nisn: "0087148217", name: "NOFIRSTAN DEO PRASETIYO", gender: "L", religion: "Islam", classId: "11 P 06", id: "13468" },
  { nis: "13477", nisn: "3098216490", name: "PANJI MANDALA PUTRA", gender: "L", religion: "Islam", classId: "11 P 06", id: "13477" },
  { nis: "13484", nisn: "0083975130", name: "PUJIANTORO", gender: "L", religion: "Islam", classId: "11 P 06", id: "13484" },
  { nis: "13498", nisn: "0085785619", name: "RESIANS CINDY PUTRI PATRICIA", gender: "P", religion: "Islam", classId: "11 P 06", id: "13498" },
  { nis: "13519", nisn: "0088640235", name: "SANDI HERMAWAN", gender: "L", religion: "Islam", classId: "11 P 06", id: "13519" },
  { nis: "13522", nisn: "3092714072", name: "SAVIRA TITIS FEBRYASARI", gender: "P", religion: "Islam", classId: "11 P 06", id: "13522" },
  { nis: "13532", nisn: "0095681214", name: "SYIFA ZAULA MU'IZZ", gender: "P", religion: "Islam", classId: "11 P 06", id: "13532" },
  { nis: "13551", nisn: "0086744999", name: "YASHINTA ADELIA", gender: "P", religion: "Islam", classId: "11 P 06", id: "13551" },
  { nis: "13564", nisn: "0099632491", name: "ZHIEVANA SERENE SIA ALMIRA", gender: "P", religion: "Islam", classId: "11 P 06", id: "13564" },

  // Page 5 & 6 (11 P 07)
  { nis: "13184", nisn: "0093634709", name: "ABDI WAHYU PRATAMA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13184" },
  { nis: "13194", nisn: "3082842051", name: "AHMAD HIRZUL FAHRI", gender: "L", religion: "Islam", classId: "11 P 07", id: "13194" },
  { nis: "13197", nisn: "0097602651", name: "AHMAD RIZKY PRATAMA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13197" },
  { nis: "13205", nisn: "0088413095", name: "ALFATIH ANANDA GEOVANY", gender: "L", religion: "Islam", classId: "11 P 07", id: "13205" },
  { nis: "13240", nisn: "0097995836", name: "ARYA SHAFA MAHARDIKA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13240" },
  { nis: "13243", nisn: "0098028899", name: "ASHILAH SASMITA BUCHARI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13243" },
  { nis: "13253", nisn: "0091159384", name: "AYUNING FATIHUL ROHIMAH", gender: "P", religion: "Islam", classId: "11 P 07", id: "13253" },
  { nis: "13264", nisn: "0099464726", name: "BIYAN LINGGAR HERMAWAN", gender: "L", religion: "Islam", classId: "11 P 07", id: "13264" },
  { nis: "13277", nisn: "0094002854", name: "CHEZA YOVI NOVANDINI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13277" },
  { nis: "13284", nisn: "0082434798", name: "DAFIA MUTIARA RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13284" },
  { nis: "13305", nisn: "0091745981", name: "EGA GUITA FENDERA AKBAR", gender: "L", religion: "Islam", classId: "11 P 07", id: "13305" },
  { nis: "13316", nisn: "0088449281", name: "EVELLYNA PAMBUDI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13316" },
  { nis: "13320", nisn: "0086999756", name: "FADIRA MULIA JUNIARITA", gender: "P", religion: "Islam", classId: "11 P 07", id: "13320" },
  { nis: "13327", nisn: "0085590714", name: "FAREL MANDALA SAPUTRA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13327" },
  { nis: "13333", nisn: "3081243234", name: "FERNANDO EURO AKBAR", gender: "L", religion: "Islam", classId: "11 P 07", id: "13333" },
  { nis: "13337", nisn: "0096412606", name: "FREHINO RAMA PUTRA PRAWIRA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13337" },
  { nis: "13379", nisn: "0081760528", name: "KESYA BULAN AMELIA", gender: "P", religion: "Islam", classId: "11 P 07", id: "13379" },
  { nis: "13405", nisn: "0091316602", name: "MAYA SHIFA ALIVIA", gender: "P", religion: "Islam", classId: "11 P 07", id: "13405" },
  { nis: "13406", nisn: "0089729018", name: "MILA ZAKIA", gender: "P", religion: "Islam", classId: "11 P 07", id: "13406" },
  { nis: "13418", nisn: "0086642750", name: "MUHAMAD AKVIN FAHMI GHUFRON", gender: "L", religion: "Islam", classId: "11 P 07", id: "13418" },
  { nis: "13421", nisn: "0084999361", name: "MUHAMAD IKHSAN FADILLAH", gender: "L", religion: "Islam", classId: "11 P 07", id: "13421" },
  { nis: "13427", nisn: "0089645480", name: "MUHAMMAD FATIH AMRU", gender: "L", religion: "Islam", classId: "11 P 07", id: "13427" },
  { nis: "13432", nisn: "3090318041", name: "MUHAMMAD IQBAL NUR HAKAM", gender: "L", religion: "Islam", classId: "11 P 07", id: "13432" },
  { nis: "13443", nisn: "0086681457", name: "MUHAMMAD WILDAN BINTANG UZA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13443" },
  { nis: "13448", nisn: "0099749948", name: "NAFISHA ZAHRA KALISA PUTRI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13448" },
  { nis: "13497", nisn: "0098783253", name: "REISYA FAIRIZTYA JOCELYN ROY PUTRI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13497" },
  { nis: "13511", nisn: "0098288743", name: "RIZQI NARARYA FUTRA PRATAMA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13511" },
  { nis: "13516", nisn: "0095104026", name: "ROYYAN SUMARNO", gender: "L", religion: "Islam", classId: "11 P 07", id: "13516" },
  { nis: "13526", nisn: "0093869496", name: "SHAFIRA BILZALIA", gender: "P", religion: "Islam", classId: "11 P 07", id: "13526" },
  { nis: "13527", nisn: "0081827066", name: "SHEBY LOVE RATU BILKISS", gender: "P", religion: "Islam", classId: "11 P 07", id: "13527" },
  { nis: "13540", nisn: "3082910547", name: "TRI NOVA AHSANU SHUFY SULHA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13540" },
  { nis: "13541", nisn: "0084332555", name: "TRIYASIH WIBAWATI", gender: "P", religion: "Islam", classId: "11 P 07", id: "13541" },
  { nis: "13550", nisn: "0098698020", name: "WIRASINDU GIRI SAMODRA", gender: "L", religion: "Islam", classId: "11 P 07", id: "13550" },
  { nis: "13559", nisn: "0081458492", name: "YUNIOR MUJIANDRI", gender: "L", religion: "Islam", classId: "11 P 07", id: "13559" },

  // Page 6 & 7 (11 P 08)
  { nis: "13185", nisn: "0084118543", name: "ACHMAD FADIL HAFIDZ FADLURAHMAN", gender: "L", religion: "Islam", classId: "11 P 08", id: "13185" },
  { nis: "13203", nisn: "0074939836", name: "ALDRICH AKBAR PRADITYA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13203" },
  { nis: "13204", nisn: "3081827435", name: "ALEXA SAVIRUS SURAWAN", gender: "P", religion: "Islam", classId: "11 P 08", id: "13204" },
  { nis: "13206", nisn: "0087218464", name: "ALFIAN WIDYATAMA HABIBI", gender: "L", religion: "Islam", classId: "11 P 08", id: "13206" },
  { nis: "13210", nisn: "3085907217", name: "ALMALIA KHALIFI KIRANA PRATIWI", gender: "P", religion: "Islam", classId: "11 P 08", id: "13210" },
  { nis: "13215", nisn: "0099649402", name: "ALYA REGHINA ZAKIA MAKTA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13215" },
  { nis: "13232", nisn: "0085543024", name: "ARDEN BAGAS BIOGRADY", gender: "L", religion: "Islam", classId: "11 P 08", id: "13232" },
  { nis: "13235", nisn: "0091912300", name: "ARI GILANG PRATAMA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13235" },
  { nis: "13239", nisn: "0096405700", name: "ARVELLA PUTRI WAHYUDA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13239" },
  { nis: "13241", nisn: "0083645628", name: "ASFA ABDIA PURWA SABRINA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13241" },
  { nis: "13244", nisn: "0093303245", name: "ASYAFFIYAH PUTRI WIDIARTO", gender: "P", religion: "Islam", classId: "11 P 08", id: "13244" },
  { nis: "13290", nisn: "0087200763", name: "DAVINA SHAFIRA HUSNIAH", gender: "P", religion: "Islam", classId: "11 P 08", id: "13290" },
  { nis: "13296", nisn: "0087658925", name: "DIANDRA BILQIST ASWIN MAULIDA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13296" },
  { nis: "13315", nisn: "3090804422", name: "EVANA ALTAFUNNISA NURSOLICHIN", gender: "P", religion: "Islam", classId: "11 P 08", id: "13315" },
  { nis: "13336", nisn: "0086123648", name: "FITRI NANDA AYU LEFINA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13336" },
  { nis: "13353", nisn: "0083534461", name: "HAQI ELBANA ALFINUHA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13353" },
  { nis: "13363", nisn: "0088187223", name: "INDAH KUSUMA WARDANI", gender: "P", religion: "Islam", classId: "11 P 08", id: "13363" },
  { nis: "13373", nisn: "0091591487", name: "JOVITA ANASTASYA VALENTINA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13373" },
  { nis: "13377", nisn: "0084216691", name: "KAYLA RAGANESIA AULIA SAHRATU", gender: "P", religion: "Islam", classId: "11 P 08", id: "13377" },
  { nis: "13380", nisn: "3097936241", name: "KEVIN FEBRIANSYAH PUTRA PRATAMA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13380" },
  { nis: "13383", nisn: "0087706153", name: "KEYSHI ANGGRAINI SEKARWANGI", gender: "P", religion: "Islam", classId: "11 P 08", id: "13383" },
  { nis: "13394", nisn: "0083228217", name: "LEXY ABHINAYA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13394" },
  { nis: "13398", nisn: "0097343625", name: "LOFLITA OLIVIA ENIRZHA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13398" },
  { nis: "13425", nisn: "0085289187", name: "MUHAMMAD CHAIRUS ANAYO SAPUTRA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13425" },
  { nis: "13440", nisn: "0091171139", name: "MUHAMMAD ROFIF FAWWAS FANDHILAH", gender: "L", religion: "Islam", classId: "11 P 08", id: "13440" },
  { nis: "13450", nisn: "0082389102", name: "NAILA FAIZURA KHAKIM", gender: "P", religion: "Islam", classId: "11 P 08", id: "13450" },
  { nis: "13457", nisn: "0089119511", name: "NAUFAL RAFIF BAGUS ANGGARA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13457" },
  { nis: "13458", nisn: "3089638867", name: "NAURA MUMTAZ ZAHARA EL YAHYA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13458" },
  { nis: "13465", nisn: "0084869373", name: "NIRINA YUANITA SALSABILA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13465" },
  { nis: "13486", nisn: "0096730200", name: "QUEENA BINTANG KEJORA ANNISA NASUTION", gender: "P", religion: "Islam", classId: "11 P 08", id: "13486" },
  { nis: "13492", nisn: "0083009908", name: "RAISA NABIL AL FIZA", gender: "L", religion: "Islam", classId: "11 P 08", id: "13492" },
  { nis: "13499", nisn: "0088338000", name: "RETRYZYA CANTIKA QUMAYROH", gender: "P", religion: "Islam", classId: "11 P 08", id: "13499" },
  { nis: "13507", nisn: "0091325049", name: "RISMA FANISA ANGGRAINI", gender: "P", religion: "Islam", classId: "11 P 08", id: "13507" },
  { nis: "13517", nisn: "0083461815", name: "SABRYA SEKAR ARUM OCTAVIANA", gender: "P", religion: "Islam", classId: "11 P 08", id: "13517" },

  // Page 7 (11 P 09)
  { nis: "13193", nisn: "0087595483", name: "AHMAD DARMAWAN", gender: "L", religion: "Islam", classId: "11 P 09", id: "13193" },
  { nis: "13201", nisn: "0083513650", name: "AL ANALA RHESA AGYA PUTRA", gender: "L", religion: "Islam", classId: "11 P 09", id: "13201" },
  { nis: "13237", nisn: "0099233723", name: "ARKA MIRUNGGA PANGAYOM", gender: "L", religion: "Islam", classId: "11 P 09", id: "13237" },
  { nis: "13250", nisn: "0091139161", name: "AURACINTA PUTRI RONITA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13250" },
  { nis: "13255", nisn: "0094307287", name: "AZKA EKA PUTRA AKBAR", gender: "L", religion: "Islam", classId: "11 P 09", id: "13255" },
  { nis: "13259", nisn: "3080057438", name: "BERLIANDA OKTALIA PUTRI WULANDARI", gender: "P", religion: "Islam", classId: "11 P 09", id: "13259" },
  { nis: "13266", nisn: "0091906302", name: "BRIGITA FAIRUZ ZAHIR", gender: "P", religion: "Islam", classId: "11 P 09", id: "13266" },
  { nis: "13276", nisn: "0094570484", name: "CHEVINA NABILA ZIA FITRIA WAHYU SUGIANTO", gender: "P", religion: "Islam", classId: "11 P 09", id: "13276" },
  { nis: "13285", nisn: "0085701978", name: "DAFRAN AZKA PUTRA SADA", gender: "L", religion: "Islam", classId: "11 P 09", id: "13285" },
  { nis: "13286", nisn: "0085789643", name: "DAMAR HILAL RAFAZHA", gender: "L", religion: "Islam", classId: "11 P 09", id: "13286" },
  { nis: "13292", nisn: "0096925671", name: "DENANDRA CHIARA MAYDINA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13292" },
  { nis: "13297", nisn: "0089712188", name: "DIDAN PUTRA ARIYANTO", gender: "L", religion: "Islam", classId: "11 P 09", id: "13297" },
  { nis: "13306", nisn: "0088056784", name: "EGHY DHIAUDIN", gender: "L", religion: "Islam", classId: "11 P 09", id: "13306" },
  { nis: "13314", nisn: "0085309509", name: "ESTYFANNY CHOLIFATU NISA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13314" },
  { nis: "13324", nisn: "0083345211", name: "FARA AISYAH RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 09", id: "13324" },
  { nis: "13329", nisn: "0091817317", name: "FATIMATUZ ZAHRA MAULIDA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13329" },
  { nis: "13331", nisn: "0094773759", name: "FERDIAN ASPRILINO", gender: "L", religion: "Islam", classId: "11 P 09", id: "13331" },
  { nis: "13344", nisn: "0097689058", name: "GEAS PUSPITASARI", gender: "P", religion: "Islam", classId: "11 P 09", id: "13344" },
  { nis: "13360", nisn: "0092098180", name: "IFFA KARIMA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13360" },
  { nis: "13368", nisn: "0073871670", name: "JENIS ALFIKA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13368" },
  { nis: "13378", nisn: "0093962632", name: "KAZAHRA INTAN APRILIA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13378" },
  { nis: "13402", nisn: "3089129347", name: "MA'RIFAN TAQIYAN RAHMADANI", gender: "P", religion: "Islam", classId: "11 P 09", id: "13402" },
  { nis: "13438", nisn: "3085683275", name: "MUHAMMAD RIDWAN AFANDI", gender: "L", religion: "Islam", classId: "11 P 09", id: "13438" },
  { nis: "13447", nisn: "0096733860", name: "NABILA ZAHWA YITNAMATSANI", gender: "P", religion: "Islam", classId: "11 P 09", id: "13447" },
  { nis: "13454", nisn: "0094475383", name: "NANDITA JULIA ARSHINTA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13454" },
  { nis: "13462", nisn: "0097782631", name: "NESYA ANGGUN AZZAHRA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13462" },
  { nis: "13471", nisn: "3088479262", name: "NOVITA RAHMA ARDIANA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13471" },
  { nis: "13493", nisn: "3084429285", name: "RANUM MANAHHANINGSIH", gender: "P", religion: "Islam", classId: "11 P 09", id: "13493" },
  { nis: "13508", nisn: "0098084467", name: "RISMA PUTRI ZHAFIRA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13508" },
  { nis: "13520", nisn: "3099079614", name: "SANIA AURA ZULFA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13520" },
  { nis: "13528", nisn: "3092869946", name: "SHINTA FAHRANI ARIANTI", gender: "P", religion: "Islam", classId: "11 P 09", id: "13528" },
  { nis: "13531", nisn: "0088381467", name: "SYERIL HANUM KHAFIDATUL AMALIA", gender: "P", religion: "Islam", classId: "11 P 09", id: "13531" },
  { nis: "13539", nisn: "0082828872", name: "TITA PUTRI RAHAYU", gender: "P", religion: "Islam", classId: "11 P 09", id: "13539" },
  { nis: "13543", nisn: "0085971352", name: "UMI AINIL FAIZAH", gender: "P", religion: "Islam", classId: "11 P 09", id: "13543" },

  // Page 8 (11 P 10)
  { nis: "13202", nisn: "0045429533", name: "ALBION ALERON", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13202" },
  { nis: "13213", nisn: "0097263727", name: "ALVIRA YUDITASARI", gender: "P", religion: "Islam", classId: "11 P 10", id: "13213" },
  { nis: "13224", nisn: "0086945758", name: "ANGGI NAMI HARAHAP", gender: "P", religion: "Islam", classId: "11 P 10", id: "13224" },
  { nis: "13228", nisn: "0085719543", name: "ANNA NING VELA", gender: "P", religion: "Islam", classId: "11 P 10", id: "13228" },
  { nis: "13246", nisn: "0095490735", name: "AURA DIASSYIFA", gender: "P", religion: "Islam", classId: "11 P 10", id: "13246" },
  { nis: "13262", nisn: "0096862190", name: "BIANDA NADYA ANNISA", gender: "P", religion: "Kristen", classId: "11 P 10", id: "13262" },
  { nis: "13268", nisn: "3083176921", name: "CALISTA FITRI AZ ZAHRA", gender: "P", religion: "Islam", classId: "11 P 10", id: "13268" },
  { nis: "13279", nisn: "0097295542", name: "CHOIRUNNISA ZAKIYATUN NUFUS", gender: "P", religion: "Islam", classId: "11 P 10", id: "13279" },
  { nis: "13280", nisn: "0095771543", name: "CHRISTIAN JOHN FRANKLIN", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13280" },
  { nis: "13293", nisn: "0087606733", name: "DERREL ALDEN DHARMA KRISNA", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13293" },
  { nis: "13301", nisn: "0089872618", name: "DINAR NETA AULIA", gender: "P", religion: "Kristen", classId: "11 P 10", id: "13301" },
  { nis: "13302", nisn: "0082473501", name: "DINDA NUR ALIM", gender: "P", religion: "Islam", classId: "11 P 10", id: "13302" },
  { nis: "13303", nisn: "0095766428", name: "DOIS GIAPRIL NUR CAHYANTI", gender: "P", religion: "Islam", classId: "11 P 10", id: "13303" },
  { nis: "13304", nisn: "0093828068", name: "DONI FIRNANDO", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13304" },
  { nis: "13330", nisn: "0099834850", name: "FEDERICHA LARASSATI", gender: "P", religion: "Kristen", classId: "11 P 10", id: "13330" },
  { nis: "13342", nisn: "0089488074", name: "GATEN WIDYATMAJA WIBAWA", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13342" },
  { nis: "13343", nisn: "0092954867", name: "GAVRILA SENO EMMANUEL YUSTIRA", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13343" },
  { nis: "13346", nisn: "0102970762", name: "GENDHIS PUTRI BAHARIZKY", gender: "P", religion: "Islam", classId: "11 P 10", id: "13346" },
  { nis: "13369", nisn: "0088038464", name: "JERRY ADAM FIRMANSYAH", gender: "L", religion: "Islam", classId: "11 P 10", id: "13369" },
  { nis: "13374", nisn: "0085736361", name: "JULIUZ CHRISTIANO HERLANDO", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13374" },
  { nis: "13375", nisn: "0083525597", name: "JUSTIN JORDAN ERSA PRANYOTO", gender: "L", religion: "Kristen", classId: "11 P 10", id: "13375" },
  { nis: "13387", nisn: "0082117342", name: "KIKIKANAKU RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 10", id: "13387" },
  { nis: "13422", nisn: "0091207072", name: "MUHAMMAD AFFAN KHALILRANU HANDOKO", gender: "L", religion: "Islam", classId: "11 P 10", id: "13422" },
  { nis: "13445", nisn: "0097572610", name: "NABILA AMELIA", gender: "P", religion: "Islam", classId: "11 P 10", id: "13445" },
  { nis: "13449", nisn: "0091020480", name: "NAFISY TABITA CRISAMARYA", gender: "P", religion: "Kristen", classId: "11 P 10", id: "13449" },
  { nis: "13461", nisn: "0094953136", name: "NAZWA KIRANA IMEDA", gender: "P", religion: "Islam", classId: "11 P 10", id: "13461" },
  { nis: "13463", nisn: "0085809828", name: "NINDYA AGISTA AURELTA", gender: "P", religion: "Kristen", classId: "11 P 10", id: "13463" },
  { nis: "13475", nisn: "0087924999", name: "NURADYAN INTEGRA AGUSTIN", gender: "P", religion: "Islam", classId: "11 P 10", id: "13475" },
  { nis: "13488", nisn: "0099820703", name: "RADITYA DAMARIS", gender: "L", religion: "Islam", classId: "11 P 10", id: "13488" },
  { nis: "13494", nisn: "0082681850", name: "RAYYA ZAKIYA SARI", gender: "P", religion: "Islam", classId: "11 P 10", id: "13494" },
  { nis: "13501", nisn: "0096550037", name: "REVALINA AGUSTINA PUTRI WIBOWO", gender: "P", religion: "Islam", classId: "11 P 10", id: "13501" },
  { nis: "13509", nisn: "0083905046", name: "RIVALDHO DWI PUTRA H,", gender: "L", religion: "Islam", classId: "11 P 10", id: "13509" },
  { nis: "13536", nisn: "3083972549", name: "TALITHA YUMNA CELIA FAIHA", gender: "P", religion: "Islam", classId: "11 P 10", id: "13536" },
  { nis: "13554", nisn: "0093160313", name: "YEMIMA BRENDA CHRISSIA", gender: "P", religion: "Kristen", classId: "11 P 10", id: "13554" },

  // Page 9 (11 P 11)
  { nis: "13190", nisn: "0083952420", name: "AGNES VIANDA RISMAWATI", gender: "P", religion: "Katholik", classId: "11 P 11", id: "13190" },
  { nis: "13209", nisn: "0095060821", name: "ALLANDI ADE FEBIAWAN", gender: "L", religion: "Islam", classId: "11 P 11", id: "13209" },
  { nis: "13216", nisn: "0098385790", name: "AMIRA NURUL IMAN", gender: "P", religion: "Islam", classId: "11 P 11", id: "13216" },
  { nis: "13225", nisn: "0096923100", name: "ANGGUN ADISTIA PUTRI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13225" },
  { nis: "13230", nisn: "0088081750", name: "ANNISA JAZILATA RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13230" },
  { nis: "13233", nisn: "0082564630", name: "ARDYA KHANZA AZ-ZAHRA", gender: "P", religion: "Islam", classId: "11 P 11", id: "13233" },
  { nis: "13242", nisn: "0084042660", name: "ASGY NUZULUL RAMADHANY", gender: "P", religion: "Islam", classId: "11 P 11", id: "13242" },
  { nis: "13249", nisn: "3094802190", name: "AURA VIZKYA ANGGRAINI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13249" },
  { nis: "13252", nisn: "0081687145", name: "AYESHA KHIRANIA AGUSTIEN", gender: "P", religion: "Islam", classId: "11 P 11", id: "13252" },
  { nis: "13254", nisn: "0088711047", name: "AZAHRA ARDYA MAHARDIKA KIRANI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13254" },
  { nis: "13269", nisn: "0084222356", name: "CAMILLA FADHIILAH ARIFIN", gender: "P", religion: "Islam", classId: "11 P 11", id: "13269" },
  { nis: "13287", nisn: "0088970900", name: "DANIS ARKAN PUTRA SADA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13287" },
  { nis: "13291", nisn: "0095338124", name: "DELIMA RIZKY WIDI ASMARA", gender: "P", religion: "Islam", classId: "11 P 11", id: "13291" },
  { nis: "13318", nisn: "0082200925", name: "EXCELL IBRA PRATAMA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13318" },
  { nis: "13319", nisn: "0087984424", name: "FACHRI IMAANUL HAQ", gender: "L", religion: "Islam", classId: "11 P 11", id: "13319" },
  { nis: "13349", nisn: "0087738775", name: "HAIKAL FATHAN NUGRAHA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13349" },
  { nis: "13361", nisn: "0081638581", name: "ILMA AIZZA AN NAFIA", gender: "P", religion: "Islam", classId: "11 P 11", id: "13361" },
  { nis: "13362", nisn: "0093145671", name: "IMANUELLA AYU PUSPITAWATI", gender: "P", religion: "Katholik", classId: "11 P 11", id: "13362" },
  { nis: "13397", nisn: "0084686484", name: "LIS ANISA RAMADHANI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13397" },
  { nis: "13414", nisn: "0097449681", name: "MOHAMMAD ANDRA DWI ERLANGGA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13414" },
  { nis: "13419", nisn: "0082450816", name: "MUHAMAD ARDIAS PUTRA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13419" },
  { nis: "13434", nisn: "3099137446", name: "MUHAMMAD IRSYAD RAIHAN SETIAWAN", gender: "L", religion: "Islam", classId: "11 P 11", id: "13434" },
  { nis: "13451", nisn: "0091320691", name: "NAIYA MELANIE AMIRAH KURNIAWAN", gender: "P", religion: "Islam", classId: "11 P 11", id: "13451" },
  { nis: "13453", nisn: "0089494573", name: "NAJWA QOIRADINES", gender: "P", religion: "Islam", classId: "11 P 11", id: "13453" },
  { nis: "13466", nisn: "0095202809", name: "NISWA DZAKIA SAKHI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13466" },
  { nis: "13474", nisn: "0089835549", name: "NUR FADILAH ASMARA PRIAMBODO", gender: "P", religion: "Islam", classId: "11 P 11", id: "13474" },
  { nis: "13478", nisn: "0091215428", name: "PRABU CHESTA CAKRABHIRAWA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13478" },
  { nis: "13490", nisn: "0081158074", name: "RAHMA ANUGRAH HIDA AGUSTINA", gender: "P", religion: "Islam", classId: "11 P 11", id: "13490" },
  { nis: "13495", nisn: "0088355730", name: "REGINA SAVANI APHRODITYA BARZAN", gender: "P", religion: "Islam", classId: "11 P 11", id: "13495" },
  { nis: "13529", nisn: "0089244648", name: "SUCI RAHMAWATI", gender: "P", religion: "Islam", classId: "11 P 11", id: "13529" },
  { nis: "13534", nisn: "3084934311", name: "TALITHA IMTIYAAZ", gender: "P", religion: "Islam", classId: "11 P 11", id: "13534" },
  { nis: "13538", nisn: "0096536966", name: "TIARA PUTRI NUR FADHIILAH", gender: "P", religion: "Islam", classId: "11 P 11", id: "13538" },
  { nis: "13552", nisn: "0097618996", name: "YASMINE ATHAYA ARRASY", gender: "P", religion: "Islam", classId: "11 P 11", id: "13552" },
  { nis: "13560", nisn: "0087014752", name: "ZAKI AUFAA KAMESWARA", gender: "L", religion: "Islam", classId: "11 P 11", id: "13560" },
];

// Re-map generateStudents to use the DB
export const generateStudents = (classId: string) => {
    return STUDENTS_DB.filter(s => s.classId === classId);
};

export const MOCK_ASSIGNMENTS: Assignment[] = [
    {
        id: '1',
        classId: '11 P 01',
        subject: 'Matematika',
        title: 'Latihan Persamaan Lingkaran',
        deadline: '2025-11-20',
        note: 'Kerjakan di buku latihan hal 45-47',
        category: 'PR'
    },
    {
        id: '2',
        classId: '11 P 01',
        subject: 'Fisika',
        title: 'Laporan Praktikum Gelombang',
        deadline: '2025-11-22',
        note: 'Format PDF, kumpul di GC',
        category: 'Proyek'
    },
    {
        id: '3',
        classId: '11 P 02',
        subject: 'Kimia',
        title: 'Stoikiometri Lanjut',
        deadline: '2025-11-25',
        note: 'Bawa kalkulator saat pembahasan',
        category: 'Kuis'
    }
];

const TIMES = [
    "07:00 - 07:45", // 1
    "07:45 - 08:30", // 2
    "08:30 - 09:15", // 3
    "09:15 - 10:00", // 4
    "10:00 - 10:15", // IST 1
    "10:15 - 11:00", // 5
    "11:00 - 11:45", // 6
    "11:45 - 12:30", // 7
    "12:30 - 13:00", // IST 2
    "13:00 - 13:45", // 8
    "13:45 - 14:30", // 9
    "14:30 - 15:15"  // 10
];

// Helper to create schedule row
const createDay = (day: string, codes: string[]) => {
    let lessonIndex = 0;
    const lessons = [];
    
    for (let i = 0; i < TIMES.length; i++) {
        if (i === 4 || i === 8) { // Breaks
             lessons.push({ time: TIMES[i], subject: "ISTIRAHAT", code: "IST" });
             continue;
        }
        
        const code = codes[lessonIndex] || "-";
        lessons.push({
            time: TIMES[i],
            subject: SUBJECT_MAP[code] || code,
            code: code
        });
        lessonIndex++;
    }
    return { day, lessons };
};

// Schedule Data based on 2025/2026 Schedule
export const SCHEDULES: ScheduleMap = {
    "11 P 01": [
        createDay("Senin", ["U", "PABP", "PABP", "PJOK", "PJOK", "BINGTL", "BINGTL", "BJEP", "BJEP", "BJEP"]),
        createDay("Selasa", ["BJEP", "BJEP", "BJEP", "SR", "SR", "SR", "BIND", "BK", "BK", "SOSI"]),
        createDay("Rabu", ["SOSI", "SOSI", "SOSI", "BIDTL", "BIDTL", "BIDTL", "BINGTL", "BINGTL", "BINGTL", "BJEP"]),
        createDay("Kamis", ["MM", "MM", "BIDTL", "BIDTL", "SEJA", "SEJA", "PRKY", "PRKY", "MLBJ", "MLBJ"]),
        createDay("Jumat", ["BIND", "BIND", "MM", "MM", "PEPA", "BING", "BING", "BING", "PD", "PD"])
    ],
    "11 P 02": [
        createDay("Senin", ["U", "MLBJ", "MLBJ", "BIND", "BIND", "MM", "MM", "BJEP", "BJEP", "BJEP"]),
        createDay("Selasa", ["BK", "BK", "GEOG", "GEOG", "GEOG", "SOSI", "SOSI", "BING", "BING", "BING"]),
        createDay("Rabu", ["EKON", "EKON", "MM", "MM", "SOSI", "SOSI", "PEPA", "PEPA", "GEOG", "GEOG"]),
        createDay("Kamis", ["BIND", "BIND", "SEJA", "SEJA", "BJEP", "BJEP", "SR", "SR", "PRKY", "PRKY"]),
        createDay("Jumat", ["PJOK", "PJOK", "PJOK", "PABP", "PABP", "EKON", "EKON", "PD", "PD", "PD"])
    ],
    "11 P 03": [
        createDay("Senin", ["U", "BING", "BING", "SEJA", "SEJA", "BIND", "BIND", "PEPA", "PEPA", "PEPA"]),
        createDay("Selasa", ["SOSI", "SOSI", "SOSI", "GEOG", "GEOG", "GEOG", "MM", "MM", "BJEP", "BJEP"]),
        createDay("Rabu", ["MM", "MM", "BK", "BK", "PABP", "PABP", "SR", "SR", "SOSI", "SOSI"]),
        createDay("Kamis", ["BJEP", "BJEP", "PRKY", "PRKY", "PJOK", "PJOK", "PJOK", "EKON", "EKON", "EKON"]),
        createDay("Jumat", ["MLBJ", "MLBJ", "BIND", "BIND", "EKON", "EKON", "GEOG", "GEOG", "PD", "PD"])
    ],
    "11 P 04": [
        createDay("Senin", ["U", "MM", "MM", "BJEP", "BJEP", "PEPA", "PEPA", "EKON", "EKON", "EKON"]),
        createDay("Selasa", ["BIND", "BIND", "MM", "MM", "EKON", "EKON", "SOSI", "SOSI", "SOSI", "SOSI"]),
        createDay("Rabu", ["PJOK", "PJOK", "PJOK", "SOSI", "SOSI", "SOSI", "BK", "BK", "BIND", "BIND"]),
        createDay("Kamis", ["MLBJ", "MLBJ", "BJEP", "BJEP", "PABP", "PABP", "SR", "SR", "BING", "BING"]),
        createDay("Jumat", ["SR", "SR", "GEOG", "GEOG", "SEJA", "SEJA", "PRKY", "PRKY", "PD", "PD"])
    ],
    "11 P 05": [
        createDay("Senin", ["U", "PRKY", "PRKY", "EKON", "EKON", "KIMI", "KIMI", "KIMI", "PJOK", "PJOK"]),
        createDay("Selasa", ["PJOK", "BJEP", "BJEP", "GEOG", "GEOG", "BIND", "BIND", "MLBJ", "MLBJ", "MLBJ"]),
        createDay("Rabu", ["SEJA", "SEJA", "MM", "MM", "BJEP", "BJEP", "MLBJ", "MLBJ", "EKON", "EKON"]),
        createDay("Kamis", ["KIMI", "KIMI", "BING", "BING", "BING", "BIND", "BIND", "GEOG", "GEOG", "GEOG"]),
        createDay("Jumat", ["PABP", "PABP", "MM", "MM", "SR", "SR", "PEPA", "PEPA", "PD", "PD"])
    ],
    "11 P 06": [
        createDay("Senin", ["U", "BIND", "BIND", "PEPA", "PEPA", "PABP", "PABP", "EKON", "EKON", "EKON"]),
        createDay("Selasa", ["PJOK", "PJOK", "PJOK", "MLBJ", "MLBJ", "BING", "BING", "INFO", "INFO", "INFO"]),
        createDay("Rabu", ["BIOL", "BIOL", "BIOL", "KIMI", "KIMI", "INFO", "INFO", "SR", "SR", "SR"]),
        createDay("Kamis", ["PRKY", "PRKY", "MM", "MM", "EKON", "EKON", "KIMI", "KIMI", "KIMI", "KIMI"]),
        createDay("Jumat", ["BIOL", "BIOL", "SEJA", "SEJA", "BIND", "BIND", "BK", "BK", "PD", "PD"])
    ],
    "11 P 07": [
        createDay("Senin", ["U", "MM", "MM", "BIND", "BIND", "MLBJ", "MLBJ", "BIOL", "BIOL", "BIOL"]),
        createDay("Selasa", ["KIMI", "KIMI", "INFO", "INFO", "MM", "MM", "BIOL", "BIOL", "PRKY", "PRKY"]),
        createDay("Rabu", ["EKON", "EKON", "KIMI", "KIMI", "KIMI", "SEJA", "SEJA", "BIND", "BIND", "BIND"]),
        createDay("Kamis", ["PJOK", "PJOK", "PJOK", "SR", "SR", "PEPA", "PEPA", "BING", "BING", "BING"]),
        createDay("Jumat", ["INFO", "INFO", "EKON", "EKON", "EKON", "PABP", "PABP", "PD", "PD", "PD"])
    ],
    "11 P 08": [
        createDay("Senin", ["U", "SEJA", "SEJA", "MLBJ", "MLBJ", "BIND", "BIND", "INFO", "INFO", "INFO"]),
        createDay("Selasa", ["FISI", "FISI", "BIOL", "BIOL", "BIOL", "BIND", "BIND", "PABP", "PABP", "PABP"]),
        createDay("Rabu", ["PJOK", "PJOK", "PJOK", "MM", "MM", "PEPA", "PEPA", "BK", "BK", "PRKY"]),
        createDay("Kamis", ["BING", "BING", "INFO", "INFO", "MM", "MM", "KIMI", "KIMI", "KIMI", "KIMI"]),
        createDay("Jumat", ["KIMI", "KIMI", "SR", "SR", "BIOL", "BIOL", "FISI", "FISI", "PD", "PD"])
    ],
    "11 P 09": [
        createDay("Senin", ["U", "FISI", "FISI", "MM", "MM", "SR", "SR", "KIMI", "KIMI", "KIMI"]),
        createDay("Selasa", ["MLBJ", "MLBJ", "PABP", "PABP", "KIMI", "KIMI", "BIOL", "BIOL", "BIOL", "BIOL"]),
        createDay("Rabu", ["BIND", "BIND", "BIOL", "BIOL", "MMTL", "MMTL", "PEPA", "BK", "BK", "BK"]),
        createDay("Kamis", ["MM", "MM", "PRKY", "PRKY", "BIND", "BIND", "FISI", "FISI", "SEJA", "SEJA"]),
        createDay("Jumat", ["PJOK", "PJOK", "PJOK", "BING", "BING", "MMTL", "MMTL", "PD", "PD", "PD"])
    ],
    "11 P 10": [
        createDay("Senin", ["U", "PABP", "PABP", "KIMI", "KIMI", "SEJA", "SEJA", "PEPA", "PEPA", "PEPA"]),
        createDay("Selasa", ["MM", "MM", "FISI", "FISI", "MLBJ", "MLBJ", "MMTL", "MMTL", "MMTL", "MMTL"]),
        createDay("Rabu", ["BIOL", "BIOL", "BIOL", "FISI", "FISI", "PRKY", "PRKY", "PJOK", "PJOK", "PJOK"]),
        createDay("Kamis", ["SR", "SR", "KIMI", "KIMI", "BK", "BIND", "BIND", "MM", "MM", "MM"]),
        createDay("Jumat", ["BIOL", "BIOL", "BIND", "BIND", "MMTL", "MMTL", "BING", "BING", "PD", "PD"])
    ],
    "11 P 11": [
        createDay("Senin", ["U", "BIOL", "BIOL", "MMTL", "MMTL", "FISI", "FISI", "MLBJ", "MLBJ", "MLBJ"]),
        createDay("Selasa", ["PEPA", "PEPA", "PJOK", "PJOK", "PJOK", "SR", "SR", "PRKY", "PRKY", "PRKY"]),
        createDay("Rabu", ["BING", "BING", "BIND", "BIND", "BIND", "MM", "MM", "BIOL", "BIOL", "BIOL"]),
        createDay("Kamis", ["MMTL", "MMTL", "FISI", "FISI", "FISI", "KIMI", "KIMI", "PABP", "PABP", "PABP"]),
        createDay("Jumat", ["SEJA", "SEJA", "KIMI", "KIMI", "MM", "MM", "BIND", "PD", "PD", "PD"])
    ],
};

export const ATTENDANCE_COLORS = {
    [AttendanceStatus.HADIR]: "#22c55e", // Green 500
    [AttendanceStatus.SAKIT]: "#3b82f6", // Blue 500
    [AttendanceStatus.IZIN]: "#eab308", // Yellow 500
    [AttendanceStatus.DISPENSASI]: "#a855f7", // Purple 500
    [AttendanceStatus.ALPA]: "#ef4444", // Red 500
    [AttendanceStatus.UNSET]: "#94a3b8", // Slate 400
};
