import React, { useState, useRef, useEffect } from "react";
import { 
  UserCheck, Shield, ChevronRight, Award, MapPin, Download, CheckCircle2, 
  Cpu, Sparkles, AlertCircle, Loader2, Database, Lock, LogOut 
} from "lucide-react";
import { VolunteerTask } from "../types";
import RYJPLogo from "./RYJPLogo";
import { 
  initAuth, googleSignIn, logout, getAccessToken 
} from "../lib/firebaseAuth";
import { User as FirebaseUser } from "firebase/auth";

const INDIAN_STATES = [
  "Delhi", "Maharashtra", "Uttar Pradesh", "Bihar", "West Bengal", "Madhya Pradesh",
  "Rajasthan", "Tamil Nadu", "Karnataka", "Gujarat", "Andhra Pradesh", "Telangana",
  "Punjab", "Haryana", "Kerala", "Assam", "Jharkhand", "Odisha", "Jammu & Kashmir"
];

const INITIAL_TASKS: VolunteerTask[] = [
  { id: "v1", title: "Social Media Fact Warrior (Expose 3 fake forwards)", points: 150, status: "available" },
  { id: "v2", title: "Local Youth Meetup Organiser (Delhi Youth Hub)", points: 300, status: "available" },
  { id: "v3", title: "Digital Campaigner (Share RYJP Manifesto & Vision)", points: 100, status: "available" },
  { id: "v4", title: "Policy Translator (Translate manifesto to local languages)", points: 200, status: "available" }
];

