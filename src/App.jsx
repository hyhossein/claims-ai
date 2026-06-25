import { useState, useRef } from "react";
import { CheckCircle, AlertTriangle, Clock, FileText, ChevronRight, ChevronLeft, X, Loader2, Shield, User, TrendingUp, Camera, Zap, Brain, UserCheck, Send, Layers, ScanSearch, Tag, Calculator, ChevronDown, ChevronUp, AlertCircle, History, Scale, Edit3, ArrowRight, Plus, Check, Crosshair, Globe, Upload } from "lucide-react";

// ── i18n: Arabic-first with English toggle ─────────────────────────────
const TX = {
  en: {
    title: "ClaimsAI", subtitle: "Intelligent Damage Assessment", dashboard: "Claims Dashboard",
    dashSub: "AI-assisted damage assessment pipeline", newAssess: "New AI Assessment",
    openClaims: "Open Claims", newToday: "3 new today", aiProcessed: "AI Processed", thisMonth: "This month",
    avgTime: "Avg. Time", vsManual: "vs 45 min manual", trainQueue: "Training Queue", corrPending: "Corrections pending retrain",
    recentClaims: "Recent Claims", claimId: "CLAIM ID", policyholder: "POLICYHOLDER", vehicle: "VEHICLE",
    status: "STATUS", estimate: "ESTIMATE",
    aiReview: "AI Review", seniorReview: "Senior Review", approved: "Approved", completed: "Completed",
    claimInfo: "Claim Information", claimInfoSub: "Enter policyholder and vehicle details.",
    policyNum: "Policy Number", fullName: "Full Name", make: "Make", model: "Model", year: "Year",
    incidentDate: "Date of Incident", description: "Description", uploadPhotos: "Upload Photos",
    photoTitle: "Upload Damage Photos", photoSub: "Multiple angles improve AI accuracy.",
    dropPhotos: "Drop photos here or click to browse", photoTypes: "JPG, PNG, WEBP. Multiple files.",
    recAngles: "Recommended Angles", covered: "covered", front: "Front view", leftSide: "Left side",
    rightSide: "Right side", closeUp: "Close-up", missing: "Missing",
    moreAngles: "More angles improve AI accuracy by 15-25%.", addMore: "Add more photos.",
    analyzeAI: "Analyze with AI", analyzing: "AI Analyzing Damage", analyzingSub: "Processing through multi-stage pipeline...",
    assessment: "AI Damage Assessment", assessSub: "Review, annotate, and adjust.",
    severity: "SEVERITY", confidence: "CONFIDENCE", estCost: "EST. COST",
    whyConf: "Why this confidence?", imgClarity: "Image Clarity", regionCons: "Region Consensus",
    patternMatch: "Pattern Match", dbCoverage: "DB Coverage",
    routing: "Routing", routeAuto: "Auto-Approve Eligible", routeSenior: "Senior Review Required",
    inconsistency: "Inconsistency Detected", dmgRegions: "Damage Regions", addRegion: "+ Add region",
    clickPin: "Click image to pin", reviewRegions: "Review AI regions above", confirmed: "confirmed",
    rejected: "rejected", added: "added", annToTrain: "annotations → training",
    showPipeline: "Show Pipeline", hidePipeline: "Hide Pipeline",
    dmgBreakdown: "Damage Breakdown", areas: "areas", area: "AREA", type: "TYPE", cost: "COST", adj: "ADJ.",
    compClaims: "Comparable Past Claims", aiAccSimilar: "AI accuracy on similar",
    aiSummary: "AI Summary", agentNotes: "Agent Notes", notesPlaceholder: "Observations, corrections, notes...",
    reviewSubmit: "Review & Submit", reviewSub: "Confirm and route.",
    claimSummary: "Claim Summary", policy: "Policy", holder: "Holder", vehicleLbl: "Vehicle", incident: "Incident",
    aiAssessment: "AI Assessment", autoApprove: "Auto-Approve", autoApproveSub: "Generate repair authorization immediately.",
    seniorAdj: "Senior Adjuster", seniorAdjSub: "Flag for manual review.",
    submit: "Submit", submitted: "Assessment Submitted",
    submittedAutoMsg: "Claim auto-approved.", submittedSeniorMsg: "Routed to senior adjuster.",
    timeSaved: "Time saved", vsManualAssess: "min vs manual", back: "Back", backDash: "Dashboard",
    next: "Next", reviewBtn: "Review & Submit", returnDash: "Return to Dashboard",
    modelHealth: "agent corrections queued. Data flywheel improving accuracy monthly.",
    nextRetrain: "Next retrain", annQueued: "annotations queued for model retrain.",
    minor: "Minor", moderate: "Moderate", sev: "Severe", totalLoss: "Total Loss",
    autoRec: "Auto-Approve", manualRev: "Manual Review", seniorRev: "Senior Review",
    currency: "QAR", currSymbol: "ر.ق",
  },
  ar: {
    title: "كليمز إيه آي", subtitle: "تقييم الأضرار الذكي", dashboard: "لوحة المطالبات",
    dashSub: "خط معالجة تقييم الأضرار بالذكاء الاصطناعي", newAssess: "تقييم جديد",
    openClaims: "مطالبات مفتوحة", newToday: "٣ جديدة اليوم", aiProcessed: "معالجة بالذكاء", thisMonth: "هذا الشهر",
    avgTime: "متوسط الوقت", vsManual: "مقابل ٤٥ دقيقة يدوياً", trainQueue: "قائمة التدريب", corrPending: "تصحيحات بانتظار التدريب",
    recentClaims: "المطالبات الأخيرة", claimId: "رقم المطالبة", policyholder: "صاحب البوليصة", vehicle: "المركبة",
    status: "الحالة", estimate: "التقدير",
    aiReview: "مراجعة ذكية", seniorReview: "مراجعة أقدم", approved: "معتمد", completed: "مكتمل",
    claimInfo: "معلومات المطالبة", claimInfoSub: "أدخل بيانات صاحب البوليصة والمركبة.",
    policyNum: "رقم البوليصة", fullName: "الاسم الكامل", make: "الشركة المصنعة", model: "الطراز", year: "السنة",
    incidentDate: "تاريخ الحادث", description: "الوصف", uploadPhotos: "رفع الصور",
    photoTitle: "رفع صور الأضرار", photoSub: "زوايا متعددة تحسن دقة التحليل.",
    dropPhotos: "اسحب الصور هنا أو انقر للتصفح", photoTypes: "JPG, PNG, WEBP. ملفات متعددة.",
    recAngles: "الزوايا الموصى بها", covered: "مغطاة", front: "الأمام", leftSide: "الجانب الأيسر",
    rightSide: "الجانب الأيمن", closeUp: "لقطة قريبة", missing: "مفقود",
    moreAngles: "المزيد من الزوايا يحسن الدقة بنسبة ١٥-٢٥٪.", addMore: "أضف المزيد من الصور.",
    analyzeAI: "تحليل بالذكاء الاصطناعي", analyzing: "جاري تحليل الأضرار", analyzingSub: "المعالجة عبر خط الأنابيب...",
    assessment: "تقييم الأضرار الذكي", assessSub: "راجع، علّق، وعدّل.",
    severity: "الشدة", confidence: "الثقة", estCost: "التكلفة المقدرة",
    whyConf: "لماذا هذه الثقة؟", imgClarity: "وضوح الصورة", regionCons: "توافق المناطق",
    patternMatch: "تطابق النمط", dbCoverage: "تغطية قاعدة البيانات",
    routing: "التوجيه", routeAuto: "مؤهل للموافقة التلقائية", routeSenior: "مطلوب مراجعة أقدم",
    inconsistency: "تم اكتشاف تناقض", dmgRegions: "مناطق الضرر", addRegion: "+ إضافة منطقة",
    clickPin: "انقر على الصورة لتحديد", reviewRegions: "راجع مناطق الذكاء أعلاه", confirmed: "مؤكد",
    rejected: "مرفوض", added: "مضاف", annToTrain: "تعليقات ← تدريب",
    showPipeline: "إظهار المسار", hidePipeline: "إخفاء المسار",
    dmgBreakdown: "تفصيل الأضرار", areas: "مناطق", area: "المنطقة", type: "النوع", cost: "التكلفة", adj: "تعديل",
    compClaims: "مطالبات مشابهة سابقة", aiAccSimilar: "دقة الذكاء على المشابه",
    aiSummary: "ملخص الذكاء الاصطناعي", agentNotes: "ملاحظات الوكيل", notesPlaceholder: "ملاحظات، تصحيحات...",
    reviewSubmit: "مراجعة وإرسال", reviewSub: "تأكيد والتوجيه.",
    claimSummary: "ملخص المطالبة", policy: "البوليصة", holder: "صاحب البوليصة", vehicleLbl: "المركبة", incident: "الحادث",
    aiAssessment: "تقييم الذكاء", autoApprove: "موافقة تلقائية", autoApproveSub: "إصدار تفويض الإصلاح فوراً.",
    seniorAdj: "المراجع الأقدم", seniorAdjSub: "إحالة للمراجعة اليدوية.",
    submit: "إرسال", submitted: "تم إرسال التقييم",
    submittedAutoMsg: "تمت الموافقة على المطالبة.", submittedSeniorMsg: "تم التوجيه للمراجع الأقدم.",
    timeSaved: "الوقت الموفر", vsManualAssess: "دقيقة مقابل اليدوي", back: "رجوع", backDash: "اللوحة",
    next: "التالي", reviewBtn: "مراجعة وإرسال", returnDash: "العودة إلى اللوحة",
    modelHealth: "تصحيح وكيل بانتظار التدريب. دورة تحسين البيانات شهرياً.",
    nextRetrain: "التدريب القادم", annQueued: "تعليق في قائمة التدريب.",
    minor: "طفيف", moderate: "متوسط", sev: "شديد", totalLoss: "خسارة كلية",
    autoRec: "موافقة تلقائية", manualRev: "مراجعة يدوية", seniorRev: "مراجعة أقدم",
    currency: "QAR", currSymbol: "ر.ق",
  }
};

// ── Gulf mock data ─────────────────────────────────────────────────────
const CLAIMS_DATA = {
  en: [
    { id: "CLM-7821", holder: "Mohammed bin Ahmed Al-Thani", vehicle: "2024 Toyota Land Cruiser", status: "ai_review", date: "2026-06-23", estimate: null },
    { id: "CLM-7820", holder: "Fatima bint Khalid Al-Mansoori", vehicle: "2023 Nissan Patrol", status: "approved", date: "2026-06-22", estimate: "10,340" },
    { id: "CLM-7819", holder: "Abdullah bin Hassan Al-Suwaidi", vehicle: "2023 Lexus LX 600", status: "pending_senior", date: "2026-06-22", estimate: "29,670" },
    { id: "CLM-7818", holder: "Noura bint Salem Al-Kuwari", vehicle: "2022 Mercedes G 63", status: "approved", date: "2026-06-21", estimate: "4,440" },
    { id: "CLM-7817", holder: "Omar bin Youssef Al-Marri", vehicle: "2024 Range Rover Vogue", status: "completed", date: "2026-06-20", estimate: "20,640" },
  ],
  ar: [
    { id: "CLM-7821", holder: "محمد بن أحمد آل ثاني", vehicle: "٢٠٢٤ تويوتا لاند كروزر", status: "ai_review", date: "2026-06-23", estimate: null },
    { id: "CLM-7820", holder: "فاطمة بنت خالد المنصوري", vehicle: "٢٠٢٣ نيسان باترول", status: "approved", date: "2026-06-22", estimate: "١٠٬٣٤٠" },
    { id: "CLM-7819", holder: "عبدالله بن حسن السويدي", vehicle: "٢٠٢٣ لكزس LX 600", status: "pending_senior", date: "2026-06-22", estimate: "٢٩٬٦٧٠" },
    { id: "CLM-7818", holder: "نورة بنت سالم الكواري", vehicle: "٢٠٢٢ مرسيدس G 63", status: "approved", date: "2026-06-21", estimate: "٤٬٤٤٠" },
    { id: "CLM-7817", holder: "عمر بن يوسف المري", vehicle: "٢٠٢٤ رينج روفر فوج", status: "completed", date: "2026-06-20", estimate: "٢٠٬٦٤٠" },
  ]
};

const MOCK_REGIONS = [
  { id: "R1", label: "Front Bumper", labelAr: "المصد الأمامي", x: 15, y: 55, w: 35, h: 25, color: "#f59e0b" },
  { id: "R2", label: "Hood", labelAr: "غطاء المحرك", x: 20, y: 30, w: 30, h: 20, color: "#22c55e" },
  { id: "R3", label: "Headlight (L)", labelAr: "المصباح (يسار)", x: 10, y: 40, w: 12, h: 15, color: "#f59e0b" },
];

const COMP_CLAIMS = [
  { id: "CLM-7204", vehicle: "2023 Toyota Land Cruiser", vehicleAr: "٢٠٢٣ تويوتا لاند كروزر", damage: "Front bumper dent", damageAr: "انبعاج المصد الأمامي", finalCost: 6120, aiEst: 6380, delta: "+4.2%" },
  { id: "CLM-6891", vehicle: "2023 Nissan Patrol", vehicleAr: "٢٠٢٣ نيسان باترول", damage: "Bumper + headlight", damageAr: "مصد + مصباح", finalCost: 8050, aiEst: 7650, delta: "-5.0%" },
];

let scenarioIdx = 0;
const SCENARIOS = {
  moderate: { overallSeverity: "moderate", confidenceScore: 0.87, damages: [
    { area: "Front Bumper", areaAr: "المصد الأمامي", type: "Dent & Scratch", typeAr: "انبعاج وخدش", severity: "moderate", estimatedCost: { low: 2900, high: 4400 }, region: "R1", dbRef: "CCC-ONE #BMP-DN-M" },
    { area: "Hood", areaAr: "غطاء المحرك", type: "Surface Scratch", typeAr: "خدش سطحي", severity: "minor", estimatedCost: { low: 1100, high: 1800 }, region: "R2", dbRef: "CCC-ONE #HOD-SC-L" },
    { area: "Headlight (Left)", areaAr: "المصباح (يسار)", type: "Crack", typeAr: "شرخ", severity: "moderate", estimatedCost: { low: 1500, high: 2500 }, region: "R3", dbRef: "Mitchell #HL-CR-M" },
  ], totalEstimate: { low: 5500, high: 8700 }, recommendation: "auto_approve",
    summary: "Moderate front-end collision. Impact on bumper with cosmetic damage to hood and headlight. No structural compromise. Standard repair recommended.",
    summaryAr: "اصطدام أمامي متوسط. تأثير على المصد مع ضرر تجميلي لغطاء المحرك والمصباح. لا يوجد ضرر هيكلي. يوصى بالإصلاح القياسي.",
    confidenceBreakdown: { imageClarity: 0.92, regionOverlap: 0.85, patternMatch: 0.88, databaseCoverage: 0.83 }, inconsistencies: [] },
  severe: { overallSeverity: "severe", confidenceScore: 0.72, damages: [
    { area: "Frame Rail", areaAr: "إطار الهيكل", type: "Structural Deformation", typeAr: "تشوه هيكلي", severity: "severe", estimatedCost: { low: 12700, high: 20000 }, region: "R1", dbRef: "Mitchell #FRM-SD-S" },
    { area: "Radiator Support", areaAr: "دعامة المبرد", type: "Crush Damage", typeAr: "ضرر سحق", severity: "severe", estimatedCost: { low: 6500, high: 9500 }, region: "R2", dbRef: "CCC-ONE #RAD-CR-S" },
    { area: "Bumper Assembly", areaAr: "مجموعة المصد", type: "Replacement", typeAr: "استبدال", severity: "severe", estimatedCost: { low: 4400, high: 6500 }, region: "R3", dbRef: "CCC-ONE #BMP-RP-S" },
  ], totalEstimate: { low: 23600, high: 36000 }, recommendation: "senior_review",
    summary: "Severe front-end collision with structural involvement. Frame rail deformation requires specialized repair. Senior review strongly recommended.",
    summaryAr: "اصطدام أمامي شديد مع تأثر هيكلي. تشوه إطار الهيكل يتطلب إصلاح متخصص. يوصى بشدة بمراجعة أقدم.",
    confidenceBreakdown: { imageClarity: 0.85, regionOverlap: 0.68, patternMatch: 0.71, databaseCoverage: 0.64 },
    inconsistencies: ["Structural damage detected but description indicates low-speed parking incident."] },
  minor: { overallSeverity: "minor", confidenceScore: 0.94, damages: [
    { area: "Rear Bumper", areaAr: "المصد الخلفي", type: "Surface Scratch", typeAr: "خدش سطحي", severity: "minor", estimatedCost: { low: 700, high: 1300 }, region: "R1", dbRef: "CCC-ONE #BMP-SC-L" },
  ], totalEstimate: { low: 700, high: 1300 }, recommendation: "auto_approve",
    summary: "Minor cosmetic scratch on rear bumper. Paint touch-up sufficient. Well within auto-approval thresholds.",
    summaryAr: "خدش تجميلي طفيف على المصد الخلفي. لمسة طلاء كافية. ضمن حدود الموافقة التلقائية.",
    confidenceBreakdown: { imageClarity: 0.96, regionOverlap: 0.95, patternMatch: 0.93, databaseCoverage: 0.92 }, inconsistencies: [] },
};
function getNextMock() { const k = ["moderate","severe","minor"][scenarioIdx++%3]; return SCENARIOS[k]; }

// ── Utility ────────────────────────────────────────────────────────────
const fmtQAR = (n, lang) => lang === "ar" ? `${n.toLocaleString("ar-SA")} ر.ق` : `QAR ${n.toLocaleString()}`;
const sevColor = { minor: "text-emerald-600 bg-emerald-50 border-emerald-200", moderate: "text-amber-600 bg-amber-50 border-amber-200", severe: "text-red-600 bg-red-50 border-red-200", total_loss: "text-red-800 bg-red-100 border-red-300" };
const hijriDate = (dateStr) => { try { return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day:'numeric', month:'long', year:'numeric' }).format(new Date(dateStr)); } catch { return dateStr; } };

// ── Shared UI ──────────────────────────────────────────────────────────
function Badge({ status, t }) { const cfgs = { ai_review: { l: t.aiReview, c: "bg-blue-100 text-blue-700", i: Brain }, pending_senior: { l: t.seniorReview, c: "bg-amber-100 text-amber-700", i: Clock }, approved: { l: t.approved, c: "bg-emerald-100 text-emerald-700", i: CheckCircle }, completed: { l: t.completed, c: "bg-gray-100 text-gray-600", i: FileText } }; const cf = cfgs[status]; if(!cf) return null; const I=cf.i; return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cf.c}`}><I size={12}/>{cf.l}</span>; }

function Stat({ icon: I, label, value, sub, accent="text-blue-600" }) {
  return <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"><span className={`p-2 rounded-lg bg-gray-50 ${accent} inline-flex mb-3`}><I size={18}/></span><p className="text-2xl font-bold text-gray-900">{value}</p><p className="text-sm text-gray-500 mt-0.5">{label}</p>{sub&&<p className="text-xs text-gray-400 mt-1">{sub}</p>}</div>;
}

function Steps({ current, steps, lang }) {
  return <div className={`flex items-center gap-2 mb-8 ${lang==="ar"?"flex-row-reverse":""}`}>{steps.map((s,i)=><div key={i} className={`flex items-center gap-2 ${lang==="ar"?"flex-row-reverse":""}`}><div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${i+1===current?"bg-blue-600 text-white":i+1<current?"bg-emerald-100 text-emerald-700":"bg-gray-100 text-gray-400"}`}>{i+1<current?<CheckCircle size={14}/>:<span className="w-5 h-5 flex items-center justify-center text-xs">{lang==="ar"?["١","٢","٣","٤"][i]:i+1}</span>}<span className="hidden sm:inline">{s}</span></div>{i<steps.length-1&&<ChevronRight size={16} className={`text-gray-300 ${lang==="ar"?"rotate-180":""}`}/>}</div>)}</div>;
}

// ── Pipeline Trace ─────────────────────────────────────────────────────
function PipelineTrace({ stage }) {
  const stgs = [{key:"preprocess",icon:Layers,l:"Preprocessing"},{key:"detect",icon:ScanSearch,l:"Detection"},{key:"classify",icon:Tag,l:"Classification"},{key:"estimate",icon:Calculator,l:"Cost Estimation"},{key:"confidence",icon:Shield,l:"Confidence"}];
  const idx=["preprocess","detect","classify","estimate","confidence"].indexOf(stage);
  return <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono"><div className="text-gray-400 text-xs uppercase tracking-wider mb-3">Pipeline</div><div className="space-y-1.5">{stgs.map((s,i)=>{const d=i<idx,a=i===idx;return<div key={s.key} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg ${a?"bg-blue-950 border border-blue-800":d?"opacity-70":"opacity-30"}`}>{d?<CheckCircle size={14} className="text-emerald-400 shrink-0"/>:a?<Loader2 size={14} className="text-blue-400 animate-spin shrink-0"/>:<div className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0"/>}<span className={d?"text-emerald-300":a?"text-blue-300":"text-gray-500"}>{s.l}</span></div>})}</div></div>;
}