export default function JoinSection() {
  // Join party form
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stateName, setStateName] = useState("");
  const [ph, setPh] = useState("");
  const [selectedRole, setSelectedRole] = useState("Youth Leader");
  const [membershipCard, setMembershipCard] = useState<{
    id: string;
    name: string;
    state: string;
    issueDate: string;
    role: string;
  } | null>(null);

  // Authentication & Google Sheets states
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  // Constants
  const spreadsheetId = "1kbe_T70ZW50dbCU3tO5n307mj4NCLAQ9FACDShDI81E";

  useEffect(() => {
    // Listen to Firebase auth states
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Sync details to Google Sheets
  const saveToGoogleSheets = async (
    tokenToUse: string,
    memberId: string,
    formData: { name: string; age: string; state: string; ph: string; role: string }
  ) => {
    setSaveStatus("saving");
    setSaveError(null);
    try {
      // 1. Fetch spreadsheet metadata to get original sheet sheet-name safely
      const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      
      let sheetName = "Sheet1";
      if (metaRes.ok) {
        const metaData = await metaRes.json();
        if (metaData.sheets && metaData.sheets.length > 0) {
          sheetName = metaData.sheets[0].properties.title || "Sheet1";
        }
      } else {
        console.warn("Spreadsheet access restricted or requires spreadsheet scope authorize credentials.");
      }

      // 2. Check if Sheet is empty and needs headers
      let needsHeaders = false;
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:G1`,
        { headers: { Authorization: `Bearer ${tokenToUse}` } }
      );
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        if (!checkData.values || checkData.values.length === 0) {
          needsHeaders = true;
        }
      }

      const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const rowsToAppend = [];

      if (needsHeaders) {
        rowsToAppend.push([
          "Timestamp (IST)",
          "Membership ID",
          "Full Name",
          "Age",
          "State",
          "WhatsApp Number",
          "Selected Role"
        ]);
      }

      rowsToAppend.push([
        timestamp,
        memberId,
        formData.name,
        formData.age,
        formData.state,
        formData.ph || "N/A",
        formData.role
      ]);

      // 3. Append to target Google Sheet
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A:G:append?valueInputOption=USER_ENTERED`;
      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: rowsToAppend,
        }),
      });

      if (!appendRes.ok) {
        const errDetail = await appendRes.text();
        throw new Error(`Google Sheets API responded with Status ${appendRes.status}: ${errDetail}`);
      }

      setSaveStatus("success");
    } catch (err: any) {
      console.error("Sheets sync failed:", err);
      setSaveStatus("error");
      setSaveError(err.message || "Failed to save details to Google Sheets. Verify permissions on cell ranges.");
    }
  };

  const handleAuthTrigger = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err) {
      console.error("Auth trigger failure:", err);
    }
  };

  const executeJoinAndSheetsAppend = async (tokenToUse: string, randomID: string) => {
    const todayStr = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });

    // Set preview membership card status
    setMembershipCard({
      id: randomID,
      name: name,
      state: stateName,
      issueDate: todayStr,
      role: selectedRole
    });

    await saveToGoogleSheets(tokenToUse, randomID, {
      name,
      age,
      state: stateName,
      ph,
      role: selectedRole
    });
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age || !stateName) {
      alert("Please fill all required details");
      return;
    }

    const randomID = `RYJP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setIsSubmitting(true);

    if (!currentUser) {
      try {
        const authResult = await googleSignIn();
        if (authResult) {
          setCurrentUser(authResult.user);
          setAccessToken(authResult.accessToken);
          await executeJoinAndSheetsAppend(authResult.accessToken, randomID);
        }
      } catch (err) {
        console.error("Auth canceled or errored:", err);
        setSaveStatus("error");
        setSaveError("Google authentication required to submit youth membership.");
      }
    } else if (accessToken) {
      await executeJoinAndSheetsAppend(accessToken, randomID);
    }
    setIsSubmitting(false);
  };

  const handleLoginSubmitClick = async () => {
    if (!name.trim() || !age || !stateName) {
      alert("Please fill out all required fields (Full Name, Age, State) first!");
      return;
    }

    const randomID = `RYJP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setIsSubmitting(true);
    try {
      const authResult = await googleSignIn();
      if (authResult) {
        setCurrentUser(authResult.user);
        setAccessToken(authResult.accessToken);
        await executeJoinAndSheetsAppend(authResult.accessToken, randomID);
      }
    } catch (err: any) {
      console.error("Auth trigger failure on button click:", err);
      setSaveStatus("error");
      setSaveError(err.message || "Failed to authenticate your session.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Volunteer section state
  const [tasks, setTasks] = useState<VolunteerTask[]>(INITIAL_TASKS);
  const [isVolunteered, setIsVolunteered] = useState(false);
  const [vName, setVName] = useState("");
  const [claimedCount, setClaimedCount] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleClaimTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: t.status === "available" ? "claimed" : "completed" } : t))
    );
    setClaimedCount((prev) => prev + 1);
  };

  const handleResetCard = () => {
    setMembershipCard(null);
    setName("");
    setAge("");
    setStateName("");
    setPh("");
    setSaveStatus("idle");
    setSaveError(null);
  };

  const printCard = () => {
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print/download your RYJP member card.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>${name}'s RYJP Membership Card</title>
          <style>
            body { background: #f8fafc; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card-wrap { width: 450px; background: linear-gradient(135deg, #0A2E6D 0%, #041635 100%); border-radius: 16px; border: 2px solid #ea580c; padding: 24px; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.35); position: relative; }
          </style>
        </head>
        <body>
          <div class="card-wrap">
            ${cardEl.innerHTML}
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <section id="join-us" className="py-20 bg-white border-t border-slate-100 text-slate-800 relative font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0A2E6D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-mono text-sm tracking-widest uppercase font-extrabold block mb-2">
            BE THE CHANGE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0A2E6D] uppercase">
            Together We Can <span className="text-[#ea580c]">Build New India</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm leading-relaxed font-semibold">
            Choose whether you want to generate your official RYJP Digital Membership Key card, or enlist as a grassroots fact-checking volunteer instantly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column Left: Join Movement Form / Digital Card Display */}
          <div className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-md">
            {/* Google Sheets directory status banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-orange-600" />
                <div className="text-left">
                  <h4 className="text-[10px] md:text-xs font-black text-[#0A2E6D] uppercase font-mono leading-none">
                    Sheets Registry Live Gateway
                  </h4>
                  <p className="text-[9px] text-slate-400 font-mono mt-1 font-semibold block uppercase leading-none">
                    Sheet: {spreadsheetId.slice(0,6)}...{spreadsheetId.slice(-6)}
                  </p>
                </div>
              </div>
              {currentUser ? (
                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  <span className="text-[10px] text-emerald-600 font-mono font-black uppercase flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LINKED: {currentUser.email?.split("@")[0].toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-[9px] text-[#0A2E6D] hover:text-red-500 font-mono font-bold uppercase border border-slate-200 px-2 py-1 rounded cursor-pointer transition-colors hover:bg-slate-50"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAuthTrigger}
                  className="text-[10px] bg-orange-600 hover:bg-orange-700 text-white font-mono font-black uppercase px-3 py-1.5 rounded flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Google Verify</span>
                </button>
              )}
            </div>

            {!membershipCard ? (
              <div>
                <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl border border-slate-200">
                  <UserCheck className="w-5 h-5 text-[#0A2E6D]" />
                  <div className="text-left">
                    <h3 className="text-base font-black text-[#0A2E6D] uppercase">RYJP Youth Membership</h3>
                    <p className="text-[11px] font-bold text-slate-450">Generate your digital identity card in seconds.</p>
                  </div>
                </div>

                <form onSubmit={handleJoin} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priyanshu Sharma"
                        className="w-full text-xs p-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] placeholder:text-slate-400 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Age *</label>
                      <input
                        type="number"
                        required
                        min="15"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 24"
                        className="w-full text-xs p-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] placeholder:text-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select State *</label>
                      <select
                        required
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full text-xs p-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] font-bold"
                      >
                        <option value="">-- Choose State --</option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp / Ph (Optional)</label>
                      <input
                        type="tel"
                        value={ph}
                        onChange={(e) => setPh(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full text-xs p-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] placeholder:text-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-extrabold pb-0.5">Desired Platform Role</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Youth Leader", "Digital Warrior", "Fact Checker", "Policy Activist"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`text-[11px] p-2.5 rounded-lg border text-center transition-all cursor-pointer font-bold ${
                            selectedRole === role
                              ? "bg-orange-600 text-white border-orange-600 shadow-sm font-extrabold text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:text-[#0A2E6D] hover:bg-slate-100/50"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    {currentUser ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0A2E6D] hover:bg-[#082456] disabled:bg-[#0A2E6D]/50 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/15 text-xs tracking-wider uppercase transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                            <span>Saving to Sheets...</span>
                          </>
                        ) : (
                          <>
                            <span>Join Movement & Save to Sheets</span>
                            <ChevronRight className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleLoginSubmitClick}
                        disabled={isSubmitting}
                        className="w-full bg-[#0A2E6D] hover:bg-[#082456] disabled:bg-[#0A2E6D]/50 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/15 text-xs tracking-wider uppercase transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                            <span>Authorizing & Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Join Movement & Save to Sheets</span>
                            <ChevronRight className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  {!currentUser && (
                    <p className="text-[10px] text-slate-450 font-mono text-center mt-3 uppercase font-semibold leading-relaxed">
                      💡 Active Google Account verification credentials are required to append your membership directly to the live sheets ledger record.
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-6">
                  <h3 className="text-base font-black text-emerald-600 flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Membership Activated Successfully!
                  </h3>
                  <button
                    onClick={handleResetCard}
                    className="text-slate-500 hover:text-[#0A2E6D] text-xs border border-slate-200 rounded px-2.5 py-1 select-none cursor-pointer hover:bg-slate-100 font-bold"
                  >
                    Create New Card
                  </button>
                </div>

                {/* Actual printable RYJP Membership ID card */}
                <div
                  ref={cardRef}
                  className="w-full max-w-[460px] aspect-[1.6/1] bg-gradient-to-br from-[#0A2E6D] via-[#082456] to-[#041635] rounded-2xl border-2 border-orange-500 p-5 text-white relative shadow-2xl overflow-hidden"
                >
                  {/* Digital Watermark background graphic */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(234,88,12,0.15)_0%,transparent_60%)] pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] select-none text-[80px] font-black tracking-widest text-slate-300 pointer-events-none rotate-12">
                    RYJP
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-orange-500/30 pb-3 mb-4">
                    <div className="flex items-center gap-2 font-sans">
                      <RYJPLogo className="w-9 h-9" />
                      <div className="text-left">
                        <h4 className="text-[11px] font-black tracking-[1.5px] uppercase text-orange-400">RYJP Digital Gateway</h4>
                        <p className="text-[7px] text-orange-200/70 uppercase font-mono tracking-widest">Rashtriya Yuva Jan Shakti Party</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] bg-orange-500/20 text-orange-300 font-mono py-0.5 px-2 rounded-full font-bold uppercase tracking-wider">
                        Active Agent
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-12 gap-3 text-left">
                    <div className="col-span-8 space-y-2">
                      <div>
                        <span className="text-[7px] uppercase font-mono tracking-widest text-orange-200/50 block">Member Name</span>
                        <span className="text-[14px] font-extrabold tracking-tight text-white block truncate">{membershipCard.name}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <span className="text-[7px] uppercase font-mono tracking-widest text-orange-200/50 block">State Jurisdiction</span>
                          <span className="text-[10px] font-bold text-slate-200 block">{membershipCard.state}</span>
                        </div>
                        <div>
                          <span className="text-[7px] uppercase font-mono tracking-widest text-orange-200/50 block">Desig. Role</span>
                          <span className="text-[10px] font-bold text-amber-400 block">{membershipCard.role}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1 pt-1">
                        <div>
                          <span className="text-[7px] uppercase font-mono tracking-widest text-orange-200/50 block">Identification ID</span>
                          <span className="text-[10px] font-mono font-bold text-orange-400 block tracking-wider">{membershipCard.id}</span>
                        </div>
                        <div>
                          <span className="text-[7px] uppercase font-mono tracking-widest text-orange-200/50 block">Active Date</span>
                          <span className="text-[10px] font-mono text-slate-300 block">{membershipCard.issueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4 flex flex-col items-center justify-center border-l border-white/10 pl-3">
                      {/* Fake CSS/SVG QR code to represent authenticity */}
                      <div className="w-16 h-16 bg-white p-1.5 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden flex-shrink-0">
                        <div className="w-full h-full relative grid grid-cols-4 grid-rows-4 gap-0.5 opacity-90">
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-100 rounded-xs"></div>

                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-100 rounded-xs"></div>
                          <div className="bg-slate-100 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>

                          <div className="bg-slate-100 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>

                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-100 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                        </div>
                      </div>
                      <span className="text-[5px] text-center text-slate-400 font-mono tracking-widest mt-2 uppercase block">Integrity Scan Code</span>
                    </div>
                  </div>

                  {/* Slogan Footer Watermark */}
                  <div className="text-center mt-3 border-t border-white/10 pt-2 flex items-center justify-between text-[7px] text-orange-200/50 font-bold tracking-widest uppercase">
                    <span>Power of Youth</span>
                    <span>Voice of Truth</span>
                    <span>Bharat 2026</span>
                  </div>
                </div>

                {/* Google Sheets Sync Indicator Section */}
                <div className="w-full max-w-[460px] mt-4">
                  {saveStatus === "saving" && (
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-2.5 text-blue-800 text-xs font-semibold uppercase font-mono">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span>Writing details to Google Sheets...</span>
                    </div>
                  )}

                  {saveStatus === "success" && (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center gap-2.5 text-emerald-800 text-xs font-semibold uppercase font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />
                      <span>Saved successfully to Google Sheets directory!</span>
                    </div>
                  )}

                  {saveStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex flex-col gap-1.5 text-red-800 text-xs font-semibold uppercase font-mono text-left">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span>Google Sheets sync failed</span>
                      </div>
                      <p className="text-[10px] text-red-600 font-semibold lowercase font-mono leading-relaxed normal-case">
                        {saveError || "Ensure Sheets permissions are set appropriately."}
                      </p>
                      <button
                        onClick={async () => {
                          const tok = accessToken || (await googleSignIn())?.accessToken;
                          if (tok && membershipCard) {
                            await saveToGoogleSheets(tok, membershipCard.id, {
                              name,
                              age,
                              state: stateName,
                              ph,
                              role: selectedRole
                            });
                          }
                        }}
                        className="mt-1 bg-red-600 hover:bg-red-700 text-white text-[10px] px-2.5 py-1 rounded cursor-pointer uppercase tracking-wider font-extrabold transition-colors w-fit"
                      >
                        Retry Sheets Sync
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={printCard}
                    className="flex items-center gap-2 bg-[#0A2E6D] hover:bg-[#082456] text-white font-extrabold py-2.5 px-6 rounded-lg text-xs tracking-wide cursor-pointer transition-colors shadow-lg shadow-blue-500/10 uppercase"
                  >
                    <Download className="w-4 h-4" /> Download / Print Gateway Pass
                  </button>
                  
                  {saveStatus !== "success" && (
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 border border-slate-300 text-slate-600 font-bold py-2.5 px-4 rounded-lg text-xs tracking-wide cursor-pointer hover:bg-slate-100 transition-colors uppercase"
                    >
                      <span>View Spreadsheet</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Column Right: Volunteer Activism panel */}
          <div className="lg:col-span-5 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-md flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl border border-slate-200">
                <Shield className="w-5 h-5 text-orange-500" />
                <div className="text-left">
                  <h3 className="text-base font-black text-[#0A2E6D] uppercase">Volunteer Campaign</h3>
                  <p className="text-[11px] font-bold text-slate-450">Claim truth verification missions and gain reputation points.</p>
                </div>
              </div>

              {!isVolunteered ? (
                <div className="space-y-4 text-left">
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                    RYJP is powered entirely by active youth. Enlist as a digital campaigner and help us unmask malicious fake news, organize forums, and spread actual policy improvements across state junctions.
                  </p>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Enter Nickname</label>
                    <input
                      type="text"
                      value={vName}
                      onChange={(e) => setVName(e.target.value)}
                      placeholder="e.g. TruthSeeker_Rohit"
                      className="w-full text-xs p-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] placeholder:text-slate-400 font-semibold"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!vName.trim()) {
                        alert("Please enter a nickname to join.");
                        return;
                      }
                      setIsVolunteered(true);
                    }}
                    className="w-full bg-[#0A2E6D] hover:bg-[#082456] text-white font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors uppercase tracking-widest"
                  >
                    <Award className="w-4 h-4" /> Access Campaign Center
                  </button>
                </div>
              ) : (
                <div className="text-left">
                  <div className="flex items-center justify-between mb-4 bg-[#0A2E6D]/5 text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold">
                    <span>Rank: <strong className="text-orange-600">Jan-Shakti Advocate</strong></span>
                    <span>Rep: <strong className="text-[#0A2E6D]">{claimedCount * 150} points</strong></span>
                  </div>

                  <p className="text-[10px] font-extrabold text-slate-400 mb-3 uppercase tracking-wider">Active Missions Queue:</p>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs shadow-xs"
                      >
                        <div className="text-left">
                          <p className="font-extrabold text-slate-850">{task.title}</p>
                          <span className="text-[10px] text-orange-600 font-bold font-mono">Reward: +{task.points} Rep points</span>
                        </div>

                        {task.status === "available" ? (
                          <button
                            onClick={() => handleClaimTask(task.id)}
                            className="bg-orange-600 hover:bg-orange-700 text-white rounded-md py-1.5 px-3 font-extrabold cursor-pointer transition-all text-[10px] flex-shrink-0 uppercase tracking-wider"
                          >
                            Claim
                          </button>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono py-1.5 px-3 rounded-md font-extrabold uppercase border border-emerald-200 flex-shrink-0">
                            Claimed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-slate-100 p-3 rounded-xl border border-slate-200">
                    <input type="checkbox" id="whatsapp-notify" className="accent-[#0A2E6D] cursor-pointer w-4 h-4" />
                    <label htmlFor="whatsapp-notify" className="text-[10px] text-slate-500 select-none cursor-pointer font-bold leading-none">
                      Send daily campaign task digests to my registered number.
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