// ── Interactive Annotator ──────────────────────────────────────────────
function Annotator({ photo, regions, hl, setHl, ann, setAnn, t, lang }) {
  const [addMode, setAddMode] = useState(false);
  const imgRef = useRef(null);
  const toggle = (id, action) => setAnn(p => ({ ...p, [id]: action }));
  const handleClick = (e) => { if (!addMode || !imgRef.current) return; const r = imgRef.current.getBoundingClientRect(); const x = ((e.clientX-r.left)/r.width*100).toFixed(0); const y = ((e.clientY-r.top)/r.height*100).toFixed(0); setAnn(p => ({...p,[`A${Date.now()}`]:{type:"agent_added",x:+x,y:+y,label:`Pin #${Object.values(p).filter(v=>v?.type==="agent_added").length+1}`}})); setAddMode(false); };
  const conf=Object.values(ann).filter(v=>v==="confirmed").length, rej=Object.values(ann).filter(v=>v==="rejected").length, added=Object.values(ann).filter(v=>v?.type==="agent_added").length, total=conf+rej+added;
  return <div>
    <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-gray-700">{t.dmgRegions}</span><button onClick={()=>setAddMode(!addMode)} className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${addMode?"bg-blue-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{addMode?<><Crosshair size={11}/>{t.clickPin}</>:<><Plus size={11}/>{t.addRegion}</>}</button></div>
    <div ref={imgRef} className={`relative rounded-lg overflow-hidden border-2 ${addMode?"border-blue-500 cursor-crosshair":"border-gray-200"}`} onClick={handleClick}>
      <img src={photo} alt="Damage" className="w-full h-52 object-cover"/>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {regions.map(r=>{const st=ann[r.id],isR=st==="rejected",isC=st==="confirmed";return<g key={r.id}><rect x={r.x} y={r.y} width={r.w} height={r.h} fill={isC?"rgba(34,197,94,0.12)":isR?"rgba(239,68,68,0.08)":"rgba(245,158,11,0.1)"} stroke={isC?"#22c55e":isR?"#ef4444":r.color} strokeWidth={hl===r.id?"1.2":"0.6"} strokeDasharray={isC?"none":"2,1"} rx="1" opacity={isR?0.25:hl===r.id?1:0.75}/><rect x={r.x} y={r.y-4.5} width={(lang==="ar"?r.labelAr:r.label).length*1.5+6} height="4.5" fill={isC?"#22c55e":isR?"#ef4444":r.color} rx="0.5" opacity="0.9"/><text x={r.x+1} y={r.y-1.5} fill="white" fontSize="2.5" fontFamily="system-ui" fontWeight="600">{isC?"✓ ":isR?"✗ ":""}{lang==="ar"?r.labelAr:r.label}</text></g>})}
        {Object.entries(ann).filter(([_,v])=>v?.type==="agent_added").map(([id,v])=><g key={id}><circle cx={v.x} cy={v.y} r="2.5" fill="#7c3aed" stroke="white" strokeWidth="0.5"/><text x={v.x+3.5} y={v.y+1} fill="#7c3aed" fontSize="2.2" fontFamily="system-ui" fontWeight="600">{v.label}</text></g>)}
      </svg>
    </div>
    <div className="mt-2 space-y-1">{regions.map(r=>{const st=ann[r.id];return<div key={r.id} className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs ${hl===r.id?"bg-blue-50":"hover:bg-gray-50"}`} onMouseEnter={()=>setHl(r.id)} onMouseLeave={()=>setHl(null)}><span className="text-gray-700 font-medium">{lang==="ar"?r.labelAr:r.label}</span><div className="flex gap-1"><button onClick={()=>toggle(r.id,"confirmed")} className={`p-1 rounded ${st==="confirmed"?"bg-emerald-500 text-white":"bg-gray-100 text-gray-400 hover:bg-emerald-100"}`}><Check size={12}/></button><button onClick={()=>toggle(r.id,"rejected")} className={`p-1 rounded ${st==="rejected"?"bg-red-500 text-white":"bg-gray-100 text-gray-400 hover:bg-red-100"}`}><X size={12}/></button></div></div>})}</div>
    <div className="mt-2 bg-violet-50 border border-violet-200 rounded-lg px-3 py-2 flex items-center justify-between"><div className="flex items-center gap-3 text-xs">{conf>0&&<span className="text-emerald-700 font-medium">{conf} {t.confirmed}</span>}{rej>0&&<span className="text-red-600 font-medium">{rej} {t.rejected}</span>}{added>0&&<span className="text-violet-700 font-medium">{added} {t.added}</span>}{total===0&&<span className="text-violet-600">{t.reviewRegions}</span>}</div>{total>0&&<span className="text-xs text-violet-600">{total} {t.annToTrain}</span>}</div>
  </div>;
}

// ── Photo Guidance ─────────────────────────────────────────────────────
function PhotoGuide({ photos, t, onUpload }) {
  const angles = [{l:t.front,i:"↑"},{l:t.leftSide,i:"←"},{l:t.rightSide,i:"→"},{l:t.closeUp,i:"⊕"}];
  const cov = Math.min(photos.length, 4);
  return <div className="mt-4"><div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-gray-700">{t.recAngles}</span><span className="text-xs text-gray-400">{cov}/4 {t.covered}</span></div><div className="grid grid-cols-4 gap-2">{angles.map((a,i)=>{const has=i<photos.length;return<div key={i} onClick={has?undefined:onUpload} className={`flex flex-col items-center p-2.5 rounded-lg border text-center transition-colors ${has?"bg-emerald-50 border-emerald-200":"bg-gray-50 border-gray-200 border-dashed cursor-pointer hover:border-blue-400 hover:bg-blue-50"}`}><span className={`text-lg mb-1 ${has?"":"opacity-30"}`}>{a.i}</span><span className={`text-xs font-medium ${has?"text-emerald-700":"text-gray-400"}`}>{a.l}</span>{has?<CheckCircle size={12} className="text-emerald-500 mt-1"/>:<span className="text-xs text-blue-500 mt-1">{t.missing}</span>}</div>})}</div>{cov<3&&<p className="text-xs text-amber-600 mt-2 flex items-center gap-1"><AlertCircle size={12}/>{t.moreAngles}</p>}</div>;
}

// ── Confidence Breakdown ───────────────────────────────────────────────
function ConfBD({ bd, t }) { if(!bd) return null; return <div className="mt-3 pt-3 border-t border-blue-200"><p className="text-xs font-semibold text-blue-700 mb-2">{t.whyConf}</p><div className="space-y-1.5">{[{k:"imageClarity",l:t.imgClarity},{k:"regionOverlap",l:t.regionCons},{k:"patternMatch",l:t.patternMatch},{k:"databaseCoverage",l:t.dbCoverage}].map(f=>{const v=Math.round(bd[f.k]*100),c=v>=85?"bg-emerald-500":v>=70?"bg-amber-500":"bg-red-500";return<div key={f.k} className="flex items-center gap-2"><span className="text-xs text-blue-700 w-28 shrink-0">{f.l}</span><div className="flex-1 bg-blue-200 rounded-full h-1.5"><div className={`${c} h-1.5 rounded-full`} style={{width:`${v}%`}}/></div><span className="text-xs font-mono text-blue-600 w-8 text-right">{v}%</span></div>})}</div></div>; }

// ── Routing Decision ───────────────────────────────────────────────────
function Routing({ a, t, lang }) {
  const mid=Math.round((a.totalEstimate.low+a.totalEstimate.high)/2),cp=mid<=10900,cf=a.confidenceScore>=0.85,nf=!(a.inconsistencies?.length);const ok=cp&&cf&&nf;
  return <div className={`rounded-xl border p-4 mb-5 ${ok?"bg-emerald-50 border-emerald-200":"bg-amber-50 border-amber-200"}`}>
    <div className="flex items-center gap-2 mb-2.5"><Scale size={16} className={ok?"text-emerald-600":"text-amber-600"}/><span className={`text-sm font-semibold ${ok?"text-emerald-800":"text-amber-800"}`}>{t.routing}: {ok?t.routeAuto:t.routeSenior}</span></div>
    <div className="space-y-1.5">{[{l:`${t.estCost} ${fmtQAR(mid,lang)} ${cp?"≤":">"} ${fmtQAR(10900,lang)}`,p:cp},{l:`${t.confidence} ${Math.round(a.confidenceScore*100)}% ${cf?"≥":"<"} 85%`,p:cf},{l:`${t.inconsistency}: ${nf?"—":"⚠"}`,p:nf}].map((r,i)=><div key={i} className="flex items-center gap-2 text-sm">{r.p?<CheckCircle size={14} className="text-emerald-600 shrink-0"/>:<X size={14} className="text-red-500 shrink-0"/>}<span className={r.p?"text-emerald-700":"text-red-700"}>{r.l}</span></div>)}</div></div>;
}

// ── Policyholder Status Tracker (client-facing) ────────────────────────
function PolicyholderTracker({ lang, onBack }) {
  const claim = { id: "CLM-7820", holder: lang==="ar"?"فاطمة بنت خالد المنصوري":"Fatima bint Khalid Al-Mansoori", vehicle: lang==="ar"?"٢٠٢٣ نيسان باترول":"2023 Nissan Patrol", filed: "2026-06-22", estimate: "10,340" };
  const steps = lang==="ar" ? [
    { label: "تم تقديم المطالبة", status: "done", time: "٢٢ يونيو، ٩:١٥ ص", detail: "تم استلام المطالبة وتعيين رقم CLM-7820" },
    { label: "تم استلام الصور", status: "done", time: "٢٢ يونيو، ٩:١٨ ص", detail: "٤ صور تم رفعها وتأكيدها" },
    { label: "تحليل الذكاء الاصطناعي", status: "done", time: "٢٢ يونيو، ٩:١٩ ص", detail: "تم تحليل الأضرار تلقائياً" },
    { label: "مراجعة الوكيل", status: "done", time: "٢٢ يونيو، ٩:٢٣ ص", detail: "تمت المراجعة والموافقة من قبل الوكيل" },
    { label: "تمت الموافقة", status: "done", time: "٢٢ يونيو، ٩:٢٤ ص", detail: "تم اعتماد تقدير الإصلاح" },
    { label: "الإصلاح", status: "current", time: "في انتظار الموعد", detail: "يرجى التوجه إلى ورشة الإصلاح المعتمدة" },
  ] : [
    { label: "Claim Filed", status: "done", time: "Jun 22, 9:15 AM", detail: "Claim received and assigned CLM-7820" },
    { label: "Photos Received", status: "done", time: "Jun 22, 9:18 AM", detail: "4 photos uploaded and confirmed" },
    { label: "AI Analysis", status: "done", time: "Jun 22, 9:19 AM", detail: "Damage analyzed automatically" },
    { label: "Agent Review", status: "done", time: "Jun 22, 9:23 AM", detail: "Reviewed and approved by claims agent" },
    { label: "Approved", status: "done", time: "Jun 22, 9:24 AM", detail: "Repair estimate authorized" },
    { label: "Repair", status: "current", time: "Awaiting appointment", detail: "Please visit approved repair shop" },
  ];
  return <div className="max-w-lg mx-auto">
    <button onClick={onBack} className={`flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 ${lang==="ar"?"flex-row-reverse":""}`}>{lang==="ar"?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}{lang==="ar"?"العودة":"Back"}</button>
    <div className="text-center mb-8"><div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3"><User size={24} className="text-blue-600"/></div><h2 className="text-xl font-bold text-gray-900">{lang==="ar"?"متتبع المطالبة":"Claim Tracker"}</h2><p className="text-sm text-gray-500 mt-1">{lang==="ar"?"مرحباً":"Welcome"}, {claim.holder}</p></div>
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6"><div className="grid grid-cols-2 gap-3 text-sm"><div><span className="text-gray-500">{lang==="ar"?"رقم المطالبة":"Claim"}:</span> <span className="font-semibold text-blue-600">{claim.id}</span></div><div><span className="text-gray-500">{lang==="ar"?"المركبة":"Vehicle"}:</span> <span className="font-medium">{claim.vehicle}</span></div><div><span className="text-gray-500">{lang==="ar"?"التقدير":"Estimate"}:</span> <span className="font-bold">{claim.estimate} {lang==="ar"?"ر.ق":"QAR"}</span></div><div><span className="text-gray-500">{lang==="ar"?"تاريخ التقديم":"Filed"}:</span> <span>{claim.filed}</span></div></div></div>
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{lang==="ar"?"حالة المطالبة":"Claim Status"}</h3>
      <div className="space-y-0">{steps.map((s,i)=>(
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center"><div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.status==="done"?"bg-emerald-100":"s.status"==="current"?"bg-blue-100 ring-2 ring-blue-400":"bg-gray-100"}`}>{s.status==="done"?<CheckCircle size={16} className="text-emerald-600"/>:s.status==="current"?<Clock size={16} className="text-blue-600 animate-pulse"/>:<div className="w-2 h-2 rounded-full bg-gray-300"/>}</div>{i<steps.length-1&&<div className={`w-0.5 h-8 ${s.status==="done"?"bg-emerald-300":"bg-gray-200"}`}/>}</div>
          <div className="pb-4"><p className={`text-sm font-medium ${s.status==="done"?"text-gray-900":s.status==="current"?"text-blue-700":"text-gray-400"}`}>{s.label}</p><p className="text-xs text-gray-500 mt-0.5">{s.time}</p><p className="text-xs text-gray-400 mt-0.5">{s.detail}</p></div>
        </div>
      ))}</div>
    </div>
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"><p className="text-xs text-blue-700">{lang==="ar"?"وقت المعالجة: ٩ دقائق (مقابل ٤٥ دقيقة تقليدياً)":"Processing time: 9 minutes (vs 45 min traditional)"}</p></div>
  </div>;
}

// ── Compliance Audit Trail (QCB/SAMA auditor view) ─────────────────────
function AuditTrail({ lang, onBack }) {
  const logs = [
    { time: "09:15:02", user: lang==="ar"?"النظام":"System", action: lang==="ar"?"تم إنشاء المطالبة CLM-7820":"Claim CLM-7820 created", type: "system", detail: lang==="ar"?"بوليصة: POL-2026-71432 | صاحب: فاطمة بنت خالد المنصوري":"Policy: POL-2026-71432 | Holder: Fatima bint Khalid Al-Mansoori" },
    { time: "09:18:14", user: lang==="ar"?"النظام":"System", action: lang==="ar"?"تم رفع ٤ صور":"4 photos uploaded", type: "system", detail: "EXIF ✓ | Geolocation: Doha ✓ | Duplicate: ✓ | Manipulation: ✓" },
    { time: "09:18:47", user: lang==="ar"?"الذكاء v2.3":"AI Model v2.3", action: lang==="ar"?"تقييم الأضرار مكتمل":"Damage assessment completed", type: "ai", detail: lang==="ar"?"الشدة: متوسط | الثقة: ٨٧٪ | التقدير: ١٠,٣٤٠ ر.ق | التوصية: موافقة تلقائية":"Severity: Moderate | Confidence: 87% | Estimate: QAR 10,340 | Rec: Auto-approve" },
    { time: "09:19:12", user: lang==="ar"?"الذكاء v2.3":"AI Model v2.3", action: lang==="ar"?"تم اكتشاف ٣ مناطق ضرر":"3 damage regions detected", type: "ai", detail: lang==="ar"?"المصد الأمامي (متوسط) | غطاء المحرك (طفيف) | المصباح (متوسط)":"Front Bumper (Moderate) | Hood (Minor) | Headlight (Moderate)" },
    { time: "09:21:33", user: lang==="ar"?"أحمد الكواري (وكيل)":"Ahmed Al-Kuwari (Agent)", action: lang==="ar"?"تم تأكيد ٣ مناطق ضرر":"3 damage regions confirmed", type: "agent", detail: lang==="ar"?"تعليقات: ٣ مؤكد، ٠ مرفوض، ٠ مضاف → قائمة التدريب":"Annotations: 3 confirmed, 0 rejected, 0 added → training queue" },
    { time: "09:22:15", user: lang==="ar"?"أحمد الكواري (وكيل)":"Ahmed Al-Kuwari (Agent)", action: lang==="ar"?"تعديل التقدير":"Estimate adjusted", type: "override", detail: lang==="ar"?"المصد الأمامي: ٣,٦٥٠ ر.ق → ٤,٠٠٠ ر.ق (+٩.٦٪) | السبب: قطع OEM مطلوبة":"Front Bumper: QAR 3,650 → QAR 4,000 (+9.6%) | Reason: OEM parts required" },
    { time: "09:23:41", user: lang==="ar"?"أحمد الكواري (وكيل)":"Ahmed Al-Kuwari (Agent)", action: lang==="ar"?"تم إرسال التقييم":"Assessment submitted", type: "agent", detail: lang==="ar"?"التقدير النهائي: ١٠,٦٩٠ ر.ق | التوجيه: موافقة تلقائية":"Final estimate: QAR 10,690 | Routing: Auto-approve" },
    { time: "09:24:02", user: lang==="ar"?"النظام":"System", action: lang==="ar"?"تمت الموافقة التلقائية":"Auto-approved", type: "system", detail: lang==="ar"?"التقدير ≤ ١٠,٩٠٠ ر.ق ✓ | الثقة ≥ ٨٥٪ ✓ | لا تناقضات ✓":"Estimate ≤ QAR 10,900 ✓ | Confidence ≥ 85% ✓ | No inconsistencies ✓" },
    { time: "09:24:03", user: lang==="ar"?"النظام":"System", action: lang==="ar"?"التعديل → قائمة تدريب النموذج":"Override → model training queue", type: "training", detail: lang==="ar"?"١ تعديل + ٣ تعليقات في قائمة التدريب v2.4":"1 override + 3 annotations queued for v2.4 retrain" },
  ];
  const typeColor = { system: "bg-gray-100 text-gray-600", ai: "bg-blue-100 text-blue-700", agent: "bg-emerald-100 text-emerald-700", override: "bg-amber-100 text-amber-700", training: "bg-violet-100 text-violet-700" };
  const typeLabel = { system: lang==="ar"?"نظام":"System", ai: lang==="ar"?"ذكاء":"AI", agent: lang==="ar"?"وكيل":"Agent", override: lang==="ar"?"تعديل":"Override", training: lang==="ar"?"تدريب":"Training" };

  return <div className="max-w-4xl">
    <button onClick={onBack} className={`flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 ${lang==="ar"?"flex-row-reverse":""}`}>{lang==="ar"?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}{lang==="ar"?"العودة":"Back"}</button>
    <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold text-gray-900">{lang==="ar"?"سجل التدقيق":"Audit Trail"}</h2><p className="text-sm text-gray-500">{lang==="ar"?"المطالبة CLM-7820 | للمراجعة التنظيمية QCB/SAMA":"Claim CLM-7820 | QCB/SAMA Regulatory Review"}</p></div>
    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"><Upload size={14}/>{lang==="ar"?"تصدير PDF":"Export PDF"}</button></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-4 text-xs">{Object.entries(typeLabel).map(([k,v])=><span key={k} className={`px-2 py-0.5 rounded-full font-medium ${typeColor[k]}`}>{v}</span>)}</div>
      <div className="divide-y divide-gray-100">{logs.map((log,i)=>(
        <div key={i} className="px-5 py-3 flex items-start gap-4 hover:bg-gray-50">
          <span className="text-xs font-mono text-gray-400 w-16 shrink-0 pt-0.5">{log.time}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${typeColor[log.type]}`}>{typeLabel[log.type]}</span>
          <div className="flex-1 min-w-0"><p className="text-sm text-gray-900">{log.action}</p><p className="text-xs text-gray-500 mt-0.5">{log.user}</p></div>
          <p className="text-xs text-gray-400 max-w-xs text-end">{log.detail}</p>
        </div>
      ))}</div>
    </div>
    <div className="mt-4 flex items-center gap-3"><div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-700 flex-1"><span className="font-semibold">{lang==="ar"?"٨ أحداث مسجلة":"8 events logged"}</span> · {lang==="ar"?"سجل غير قابل للتغيير · متوافق مع قانون حماية البيانات القطري":"Immutable log · Qatar Data Privacy Law compliant"}</div><div className="bg-violet-50 border border-violet-200 rounded-lg px-3 py-2 text-xs text-violet-700"><span className="font-semibold">{lang==="ar"?"وقت المعالجة":"Processing"}</span>: 9m 01s</div></div>
  </div>;
}

// ── Senior Adjuster Review Queue ───────────────────────────────────────
function SeniorReviewQueue({ lang, onBack }) {
  const [decisions, setDecisions] = useState({});
  const queue = [
    { id: "CLM-7821", holder: lang==="ar"?"محمد بن أحمد آل ثاني":"Mohammed bin Ahmed Al-Thani", vehicle: lang==="ar"?"٢٠٢٤ تويوتا لاند كروزر":"2024 Toyota Land Cruiser", severity: "severe", confidence: 72, estimate: 29800, aiRec: lang==="ar"?"مراجعة أقدم":"Senior Review", reason: lang==="ar"?"تشوه هيكلي + ثقة منخفضة":"Structural deformation + low confidence", agentNotes: lang==="ar"?"قطع OEM مطلوبة، اقترح فحص إضافي":"OEM parts required, suggest additional inspection", waitTime: "2h 15m" },
    { id: "CLM-7819", holder: lang==="ar"?"عبدالله بن حسن السويدي":"Abdullah bin Hassan Al-Suwaidi", vehicle: lang==="ar"?"٢٠٢٣ لكزس LX 600":"2023 Lexus LX 600", severity: "severe", confidence: 68, estimate: 42500, aiRec: lang==="ar"?"تقييم خسارة كلية":"Total Loss Assessment", reason: lang==="ar"?"تكلفة الإصلاح قد تتجاوز القيمة الفعلية":"Repair cost may exceed ACV", agentNotes: lang==="ar"?"الضرر الهيكلي واضح، تقييم خسارة كلية مطلوب":"Structural damage apparent, total loss evaluation needed", waitTime: "45m" },
  ];
  return <div className="max-w-4xl">
    <button onClick={onBack} className={`flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 ${lang==="ar"?"flex-row-reverse":""}`}>{lang==="ar"?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}{lang==="ar"?"العودة":"Back"}</button>
    <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold text-gray-900">{lang==="ar"?"قائمة المراجعة الأقدم":"Senior Review Queue"}</h2><p className="text-sm text-gray-500">{queue.length} {lang==="ar"?"مطالبات بانتظار القرار":"claims awaiting decision"}</p></div></div>
    <div className="space-y-4">{queue.map(c=><div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-3"><span className="text-blue-600 font-semibold">{c.id}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${c.severity==="severe"?"text-red-600 bg-red-50 border-red-200":"text-amber-600 bg-amber-50 border-amber-200"}`}>{c.severity==="severe"?(lang==="ar"?"شديد":"Severe"):(lang==="ar"?"متوسط":"Moderate")}</span><span className="text-xs text-gray-400">{lang==="ar"?"منتظر":"Waiting"}: {c.waitTime}</span></div><span className="text-sm font-bold text-gray-900">{fmtQAR(c.estimate,lang)}</span></div>
      <div className="grid grid-cols-2 gap-2 text-sm mb-3"><div><span className="text-gray-500">{lang==="ar"?"صاحب البوليصة":"Holder"}:</span> {c.holder}</div><div><span className="text-gray-500">{lang==="ar"?"المركبة":"Vehicle"}:</span> {c.vehicle}</div><div><span className="text-gray-500">{lang==="ar"?"الثقة":"Confidence"}:</span> {c.confidence}%</div><div><span className="text-gray-500">{lang==="ar"?"السبب":"Reason"}:</span> {c.reason}</div></div>
      {c.agentNotes&&<div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm"><span className="text-gray-500 text-xs font-medium">{lang==="ar"?"ملاحظات الوكيل":"Agent Notes"}:</span><p className="text-gray-700 mt-0.5">{c.agentNotes}</p></div>}
      {decisions[c.id]?<div className={`p-3 rounded-lg text-sm font-medium text-center ${decisions[c.id]==="approved"?"bg-emerald-50 text-emerald-700":"decisions[c.id]"==="rejected"?"bg-red-50 text-red-700":"bg-blue-50 text-blue-700"}`}>{decisions[c.id]==="approved"?(lang==="ar"?"✓ تمت الموافقة":"✓ Approved"):decisions[c.id]==="rejected"?(lang==="ar"?"✗ مرفوض":"✗ Rejected"):(lang==="ar"?"↩ طلب معلومات إضافية":"↩ More Info Requested")}</div>
      :<div className="flex gap-2"><button onClick={()=>setDecisions(p=>({...p,[c.id]:"approved"}))} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">{lang==="ar"?"موافقة":"Approve"}</button><button onClick={()=>setDecisions(p=>({...p,[c.id]:"rejected"}))} className="flex-1 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100">{lang==="ar"?"رفض":"Reject"}</button><button onClick={()=>setDecisions(p=>({...p,[c.id]:"info"}))} className="flex-1 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100">{lang==="ar"?"طلب معلومات":"More Info"}</button></div>}
    </div>)}</div>
  </div>;
}

// ── Repair Shop Portal ────────────────────────────────────────────────
function RepairShopPortal({ lang, onBack }) {
  const [invoiceUploaded, setInvoiceUploaded] = useState(false);
  const [supplemental, setSupplemental] = useState(false);
  const jobs = [
    { id: "CLM-7820", vehicle: lang==="ar"?"٢٠٢٣ نيسان باترول":"2023 Nissan Patrol", approved: "10,690", status: "in_progress", dropoff: "2026-06-25" },
    { id: "CLM-7818", vehicle: lang==="ar"?"٢٠٢٢ مرسيدس G 63":"2022 Mercedes G 63", approved: "4,440", status: "completed", dropoff: "2026-06-21" },
  ];
  return <div className="max-w-3xl">
    <button onClick={onBack} className={`flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 ${lang==="ar"?"flex-row-reverse":""}`}>{lang==="ar"?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}{lang==="ar"?"العودة":"Back"}</button>
    <h2 className="text-xl font-bold text-gray-900 mb-1">{lang==="ar"?"بوابة ورشة الإصلاح":"Repair Shop Portal"}</h2>
    <p className="text-sm text-gray-500 mb-6">{lang==="ar"?"مركز الإصلاح المعتمد — الدوحة":"Authorized Repair Center — Doha"}</p>
    <div className="space-y-4">{jobs.map(j=><div key={j.id} className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3"><span className="text-blue-600 font-semibold">{j.id}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${j.status==="completed"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{j.status==="completed"?(lang==="ar"?"مكتمل":"Completed"):(lang==="ar"?"جاري الإصلاح":"In Progress")}</span></div>
      <div className="grid grid-cols-3 gap-3 text-sm mb-3"><div><span className="text-gray-500">{lang==="ar"?"المركبة":"Vehicle"}:</span> {j.vehicle}</div><div><span className="text-gray-500">{lang==="ar"?"المعتمد":"Approved"}:</span> {j.approved} {lang==="ar"?"ر.ق":"QAR"}</div><div><span className="text-gray-500">{lang==="ar"?"التسليم":"Drop-off"}:</span> {j.dropoff}</div></div>
      {j.status==="in_progress"&&<div className="flex gap-2 mt-2">
        <button onClick={()=>setSupplemental(true)} className="flex-1 py-2 border border-amber-300 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100">{lang==="ar"?"ضرر إضافي مكتشف":"Supplemental Damage Found"}</button>
        <button onClick={()=>setInvoiceUploaded(true)} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">{lang==="ar"?"رفع الفاتورة النهائية":"Upload Final Invoice"}</button>
      </div>}
      {j.status==="completed"&&!invoiceUploaded&&<div className="bg-emerald-50 rounded-lg p-3 text-sm text-emerald-700 mt-2"><CheckCircle size={14} className="inline mr-1"/>{lang==="ar"?"الفاتورة النهائية: ٤,٢٣٠ ر.ق (مقابل ٤,٤٤٠ ر.ق معتمد) ← بيانات تدريب":"Final invoice: QAR 4,230 (vs QAR 4,440 approved) → training data"}</div>}
    </div>)}</div>
    {supplemental&&<div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4"><h4 className="font-semibold text-amber-800 text-sm mb-2">{lang==="ar"?"طلب ضرر إضافي":"Supplemental Damage Request"}</h4><p className="text-sm text-amber-700 mb-3">{lang==="ar"?"تم إرسال طلب ضرر إضافي. سيتم إجراء تقييم ذكاء جديد.":"Supplemental request submitted. New AI assessment will be triggered."}</p><div className="flex gap-2"><button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium"><Camera size={14} className="inline mr-1"/>{lang==="ar"?"رفع صور الضرر الإضافي":"Upload Supplemental Photos"}</button></div></div>}
    {invoiceUploaded&&<div className="mt-4 bg-violet-50 border border-violet-200 rounded-xl p-4"><h4 className="font-semibold text-violet-800 text-sm mb-2">{lang==="ar"?"تم رفع الفاتورة":"Invoice Uploaded"}</h4><p className="text-sm text-violet-700">{lang==="ar"?"الفاتورة النهائية مقابل تقدير الذكاء = بيانات تدريب للنموذج v2.4":"Final invoice vs AI estimate = ground truth training data for model v2.4"}</p></div>}
  </div>;
}

// ── Management Dashboard ──────────────────────────────────────────────
function ManagementDash({ lang, onBack }) {
  return <div className="max-w-4xl">
    <button onClick={onBack} className={`flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 ${lang==="ar"?"flex-row-reverse":""}`}>{lang==="ar"?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}{lang==="ar"?"العودة":"Back"}</button>
    <h2 className="text-xl font-bold text-gray-900 mb-1">{lang==="ar"?"لوحة الإدارة":"Management Dashboard"}</h2>
    <p className="text-sm text-gray-500 mb-6">{lang==="ar"?"نظرة عامة على العائد والأداء":"ROI & Performance Overview"}</p>
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[{l:lang==="ar"?"الوفر الشهري":"Monthly Savings",v:lang==="ar"?"٣٢٤,٠٠٠ ر.ق":"QAR 324,000",s:lang==="ar"?"انخفاض ٦٨٪ في تكلفة العمليات":"68% operational cost reduction",c:"text-emerald-600"},
        {l:lang==="ar"?"المطالبات/يوم":"Claims/Day",v:"847",s:lang==="ar"?"ارتفاع من ٣٢٠ (يدوي)":"Up from 320 (manual)",c:"text-blue-600"},
        {l:lang==="ar"?"رضا الوكلاء":"Agent Satisfaction",v:"4.6/5",s:lang==="ar"?"استطلاع ربع سنوي":"Quarterly survey",c:"text-violet-600"},
        {l:lang==="ar"?"دقة النموذج":"Model Accuracy",v:"94.1%",s:lang==="ar"?"ارتفاع ٢.١٪ هذا الشهر":"+2.1% this month",c:"text-emerald-600"}
      ].map((m,i)=><div key={i} className="bg-white rounded-xl border border-gray-200 p-4"><p className={`text-xl font-bold ${m.c}`}>{m.v}</p><p className="text-sm text-gray-700 mt-1">{m.l}</p><p className="text-xs text-gray-400 mt-0.5">{m.s}</p></div>)}
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{lang==="ar"?"أداء الوكلاء":"Agent Performance"}</h3>
        {[{n:lang==="ar"?"أحمد الكواري":"Ahmed Al-Kuwari",claims:52,override:"8%",acc:"96%"},{n:lang==="ar"?"سارة المري":"Sara Al-Marri",claims:48,override:"12%",acc:"94%"},{n:lang==="ar"?"يوسف السويدي":"Youssef Al-Suwaidi",claims:44,override:"15%",acc:"91%"},{n:lang==="ar"?"نورة الثاني":"Noura Al-Thani",claims:38,override:"6%",acc:"97%"}].map((a,i)=><div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-sm"><span className="font-medium text-gray-800">{a.n}</span><span className="text-gray-500">{a.claims} {lang==="ar"?"مطالبة/أسبوع":"claims/wk"}</span><span className="text-amber-600">{a.override} {lang==="ar"?"تجاوز":"override"}</span><span className="text-emerald-600">{a.acc}</span></div>)}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{lang==="ar"?"اتجاهات العائد":"ROI Trends"}</h3>
        {[{m:lang==="ar"?"يناير":"Jan",manual:320,ai:680,savings:"QAR 186K"},{m:lang==="ar"?"فبراير":"Feb",manual:310,ai:720,savings:"QAR 211K"},{m:lang==="ar"?"مارس":"Mar",manual:305,ai:780,savings:"QAR 245K"},{m:lang==="ar"?"أبريل":"Apr",manual:290,ai:820,savings:"QAR 289K"},{m:lang==="ar"?"مايو":"May",manual:280,ai:840,savings:"QAR 310K"},{m:lang==="ar"?"يونيو":"Jun",manual:270,ai:847,savings:"QAR 324K"}].map((r,i)=><div key={i} className="flex items-center justify-between py-1.5 text-xs"><span className="w-12 text-gray-600">{r.m}</span><div className="flex-1 mx-2 bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:`${(r.ai/900)*100}%`}}/></div><span className="text-emerald-600 font-medium w-20 text-end">{r.savings}</span></div>)}
        <p className="text-xs text-gray-400 mt-2">{lang==="ar"?"إجمالي الوفر منذ الإطلاق: ١,٥٦٥,٠٠٠ ر.ق":"Total savings since launch: QAR 1,565,000"}</p>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{lang==="ar"?"تحليل إقليمي":"Regional Breakdown"}</h3>
      <div className="grid grid-cols-3 gap-4">{[{r:lang==="ar"?"الدوحة":"Doha",claims:520,acc:"95%"},{r:lang==="ar"?"الوكرة":"Al Wakrah",claims:187,acc:"93%"},{r:lang==="ar"?"الخور":"Al Khor",claims:140,acc:"91%"}].map((reg,i)=><div key={i} className="text-center p-3 bg-gray-50 rounded-lg"><p className="font-semibold text-gray-900">{reg.r}</p><p className="text-sm text-gray-600">{reg.claims} {lang==="ar"?"مطالبة":"claims"}</p><p className="text-xs text-emerald-600">{reg.acc} {lang==="ar"?"دقة":"accuracy"}</p></div>)}</div>
    </div>
  </div>;
}

// ── Main App ───────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("ar");
  const t = TX[lang];
  const sevLbl = { minor: t.minor, moderate: t.moderate, severe: t.sev, total_loss: t.totalLoss };
  const recLbl = { auto_approve: t.autoRec, senior_review: t.seniorRev, manual_review: t.manualRev };
  const recClr = { auto_approve:"text-emerald-700 bg-emerald-50 border-emerald-200", senior_review:"text-amber-700 bg-amber-50 border-amber-200", manual_review:"text-blue-700 bg-blue-50 border-blue-200" };

  const [view,setView]=useState("dashboard"),[step,setStep]=useState(1),[submitted,setSubmitted]=useState(false);
  const [cd,setCd]=useState({policyNumber:"",holderName:"",vehicleMake:"",vehicleModel:"",vehicleYear:"",incidentDate:"",description:""});
  const [photos,setPhotos]=useState([]),[assessment,setAssessment]=useState(null),[analyzing,setAnalyzing]=useState(false);
  const [pStage,setPStage]=useState("preprocess"),[notes,setNotes]=useState(""),[adj,setAdj]=useState({});
  const [ann,setAnn]=useState({}),[startTime,setStartTime]=useState(null),[aiError,setAiError]=useState(false);
  const [hl,setHl]=useState(null);
  const [drag,setDrag]=useState(false),[routing,setRouting_]=useState("auto");
  const fileRef=useRef(null);
  const batchRef=useRef(null);

  const startNew=()=>{setView("wizard");setStep(1);setSubmitted(false);setStartTime(Date.now());setCd({policyNumber:"",holderName:"",vehicleMake:"",vehicleModel:"",vehicleYear:"",incidentDate:"",description:""});setPhotos([]);setAssessment(null);setNotes("");setAdj({});setAnn({});setAiError(false);};
  const claims = CLAIMS_DATA[lang];

  const runAI=async()=>{
    setStep(3);setAnalyzing(true);
    for(const s of["preprocess","detect","classify","estimate","confidence"]){setPStage(s);await new Promise(r=>setTimeout(r,800));}
    try{
      let img=null,mt="image/jpeg";
      const compressImage=(file)=>new Promise((res)=>{const image=new Image();image.onload=()=>{const canvas=document.createElement("canvas");const MAX=800;let w=image.width,h=image.height;if(w>h){if(w>MAX){h*=MAX/w;w=MAX;}}else{if(h>MAX){w*=MAX/h;h=MAX;}}canvas.width=w;canvas.height=h;canvas.getContext("2d").drawImage(image,0,0,w,h);res(canvas.toDataURL("image/jpeg",0.7).split(",")[1]);};image.src=URL.createObjectURL(file);});
      const imageContents=[];
      for(let i=0;i<Math.min(photos.length,5);i++){const b64=await compressImage(photos[i].file);imageContents.push({type:"image",source:{type:"base64",media_type:"image/jpeg",data:b64}});}
      if(imageContents.length>0){mt="image/jpeg";img=true;}
      const msgs=[{role:"user",content:img?[...imageContents,{type:"text",text:`Auto damage assessor. Analyze ALL provided images. RESPOND ONLY JSON. Use QAR currency. {"overallSeverity":"minor"|"moderate"|"severe","confidenceScore":0.70-0.98,"damages":[{"area":"...","areaAr":"...","type":"...","typeAr":"...","severity":"...","estimatedCost":{"low":0,"high":0},"region":"R1","dbRef":"CCC-ONE #..."}],"totalEstimate":{"low":0,"high":0},"recommendation":"auto_approve"|"senior_review","summary":"...","summaryAr":"...","confidenceBreakdown":{"imageClarity":0.0-1.0,"regionOverlap":0.0-1.0,"patternMatch":0.0-1.0,"databaseCoverage":0.0-1.0},"inconsistencies":[]}`}]:[{type:"text",text:`Damage assessment in QAR for ${cd.vehicleYear} ${cd.vehicleMake} ${cd.vehicleModel}. JSON only.`}]}];
      const resp=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:4096,messages:msgs})});
      if(!resp.ok){const errText=await resp.text();console.error("API error:",resp.status,errText);throw new Error(errText);}
      const data=await resp.json();console.log("AI response:",data);const txt=data.content?.map(b=>b.text||"").join("")||"";
      const p=JSON.parse(txt.replace(/```json|```/g,"").trim());
      if(!p.confidenceBreakdown)p.confidenceBreakdown=SCENARIOS.moderate.confidenceBreakdown;
      if(!p.inconsistencies)p.inconsistencies=[];
      setAssessment(p);setRouting_(p.recommendation==="auto_approve"?"auto":"senior");
    }catch{setAiError(true);const m=getNextMock();setAssessment(m);setRouting_(m.recommendation==="auto_approve"?"auto":"senior");}
    setAnalyzing(false);
  };

  const dir = lang === "ar" ? "rtl" : "ltr";
  const font = lang === "ar" ? "'Noto Sans Arabic', 'Inter', system-ui, sans-serif" : "'Inter', system-ui, sans-serif";
  const STP = lang==="ar" ? ["معلومات المطالبة","الصور","تقييم ذكي","مراجعة"] : ["Claim Info","Photos","AI Assessment","Review"];

  return <div className="min-h-screen bg-gray-50" dir={dir} style={{fontFamily:font}}>
    {/* Google Fonts for Arabic */}
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"/>

    <header className="bg-white border-b border-gray-200 sticky top-0 z-10"><div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Shield size={16} className="text-white"/></div><span className="font-bold text-gray-900">{t.title}</span><span className="text-xs text-gray-400 ms-1 hidden sm:inline">{t.subtitle}</span></div>
      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button onClick={()=>setLang(lang==="en"?"ar":"en")} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"><Globe size={12}/>{lang==="en"?"العربية":"English"}</button>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-200 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/><span className="text-xs font-medium text-violet-700">v2.3</span><span className="text-xs text-violet-400">|</span><span className="text-xs text-violet-500">847</span></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><User size={14} className="text-gray-600"/></div>
      </div>
    </div></header>

    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* ── Dashboard ── */}
      {view==="dashboard"&&<div>
        <div className="flex items-center justify-between mb-6"><div><h2 className="text-2xl font-bold text-gray-900">{t.dashboard}</h2><p className="text-gray-500 mt-0.5">{t.dashSub}</p></div>
          <button onClick={startNew} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 shadow-sm"><Zap size={16}/>{t.newAssess}</button>
          </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Stat icon={FileText} label={t.openClaims} value="12" sub={t.newToday} accent="text-blue-600"/>
          <Stat icon={Brain} label={t.aiProcessed} value="847" sub={t.thisMonth} accent="text-violet-600"/>
          <Stat icon={Clock} label={t.avgTime} value={lang==="ar"?"٤.٢ د":"4.2 min"} sub={t.vsManual} accent="text-amber-600"/>
          <Stat icon={TrendingUp} label={t.trainQueue} value="47" sub={t.corrPending} accent="text-violet-600"/>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6 flex items-center gap-4"><Brain size={18} className="text-violet-600 shrink-0"/><div className="flex-1"><div className="flex items-center gap-2 text-sm flex-wrap"><span className="font-semibold text-violet-900">Model v2.3</span><span className="text-emerald-600 font-medium">94.1% (+2.1%)</span><span className="text-violet-300">|</span><span className="text-xs text-amber-600 font-medium">🔬 v2.4 canary: 10% traffic, 95.3% accuracy</span></div><p className="text-xs text-violet-500 mt-0.5">47 {t.modelHealth}</p></div><div className="text-end shrink-0"><div className="text-xs text-violet-500">{t.nextRetrain}</div><div className="text-sm font-semibold text-violet-800">{lang==="ar"?"١ يوليو":"July 1"}</div></div></div>

        {/* Model Evaluation: Accuracy by Vehicle Class + Eval Set */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-semibold text-gray-900">{lang==="ar"?"الدقة حسب فئة المركبة":"Accuracy by Vehicle Class"}</h4><span className="text-xs text-gray-400">{lang==="ar"?"مجموعة تقييم: ٥٤٧":"Eval set: 547 claims"}</span></div>
            <div className="space-y-2">
              {[{v:"Toyota Land Cruiser",vAr:"تويوتا لاند كروزر",pct:96,n:187},{v:"Nissan Patrol",vAr:"نيسان باترول",pct:94,n:134},{v:"Lexus LX/GX",vAr:"لكزس LX/GX",pct:91,n:89},{v:"Mercedes G/S",vAr:"مرسيدس G/S",pct:88,n:72},{v:"Range Rover",vAr:"رينج روفر",pct:85,n:41},{v:"Other",vAr:"أخرى",pct:92,n:24}].map(c=>(
                <div key={c.v} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-32 shrink-0 truncate">{lang==="ar"?c.vAr:c.v}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2"><div className={`h-2 rounded-full ${c.pct>=90?"bg-emerald-500":c.pct>=85?"bg-amber-500":"bg-red-500"}`} style={{width:`${c.pct}%`}}/></div>
                  <span className="text-xs font-mono text-gray-700 w-12 text-end">{c.pct}%</span>
                  <span className="text-xs text-gray-400 w-8 text-end">n={c.n}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">{lang==="ar"?"تقييم شهري. تحسن 2.1% منذ v2.2":"Monthly eval. +2.1% since v2.2. Stratified by Gulf vehicle mix."}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{lang==="ar"?"مقاييس العمليات":"Operational Metrics"}</h4>
            <div className="space-y-3">
              {[
                {l:lang==="ar"?"معدل التجاوز":"Override Rate",v:lang==="ar"?"١٢٪ ↓":"12% ↓",c:"text-emerald-600",sub:lang==="ar"?"انخفاض من ١٨٪ (v2.2)":"Down from 18% (v2.2)"},
                {l:lang==="ar"?"معدل الموافقة التلقائية":"Auto-Approve Rate",v:lang==="ar"?"٦٣٪":"63%",c:"text-blue-600",sub:lang==="ar"?"الهدف: ٦٠٪+":"Target: 60%+"},
                {l:lang==="ar"?"خطأ المعايرة":"Calibration Error",v:lang==="ar"?"٣.٢٪":"3.2%",c:"text-emerald-600",sub:lang==="ar"?"الهدف: < ٥٪":"Target: <5%"},
                {l:lang==="ar"?"مجموعة التقييم الذهبية":"Golden Eval Set",v:"547",c:"text-violet-600",sub:lang==="ar"?"مطالبات مع فواتير إصلاح حقيقية":"Claims with ground truth repair invoices"},
              ].map((m,i)=><div key={i}><div className="flex items-center justify-between"><span className="text-xs text-gray-600">{m.l}</span><span className={`text-sm font-bold ${m.c}`}>{m.v}</span></div><p className="text-xs text-gray-400">{m.sub}</p></div>)}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-900">{t.recentClaims}</h3></div>
          <table className="w-full text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide"><tr><th className="text-start px-5 py-3 font-medium">{t.claimId}</th><th className="text-start px-5 py-3 font-medium">{t.policyholder}</th><th className="text-start px-5 py-3 font-medium">{t.vehicle}</th><th className="text-start px-5 py-3 font-medium">{t.status}</th><th className="text-start px-5 py-3 font-medium">{t.estimate}</th></tr></thead>
          <tbody className="divide-y divide-gray-100">{claims.map(c=><tr key={c.id} className="hover:bg-gray-50 cursor-pointer"><td className="px-5 py-3.5 font-medium text-blue-600">{c.id}</td><td className="px-5 py-3.5 text-gray-800">{c.holder}</td><td className="px-5 py-3.5 text-gray-600">{c.vehicle}</td><td className="px-5 py-3.5"><Badge status={c.status} t={t}/></td><td className="px-5 py-3.5 text-gray-800 font-medium">{c.estimate?`${c.estimate} ${t.currSymbol}`:"—"}</td></tr>)}</tbody></table>
        </div>

        {/* Stakeholder Portals */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">{lang==="ar"?"بوابات أصحاب المصلحة":"Stakeholder Portals"}</h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {v:"policyholder",i:User,l:lang==="ar"?"بوابة العميل":"Client Portal",d:lang==="ar"?"تتبع المطالبة":"Claim tracking",c:"text-blue-600 bg-blue-50"},
              {v:"senior",i:Scale,l:lang==="ar"?"مراجعة أقدم":"Sr. Review",d:lang==="ar"?"٢ بانتظار":"2 pending",c:"text-amber-600 bg-amber-50"},
              {v:"repair",i:Edit3,l:lang==="ar"?"ورشة الإصلاح":"Repair Shop",d:lang==="ar"?"الفواتير والضرر":"Invoices & damage",c:"text-emerald-600 bg-emerald-50"},
              {v:"management",i:TrendingUp,l:lang==="ar"?"الإدارة":"Management",d:lang==="ar"?"العائد والأداء":"ROI & performance",c:"text-violet-600 bg-violet-50"},
              {v:"audit",i:Shield,l:lang==="ar"?"سجل التدقيق":"Audit Trail",d:lang==="ar"?"QCB/SAMA":"QCB/SAMA",c:"text-gray-600 bg-gray-50"},
              {v:"batch",i:Upload,l:lang==="ar"?"رفع دفعة صور":"Batch Photos",d:lang==="ar"?"رفع صور متعددة":"Upload many at once",c:"text-blue-600 bg-blue-50"},
            ].map(p=>{const I=p.i;return<div key={p.v} onClick={p.v==="batch"?()=>batchRef.current?.click():()=>setView(p.v)} className="rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"><div className={`w-10 h-10 rounded-lg ${p.c} flex items-center justify-center mx-auto mb-2`}><I size={18}/></div><p className="text-sm font-medium text-gray-900">{p.l}</p><p className="text-xs text-gray-400 mt-0.5">{p.d}</p></div>})}
          </div>
          <input ref={batchRef} type="file" className="hidden" multiple accept="image/*" onChange={e=>{const files=Array.from(e.target.files).filter(f=>f.type.startsWith("image/")).map(f=>({file:f,preview:URL.createObjectURL(f),name:f.name}));if(files.length>0){setPhotos(files);startNew();setStep(2);}}}/>
        </div>
      </div>}

      {/* ── Policyholder Portal ── */}
      {view==="policyholder"&&<PolicyholderTracker lang={lang} onBack={()=>setView("dashboard")}/>}

      {/* ── Audit Trail ── */}
      {view==="audit"&&<AuditTrail lang={lang} onBack={()=>setView("dashboard")}/>}

      {/* ── Senior Review ── */}
      {view==="senior"&&<SeniorReviewQueue lang={lang} onBack={()=>setView("dashboard")}/>}

      {/* ── Repair Shop ── */}
      {view==="repair"&&<RepairShopPortal lang={lang} onBack={()=>setView("dashboard")}/>}

      {/* ── Management ── */}
      {view==="management"&&<ManagementDash lang={lang} onBack={()=>setView("dashboard")}/>}

      {/* ── Wizard ── */}
      {view==="wizard"&&<div>
        <button onClick={()=>setView("dashboard")} className={`flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 ${lang==="ar"?"flex-row-reverse":""}`}>{lang==="ar"?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}{t.backDash}</button>
        <Steps current={step} steps={STP} lang={lang}/>

        {/* Step 1: Claim Info */}
        {step===1&&<div className="max-w-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{t.claimInfo}</h3><p className="text-sm text-gray-500 mb-6">{t.claimInfoSub}</p>
          {[{l:t.policyNum,k:"policyNumber",ph:lang==="ar"?"مثال: POL-2026-84521":"POL-2026-84521"},{l:t.fullName,k:"holderName",ph:lang==="ar"?"الاسم الكامل":"Full name"}].map(f=><div key={f.k} className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1.5">{f.l} *</label><input className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={f.ph} value={cd[f.k]} onChange={e=>setCd(p=>({...p,[f.k]:e.target.value}))}/></div>)}
          <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1.5">{lang==="ar"?"رقم الهيكل (VIN)":"VIN (Optional)"}</label><div className="flex gap-2"><input className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={lang==="ar"?"أدخل رقم الهيكل للتعبئة التلقائية":"Enter VIN to auto-fill vehicle info"} onChange={e=>{if(e.target.value.length>=17){setCd(p=>({...p,vehicleMake:"Toyota",vehicleModel:"Land Cruiser",vehicleYear:"2024"}))}}}/><button type="button" onClick={()=>setCd(p=>({...p,vehicleMake:"Toyota",vehicleModel:"Land Cruiser",vehicleYear:"2024"}))} className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200">{lang==="ar"?"بحث":"Lookup"}</button></div></div>
    <div className="grid grid-cols-3 gap-4 mb-4">{[{l:t.make,k:"vehicleMake",ph:lang==="ar"?"تويوتا":"Toyota"},{l:t.model,k:"vehicleModel",ph:lang==="ar"?"لاند كروزر":"Land Cruiser"},{l:t.year,k:"vehicleYear",ph:"2024"}].map(f=><div key={f.k}><label className="block text-sm font-medium text-gray-700 mb-1.5">{f.l} *</label><input className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={f.ph} value={cd[f.k]} onChange={e=>setCd(p=>({...p,[f.k]:e.target.value}))}/></div>)}</div>
          <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1.5">{t.incidentDate}</label><input type="date" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm outline-none" value={cd.incidentDate} onChange={e=>setCd(p=>({...p,incidentDate:e.target.value}))}/></div>
          <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-1.5">{t.description}</label><textarea className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm outline-none h-20 resize-none" placeholder={lang==="ar"?"وصف مختصر...":"Brief description..."} value={cd.description} onChange={e=>setCd(p=>({...p,description:e.target.value}))}/></div>
          <div className={`flex ${lang==="ar"?"justify-start":"justify-end"}`}><button onClick={()=>setStep(2)} disabled={!(cd.policyNumber&&cd.holderName&&cd.vehicleMake&&cd.vehicleModel&&cd.vehicleYear)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium ${cd.policyNumber&&cd.holderName&&cd.vehicleMake?"bg-blue-600 text-white hover:bg-blue-700":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>{t.uploadPhotos}<ChevronRight size={16} className={lang==="ar"?"rotate-180":""}/></button></div>
        </div>}

        {/* Step 2: Photos */}
        {step===2&&<div className="max-w-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{t.photoTitle}</h3><p className="text-sm text-gray-500 mb-6">{t.photoSub}</p>
          <div className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer ${drag?"border-blue-500 bg-blue-50":"border-gray-300 hover:border-gray-400"}`} onDrop={e=>{e.preventDefault();setDrag(false);const n=Array.from(e.dataTransfer.files).filter(f=>f.type.startsWith("image/")).map(f=>({file:f,preview:URL.createObjectURL(f),name:f.name}));setPhotos(p=>[...p,...n]);}} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onClick={()=>fileRef.current?.click()}><input ref={fileRef} type="file" className="hidden" multiple accept="image/*" onChange={e=>{const n=Array.from(e.target.files).filter(f=>f.type.startsWith("image/")).map(f=>({file:f,preview:URL.createObjectURL(f),name:f.name}));setPhotos(p=>[...p,...n]);}}/><div className="flex flex-col items-center gap-3"><div className="p-3 rounded-full bg-blue-50 text-blue-500"><Camera size={28}/></div><p className="font-medium text-gray-700">{t.dropPhotos}</p><p className="text-xs text-gray-400">{t.photoTypes}</p></div></div>
          {photos.length>0&&<div className="mt-5"><div className="grid grid-cols-4 gap-2">{photos.map((p,i)=><div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200"><img src={p.preview} className="w-full h-24 object-cover"/><button onClick={e=>{e.stopPropagation();setPhotos(prev=>prev.filter((_,j)=>j!==i))}} className="absolute top-1 right-1 p-0.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100"><X size={12}/></button></div>)}</div></div>}
          <PhotoGuide photos={photos} t={t} onUpload={()=>fileRef.current?.click()}/>
          <div className="flex justify-between mt-6"><button onClick={()=>setStep(1)} className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800">{lang==="ar"?<ChevronRight size={16}/>:<ChevronLeft size={16}/>}{t.back}</button><button onClick={runAI} disabled={!photos.length} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium ${photos.length?"bg-blue-600 text-white hover:bg-blue-700":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}><Brain size={16}/>{t.analyzeAI}</button></div>
        </div>}

        {/* Step 3: Assessment */}
        {step===3&&(()=>{
          const a = assessment;
          if(analyzing) return <div className="max-w-3xl"><h3 className="text-lg font-bold text-gray-900 mb-1">{t.analyzing}</h3><p className="text-sm text-gray-500 mb-6">{t.analyzingSub}</p><div className="grid grid-cols-2 gap-6"><PipelineTrace stage={pStage}/><div className="flex items-center justify-center">{photos[0]?<div className="relative rounded-lg overflow-hidden border border-gray-200"><img src={photos[0].preview} className="w-full h-52 object-cover opacity-60"/><div className="absolute inset-0 flex items-center justify-center"><Loader2 size={32} className="text-blue-500 animate-spin"/></div></div>:<div className="w-full h-52 bg-gray-100 rounded-lg flex items-center justify-center"><Brain size={32} className="text-gray-300 animate-pulse"/></div>}</div></div></div>;
          if(!a) return null;
          const totalMid = Math.round((a.totalEstimate.low+a.totalEstimate.high)/2);
          return <div className="max-w-4xl">
            {aiError&&<div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-5 flex items-start gap-3"><AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0"/><div><p className="text-sm font-semibold text-amber-800">{lang==="ar"?"خدمة الذكاء غير متوفرة":"AI Service Unavailable"}</p><p className="text-sm text-amber-700 mt-0.5">{lang==="ar"?"عرض تقييم تجريبي. في الإنتاج، سيتم التقييم اليدوي.":"Showing demo assessment. In production, agents proceed with manual assessment."}</p></div></div>}
            <div className="flex items-center justify-between mb-5"><div><h3 className="text-lg font-bold text-gray-900">{t.assessment}</h3><p className="text-sm text-gray-500">{t.assessSub}</p></div><span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${recClr[a.recommendation]||""}`}>{recLbl[a.recommendation]||""}</span></div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className={`rounded-xl border p-4 ${sevColor[a.overallSeverity]}`}><p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">{t.severity}</p><p className="text-xl font-bold">{sevLbl[a.overallSeverity]}</p></div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-700 p-4"><p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">{t.confidence}</p><p className="text-xl font-bold">{Math.round(a.confidenceScore*100)}%</p><div className="w-full bg-blue-200 rounded-full h-1.5 mt-2"><div className="bg-blue-600 h-1.5 rounded-full" style={{width:`${a.confidenceScore*100}%`}}/></div><ConfBD bd={a.confidenceBreakdown} t={t}/></div>
              <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">{t.estCost}</p><p className="text-xl font-bold text-gray-900">{fmtQAR(totalMid,lang)}</p><p className="text-xs text-gray-400 mt-0.5">{fmtQAR(a.totalEstimate.low,lang)} – {fmtQAR(a.totalEstimate.high,lang)}</p></div>
            </div>
            <Routing a={a} t={t} lang={lang}/>

            {/* Safety & Fraud Validation */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
              <div className="flex items-center gap-2 mb-3"><Shield size={16} className="text-blue-600"/><h4 className="text-sm font-semibold text-gray-900">{lang==="ar"?"فحوصات السلامة والاحتيال":"Safety & Fraud Checks"}</h4></div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {l:lang==="ar"?"بيانات EXIF الوصفية":"EXIF Metadata",v:lang==="ar"?"تم التحقق ✓":"Verified ✓",ok:true,d:lang==="ar"?"الكاميرا: iPhone 15 Pro، التاريخ يطابق":"Camera: iPhone 15 Pro, date matches claim"},
                  {l:lang==="ar"?"الموقع الجغرافي":"Geolocation",v:lang==="ar"?"متطابق ✓":"Match ✓",ok:true,d:lang==="ar"?"الدوحة، قطر — يطابق موقع الحادث":"Doha, Qatar — matches incident location"},
                  {l:lang==="ar"?"فحص التكرار":"Duplicate Check",v:lang==="ar"?"فريد ✓":"Unique ✓",ok:true,d:lang==="ar"?"لا توجد صور مطابقة في قاعدة البيانات":"No matching images in claims database"},
                  {l:lang==="ar"?"كشف التلاعب":"Manipulation Detection",v:lang==="ar"?"لم يكتشف ✓":"None detected ✓",ok:true,d:lang==="ar"?"لا توجد علامات تعديل رقمي":"No digital alteration signatures found"},
                ].map((c,i)=>(
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                    <CheckCircle size={14} className={`mt-0.5 shrink-0 ${c.ok?"text-emerald-500":"text-red-500"}`}/>
                    <div><div className="flex items-center gap-2"><span className="text-xs font-medium text-gray-800">{c.l}</span><span className={`text-xs ${c.ok?"text-emerald-600":"text-red-600"}`}>{c.v}</span></div><p className="text-xs text-gray-400 mt-0.5">{c.d}</p></div>
                  </div>
                ))}
              </div>
            </div>

            {a.inconsistencies?.length>0&&<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5"><div className="flex items-start gap-2"><AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0"/><div><p className="text-sm font-semibold text-red-800">{t.inconsistency}</p>{a.inconsistencies.map((inc,i)=><p key={i} className="text-sm text-red-700">{inc}</p>)}</div></div></div>}
            <div className="grid grid-cols-5 gap-4 mb-5">
              <div className="col-span-2">{photos[0]&&<Annotator photo={photos[0].preview} regions={MOCK_REGIONS} hl={hl} setHl={setHl} ann={ann} setAnn={setAnn} t={t} lang={lang}/>}</div>
              <div className="col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"><h4 className="font-semibold text-gray-900 text-sm">{t.dmgBreakdown}</h4><span className="text-xs text-gray-400">{a.damages.length} {t.areas}</span></div>
                <table className="w-full text-sm"><thead className="bg-gray-50 text-gray-500 text-xs uppercase"><tr><th className="text-start px-4 py-2 font-medium">{t.area}</th><th className="text-start px-4 py-2 font-medium">{t.type}</th><th className="text-start px-4 py-2 font-medium">{t.severity}</th><th className="text-start px-4 py-2 font-medium">{t.cost}</th><th className="text-start px-4 py-2 font-medium">{t.adj}</th></tr></thead>
                <tbody className="divide-y divide-gray-100">{a.damages.map((d,i)=><tr key={i} className={`cursor-pointer ${hl===d.region?"bg-blue-50":"hover:bg-gray-50"}`} onMouseEnter={()=>setHl(d.region)} onMouseLeave={()=>setHl(null)}>
                  <td className="px-4 py-2.5"><span className="font-medium text-gray-800">{lang==="ar"?(d.areaAr||d.area):d.area}</span>{d.dbRef&&<span className="block text-xs text-gray-400 font-mono">{d.dbRef}</span>}</td>
                  <td className="px-4 py-2.5 text-gray-600">{lang==="ar"?(d.typeAr||d.type):d.type}</td>
                  <td className="px-4 py-2.5"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${sevColor[d.severity]}`}>{sevLbl[d.severity]}</span></td>
                  <td className="px-4 py-2.5 text-gray-800 text-xs">{fmtQAR(d.estimatedCost.low,lang)}–{fmtQAR(d.estimatedCost.high,lang)}</td>
                  <td className="px-4 py-2.5"><input type="text" placeholder={fmtQAR(Math.round((d.estimatedCost.low+d.estimatedCost.high)/2),lang)} value={adj[i]||""} onChange={e=>setAdj(p=>({...p,[i]:e.target.value}))} className="w-24 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"/></td>
                </tr>)}</tbody></table>
              </div>
            </div>
            {/* Comparable + Summary */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-5"><div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"><History size={14} className="text-gray-500"/><h4 className="font-semibold text-gray-900 text-sm">{t.compClaims}</h4></div>{COMP_CLAIMS.map(c=><div key={c.id} className="px-4 py-2 flex items-center gap-4 text-xs border-b last:border-0"><span className="text-blue-600 font-medium w-20">{c.id}</span><span className="text-gray-600 flex-1">{lang==="ar"?c.vehicleAr:c.vehicle} — {lang==="ar"?c.damageAr:c.damage}</span><span className="text-gray-800 font-medium">{fmtQAR(c.aiEst,lang)}</span><span className="text-gray-800 font-medium">{fmtQAR(c.finalCost,lang)}</span><span className={`font-mono ${c.delta.startsWith("-")?"text-amber-600":"text-emerald-600"}`}>{c.delta}</span></div>)}</div>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-5"><div className="flex items-start gap-2"><Brain size={16} className="text-blue-600 mt-0.5 shrink-0"/><div><p className="text-sm font-medium text-gray-900 mb-1">{t.aiSummary}</p><p className="text-sm text-gray-600 leading-relaxed">{lang==="ar"?(a.summaryAr||a.summary):a.summary}</p></div></div></div>
            <div className="mb-5"><label className="block text-sm font-medium text-gray-700 mb-1.5">{t.agentNotes}</label><textarea className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm outline-none h-20 resize-none" placeholder={t.notesPlaceholder} value={notes} onChange={e=>setNotes(e.target.value)}/></div>
            <div className="flex justify-between"><button onClick={()=>setStep(2)} className="flex items-center gap-2 px-4 py-2.5 text-gray-600">{lang==="ar"?<ChevronRight size={16}/>:<ChevronLeft size={16}/>}{t.back}</button><button onClick={()=>setStep(4)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700"><UserCheck size={16}/>{t.reviewBtn}</button></div>
          </div>;
        })()}

        {/* Step 4: Review */}
        {step===4&&(()=>{
          const a=assessment,totalAnn=Object.keys(ann).length,elapsed=startTime?Math.round((Date.now()-startTime)/1000):0,m=Math.floor(elapsed/60),sec=elapsed%60;
          if(submitted) return <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5"><CheckCircle size={32} className="text-emerald-600"/></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.submitted}</h3>
            <p className="text-gray-500 mb-6">{routing==="auto"?t.submittedAutoMsg:t.submittedSeniorMsg}</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3 text-sm text-emerald-800"><span className="font-semibold">{t.timeSaved}:</span> ~{Math.max(0,45-m)} {t.vsManualAssess}</div>
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 mb-6 text-sm text-violet-800 flex items-center justify-center gap-2"><Brain size={16} className="text-violet-600"/>{totalAnn} {t.annQueued}</div>
            <button onClick={()=>{setView("dashboard");setSubmitted(false)}} className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700"><ArrowRight size={16} className={lang==="ar"?"rotate-180":""}/>{t.returnDash}</button>
          </div>;
          const mid=Math.round((a.totalEstimate.low+a.totalEstimate.high)/2);
          return <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t.reviewSubmit}</h3><p className="text-sm text-gray-500 mb-6">{t.reviewSub}</p>
            <div className="bg-white rounded-xl border p-5 mb-5"><h4 className="font-semibold text-sm mb-3">{t.claimSummary}</h4><div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm"><div><span className="text-gray-500">{t.policy}:</span> {cd.policyNumber}</div><div><span className="text-gray-500">{t.holder}:</span> {cd.holderName}</div><div><span className="text-gray-500">{t.vehicleLbl}:</span> {cd.vehicleYear} {cd.vehicleMake} {cd.vehicleModel}</div><div><span className="text-gray-500">{t.incident}:</span> {cd.incidentDate?<>{cd.incidentDate} <span className="text-gray-400 text-xs">({hijriDate(cd.incidentDate)})</span></>:"—"}</div></div></div>
            <div className="bg-white rounded-xl border p-5 mb-5"><h4 className="font-semibold text-sm mb-3">{t.aiAssessment}</h4><div className="grid grid-cols-3 gap-4 text-sm mb-3"><div><span className="text-gray-500">{t.severity}:</span> <span className="font-medium ms-1">{sevLbl[a.overallSeverity]}</span></div><div><span className="text-gray-500">{t.confidence}:</span> <span className="font-medium ms-1">{Math.round(a.confidenceScore*100)}%</span></div><div><span className="text-gray-500">{t.estCost}:</span> <span className="font-bold ms-1">{fmtQAR(mid,lang)}</span></div></div><p className="text-sm text-gray-600">{lang==="ar"?(a.summaryAr||a.summary):a.summary}</p></div>
            <div className="bg-white rounded-xl border p-5 mb-6"><h4 className="font-semibold text-sm mb-3">{t.routing}</h4><div className="flex flex-col gap-3">{[{v:"auto",tl:t.autoApprove,d:t.autoApproveSub},{v:"senior",tl:t.seniorAdj,d:t.seniorAdjSub}].map(o=><label key={o.v} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${routing===o.v?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-gray-300"}`}><input type="radio" name="r" value={o.v} checked={routing===o.v} onChange={()=>setRouting_(o.v)} className="mt-0.5 accent-blue-600"/><div><p className="text-sm font-medium">{o.tl}</p><p className="text-xs text-gray-500">{o.d}</p></div></label>)}</div></div>
            <div className="flex justify-between"><button onClick={()=>setStep(3)} className="flex items-center gap-2 px-4 py-2.5 text-gray-600">{lang==="ar"?<ChevronRight size={16}/>:<ChevronLeft size={16}/>}{t.back}</button><button onClick={()=>setSubmitted(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 shadow-sm"><Send size={16}/>{t.submit}</button></div>
          </div>;
        })()}
      </div>}
    </main>
  </div>;
}
