import { useState, useEffect, useRef } from "react";

const videos = [
  { id: 1, title: "Jannat (HD Video) | Ammy Virk | Tania | B Praak | Jaani | Latest Punjabi Song 202...", channel: "Being Punjabi", views: "10M", time: "2y ago", duration: "3:26", verified: true, isMusic: true, embedId: "H76RscvoT1w" },
  { id: 2, title: "FURSAT – JEMIIXYZ | Official Audio | Emotional Hindi Urdu Rap | Sad Rap 2026", channel: "JEMIIXYZ", views: "399", time: "11d ago", duration: "3:20", verified: false, isMusic: true, embedId: "qMfvbKBvOtI" },
  { id: 3, title: "Jhol | Coke Studio Pakistan | Season 15 | Maanu x Annural Khalid", channel: "Coke Studio Pakistan", views: "557M", time: "1y ago", duration: "4:39", verified: true, isMusic: true, embedId: "-2RAq5o5pwc" },
  { id: 4, title: "Finding Her (Female Version) : Tanishka Bahl | Kushagra | Bharath | Saaheal | UR ...", channel: "UR DEBUT", views: "25M", time: "8mo ago", duration: "3:31", verified: true, isMusic: true, embedId: "3Cp2QTBZAFQ" },
  { id: 5, title: "Haye Ni Apa Fer Milange, Kde Na Kde Fer Milange (Video Song)| Savi Kahlon| Puls...", channel: "Pulse Beats", views: "1.2M", time: "2y ago", duration: "5:09", verified: false, isMusic: true, embedId: "DLZD47lj82o" },
  { id: 6, title: "TABOOT 3 Horror Story | Hindi Horror Stories | Skull Towns | Animated Stories...", channel: "Oye.Samar.Villager.-7y-q", views: "55K", time: "1d ago", duration: "24:31", verified: false, embedId: "3hgUqQqgN5c" },
  { id: 7, title: "The Divine Fury (2019) || Korean Movie🎬 Explained in हिन्दी", channel: "StoryBox", views: "1.4K", time: "7d ago", duration: "20:10", verified: false, embedId: "smku3wZl5bI" },
  { id: 8, title: "Extinct Animals That Might Still Be Alive – Part 2", channel: "WILD Xfact", views: "243K", time: "2mo ago", duration: "10:28", verified: false, embedId: "D-SxHgx3vno" },
  { id: 9, title: "Hansel & Gretel Full Story हिंदी اردو Fairy Tale | Witch House Story #hindikahania...", channel: "PixieDream Tales Hindi", views: "106K", time: "1d ago", duration: "15:38", verified: false, dubbed: true, embedId: "gmWWvZ80Fbc" },
  { id: 10, title: "Meri Zindagi Hai Tu Episode 23 | 23 JAN 2026 | ENG SUB | Hania Aamir | Bilal ...", channel: "ARY Digital HD", views: "23M", time: "3mo ago", duration: "39:09", verified: true, embedId: "VQK7vu-6Vso" },
  { id: 11, title: "Puri Duniya Tabah Ho Gayi Sirf 1% Log Hi Zinda Bache | The Eternaut Film/Movie ...", channel: "Flick Explained", views: "34K", time: "4d ago", duration: "28:35", verified: false, embedId: "RVMJaNA1Kyw" },
  { id: 12, title: "Franklin Turned His House Into an Air Force Base in GTA 5 | SHINCHAN and ...", channel: "HAMID-T GAMING", views: "671K", time: "3d ago", duration: "43:33", verified: true, embedId: "hEfL9TbkEDw" },
  { id: 13, title: "Short #1", channel: "YouTube Shorts", views: "1.5M", time: "3d ago", duration: "0:30", verified: false, isShort: true, embedId: "tBUP7m1RtPI" },
  { id: 14, title: "Short #2", channel: "YouTube Shorts", views: "2.1M", time: "5d ago", duration: "0:45", verified: false, isShort: true, embedId: "y1UVAtHALaA" },
  { id: 15, title: "Short #3", channel: "YouTube Shorts", views: "890K", time: "1d ago", duration: "0:28", verified: false, isShort: true, embedId: "UuuY94mAh-U" },
  { id: 16, title: "Short #4", channel: "YouTube Shorts", views: "3.4M", time: "2d ago", duration: "0:55", verified: false, isShort: true, embedId: "NC1un9vU2Sw" },
  { id: 17, title: "Short #5", channel: "YouTube Shorts", views: "750K", time: "6d ago", duration: "0:40", verified: false, isShort: true, embedId: "f96IjWIpWA8" },
  { id: 18, title: "Short #6", channel: "YouTube Shorts", views: "520K", time: "4d ago", duration: "0:35", verified: false, isShort: true, embedId: "V5dMzOXG5N8" },
];

const categories = ["All","CID","Ghost stories","Music","Gaming","Mixes","Pakistani dramas","Film criticisms","Storytelling","Korean dramas","Live","News"];
const channelColors = ["#cc0000","#1565c0","#2e7d32","#6a1b9a","#e65100","#00695c","#c62828","#283593","#f57f17","#00838f"];
const bgColors = ["#1a1a2e","#2d1b4e","#0d2137","#1a2f0d","#2d1a0d","#0d1a2d","#2d0d1a","#1a2d0d","#0d1a1a","#2d2d0d","#1a0d2d","#0d2d1a"];

const chColor = (name) => channelColors[name.charCodeAt(0) % channelColors.length];
const bgColor = (id) => bgColors[(id - 1) % bgColors.length];

// ─── Responsive hook ──────────────────────────────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const MenuIcon  = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const SearchIcon= () => <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const MicIcon   = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10a7 7 0 0 0 14 0" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/></svg>;
const BellIcon  = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#606060" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const PlusIcon  = () => <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const DotsVIcon = () => <svg viewBox="0 0 24 24" width={20} height={20} fill="#606060"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>;
const HomeIcon  = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><path d="M3 12L12 3l9 9v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>;
const ShortsIcon= () => <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 1 0-3.5-6.56l-9 4.81A3.75 3.75 0 0 0 7.27 13.7l1.2.5L7 14.94a3.75 3.75 0 1 0 3.5 6.56l9-4.81a3.75 3.75 0 0 0-1.73-6.37z"/></svg>;
const SubIcon   = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/></svg>;
const YouIcon   = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="#606060" strokeWidth="2"><path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>;
const CloseIcon = () => <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const MusicNote = () => <svg viewBox="0 0 24 24" width={10} height={10} fill="white"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;

const navItems = [
  { label: "Home", short: "Home", Icon: HomeIcon },
  { label: "Shorts", short: "Shorts", Icon: ShortsIcon },
  { label: "Subscriptions", short: "Subs", Icon: SubIcon },
  { label: "You", short: "You", Icon: YouIcon },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: chColor(name),
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: size * 0.4, flexShrink: 0, userSelect: "none",
  }}>
    {name.charAt(0).toUpperCase()}
  </div>
);

// ─── Video Modal ──────────────────────────────────────────────────────────────
const VideoModal = ({ video, onClose }) => {
  useEffect(() => {
    if (video) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [video]);

  if (!video) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(0,0,0,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "12px",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: video.isShort ? 400 : 900,
        background: "#0f0f0f", borderRadius: 12, overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px" }}>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, flex: 1, marginRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {video.title}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 6, borderRadius: "50%", minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ position: "relative", paddingBottom: video.isShort ? "177.78%" : "56.25%", background: "#000" }}>
          <iframe
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div style={{ padding: "10px 12px", display: "flex", gap: 10, alignItems: "center" }}>
          <Avatar name={video.channel} size={32} />
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{video.channel}</div>
            <div style={{ color: "#aaa", fontSize: 12 }}>
              {[video.views && `▷ ${video.views}`, video.time].filter(Boolean).join("  ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Thumbnail ────────────────────────────────────────────────────────────────
const Thumbnail = ({ video, onClick, compact = false }) => {
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        ...(compact
          ? { width: 168, height: 94, flexShrink: 0, borderRadius: 8 }
          : { width: "100%", paddingBottom: "56.25%", borderRadius: 10 }),
        overflow: "hidden",
        background: bgColor(video.id),
        cursor: "pointer",
      }}
    >
      <div style={compact ? { position: "absolute", inset: 0 } : { position: "absolute", inset: 0 }}>
        {!failed ? (
          <img
            src={`https://i.ytimg.com/vi/${video.embedId}/hqdefault.jpg`}
            alt={video.title}
            onError={() => setFailed(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.22s ease",
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 10 }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: compact ? 11 : 14, textAlign: "center", lineHeight: 1.3 }}>
              {video.title.split("|")[0].trim()}
            </span>
          </div>
        )}

        {hovered && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: compact ? 36 : 52, height: compact ? 36 : 52, borderRadius: "50%", background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width={compact ? 16 : 22} height={compact ? 16 : 22} fill="white"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
        )}

        {video.duration && (
          <div style={{
            position: "absolute", bottom: 5, right: 5,
            background: "rgba(0,0,0,0.85)", color: "#fff", borderRadius: 3,
            padding: "1px 5px", fontSize: compact ? 11 : 12, fontWeight: 600, fontFamily: "monospace",
            display: "flex", alignItems: "center", gap: 3,
          }}>
            {video.isMusic && !compact && <MusicNote />}
            {video.duration}
          </div>
        )}

        {video.isShort && !compact && (
          <div style={{
            position: "absolute", top: 5, left: 5,
            background: "rgba(0,0,0,0.75)", color: "#fff", borderRadius: 3,
            padding: "1px 6px", fontSize: 11, border: "1px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", gap: 3,
          }}>
            <ShortsIcon /> Shorts
          </div>
        )}

        {video.dubbed && !compact && (
          <div style={{
            position: "absolute", bottom: 5, left: 5,
            background: "rgba(0,0,0,0.75)", color: "#fff", borderRadius: 3,
            padding: "1px 6px", fontSize: 11, border: "1px solid rgba(255,255,255,0.35)",
          }}>Auto-dubbed</div>
        )}
      </div>
    </div>
  );
};

// ─── VideoCard — two layouts ──────────────────────────────────────────────────
const VideoCard = ({ video, onPlay, horizontal = false }) => {
  if (horizontal) {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Thumbnail video={video} onClick={() => onPlay(video)} compact />
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div onClick={() => onPlay(video)} style={{
            fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: "#0f0f0f",
            marginBottom: 4, cursor: "pointer",
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {video.title}
          </div>
          <div style={{ fontSize: 12, color: "#606060", display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
            <span>{video.channel}</span>
            {video.verified && <CheckIcon />}
          </div>
          <div style={{ fontSize: 12, color: "#606060" }}>
            {[video.views && `${video.views} views`, video.time].filter(Boolean).join(" · ")}
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0", flexShrink: 0, display: "flex", alignSelf: "flex-start" }}>
          <DotsVIcon />
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Thumbnail video={video} onClick={() => onPlay(video)} />
      <div style={{ display: "flex", gap: 9, marginTop: 9, alignItems: "flex-start" }}>
        <Avatar name={video.channel} size={34} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div onClick={() => onPlay(video)} style={{
            fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: "#0f0f0f",
            marginBottom: 3, cursor: "pointer",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {video.title}
          </div>
          <div style={{ fontSize: 13, color: "#606060", display: "flex", alignItems: "center", gap: 3 }}>
            <span>{video.channel}</span>
            {video.verified && <CheckIcon />}
          </div>
          <div style={{ fontSize: 13, color: "#606060" }}>
            {[video.views && `${video.views} views`, video.time].filter(Boolean).join(" · ")}
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: "50%", flexShrink: 0, display: "flex" }}>
          <DotsVIcon />
        </button>
      </div>
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeNav, setActiveNav] = useState("Home");
  const [search, setSearch] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Suggestions states
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  const width = useWindowWidth();
  const isMobile = width <= 720;
  const isSmall  = width <= 480;

  // Handle typing to filter out suggested queries dynamically
  useEffect(() => {
    if (!search.trim()) {
      setFilteredSuggestions([]);
      return;
    }
    
    // Extracts clean phrases from titles and channel names to compile matching list
    const matches = [];
    videos.forEach(v => {
      const cleanTitle = v.title.split("|")[0].trim();
      if (cleanTitle.toLowerCase().includes(search.toLowerCase()) && !matches.includes(cleanTitle)) {
        matches.push(cleanTitle);
      }
      if (v.channel.toLowerCase().includes(search.toLowerCase()) && !matches.includes(v.channel)) {
        matches.push(v.channel);
      }
    });

    setFilteredSuggestions(matches.slice(0, 6)); // Display max 6 matching suggestions
  }, [search]);

  // Click outside detector to close drop down boxes
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, []);

  const filteredVideos = activeCategory === "All"
    ? videos
    : videos.filter(v =>
        v.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        v.channel.toLowerCase().includes(activeCategory.toLowerCase())
      );

  const searchedVideos = search
    ? filteredVideos.filter(v =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.channel.toLowerCase().includes(search.toLowerCase())
      )
    : filteredVideos;

  // Suggestion list styling block
  const suggestionBoxStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    listStyle: "none",
    margin: "4px 0 0 0",
    padding: "6px 0",
    zIndex: 999,
  };

  const suggestionItemStyle = {
    padding: "10px 18px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ fontFamily: "'Roboto',sans-serif", background: "#fff", color: "#0f0f0f", minHeight: "100vh" }}>

      <VideoModal video={playingVideo} onClose={() => setPlayingVideo(null)} />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff", borderBottom: "1px solid #e5e5e5",
      }}>
        <div style={{
          height: 56, display: "flex", alignItems: "center",
          padding: isMobile ? "0 8px" : "0 16px",
          gap: isMobile ? 4 : 8,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 10, flexShrink: 0 }}>
            <button style={{ background: "none", border: "none", color: "#606060", cursor: "pointer", display: "flex", padding: 6, borderRadius: "50%", minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}>
              <MenuIcon />
            </button>
            {!isSmall && (
              <div style={{ display: "flex", alignItems: "flex-start", cursor: "pointer", gap: 2 }}>
                <svg viewBox="0 0 102 20" width={isMobile ? 82 : 102} height={isMobile ? 17 : 20}>
                  <rect x="0" y="0" width="28" height="20" rx="4" fill="#ff0000"/>
                  <polygon points="11,5 11,15 20,10" fill="white"/>
                  <text x="31" y="15" fontSize="15" fontWeight="900" fill="#0f0f0f" fontFamily="Arial,sans-serif">YouTube</text>
                </svg>
                <span style={{ fontSize: 10, color: "#606060", lineHeight: 1, marginTop: 1 }}>PK</span>
              </div>
            )}
            {isSmall && (
              <svg viewBox="0 0 28 20" width={32} height={22}>
                <rect x="0" y="0" width="28" height="20" rx="4" fill="#ff0000"/>
                <polygon points="11,5 11,15 20,10" fill="white"/>
              </svg>
            )}
          </div>

          {/* DESKTOP SEARCH BAR WITH SUGGESTIONS */}
          {!isMobile && (
            <div ref={searchContainerRef} style={{ flex: 1, maxWidth: 680, margin: "0 auto", display: "flex", gap: 8, position: "relative" }}>
              <div style={{ flex: 1, display: "flex", borderRadius: 40, border: "1px solid #d3d3d3", overflow: "hidden", background: "#fff" }}>
                <input
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search"
                  autoComplete="off"
                  style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#0f0f0f", padding: "8px 20px", fontSize: 16, fontFamily: "inherit" }}
                />
                <button style={{ background: "#f8f8f8", border: "none", borderLeft: "1px solid #d3d3d3", color: "#606060", padding: "0 20px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <SearchIcon />
                </button>
              </div>

              {/* Suggestions Menu Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul style={suggestionBoxStyle}>
                  {filteredSuggestions.map((suggestion, idx) => (
                    <li 
                      key={idx}
                      onClick={() => {
                        setSearch(suggestion);
                        setShowSuggestions(false);
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#f2f2f2"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                      style={suggestionItemStyle}
                    >
                       &nbsp;&nbsp; {suggestion}
                    </li>
                  ))}
                </ul>
              )}

              <button style={{ background: "#f8f8f8", border: "1px solid #d3d3d3", color: "#606060", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <MicIcon />
              </button>
            </div>
          )}

          {isMobile && <div style={{ flex: 1 }} />}

          {/* Right buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 0 : 6, flexShrink: 0 }}>
            {isMobile && (
              <button
                onClick={() => setSearchOpen(o => !o)}
                style={{ background: "none", border: "none", color: "#0f0f0f", cursor: "pointer", display: "flex", padding: 6, borderRadius: "50%", minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}
              >
                <SearchIcon />
              </button>
            )}
            {!isMobile && (
              <button style={{ background: "none", border: "1px solid #d3d3d3", color: "#065fd4", borderRadius: 20, padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
                <PlusIcon /> Create
              </button>
            )}
            {!isMobile && (
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 6 }}>
                <BellIcon />
              </button>
            )}
            {isMobile && (
              <button style={{ background: "none", border: "none", color: "#0f0f0f", cursor: "pointer", display: "flex", padding: 6, minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}>
                <MicIcon />
              </button>
            )}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#cc0000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, cursor: "pointer", userSelect: "none", marginLeft: isMobile ? 2 : 0 }}>
              S
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR WITH SUGGESTIONS */}
        {isMobile && searchOpen && (
          <div ref={searchContainerRef} style={{ padding: "0 10px 10px", display: "flex", gap: 8, position: "relative", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 8, width: "100%" }}>
              <div style={{ flex: 1, display: "flex", borderRadius: 40, border: "1px solid #d3d3d3", overflow: "hidden", background: "#fff" }}>
                <input
                  autoFocus
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search YouTube"
                  autoComplete="off"
                  style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#0f0f0f", padding: "9px 16px", fontSize: 15, fontFamily: "inherit" }}
                />
                {search && (
                  <button onClick={() => { setSearch(""); setFilteredSuggestions([]); }} style={{ background: "none", border: "none", color: "#606060", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <CloseIcon />
                  </button>
                )}
              </div>
              <button
                onClick={() => { setSearchOpen(false); setShowSuggestions(false); }}
                style={{ background: "#f2f2f2", border: "none", borderRadius: 20, padding: "0 14px", fontSize: 14, cursor: "pointer", color: "#0f0f0f", whiteSpace: "nowrap" }}
              >
                Cancel
              </button>
            </div>

            {/* Suggestions list drop for mobile UI */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul style={{ ...suggestionBoxStyle, top: "46px", left: "10px", right: "10px" }}>
                {filteredSuggestions.map((suggestion, idx) => (
                  <li 
                    key={idx}
                    onClick={() => {
                      setSearch(suggestion);
                      setShowSuggestions(false);
                    }}
                    style={suggestionItemStyle}
                  >
                    🔍 &nbsp;&nbsp; {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </header>

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", marginTop: isMobile ? (searchOpen ? 106 : 56) : 56, transition: "margin-top 0.15s" }}>

        {/* Sidebar — desktop only */}
        {!isMobile && (
          <aside style={{
            position: "fixed", top: 56, left: 0, bottom: 0, width: 90,
            background: "#fff", display: "flex", flexDirection: "column",
            alignItems: "center", paddingTop: 12, gap: 2, zIndex: 50,
            borderRight: "1px solid #e5e5e5",
          }}>
            {navItems.map(({ label, Icon }) => (
              <button key={label} onClick={() => setActiveNav(label)} style={{
                background: activeNav === label ? "#f2f2f2" : "none",
                border: "none", color: activeNav === label ? "#0f0f0f" : "#606060",
                cursor: "pointer", width: 76, padding: "10px 4px", borderRadius: 10,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                fontSize: 10, fontWeight: activeNav === label ? 700 : 400,
              }}>
                <Icon />{label}
              </button>
            ))}
          </aside>
        )}

        {/* Main content */}
        <main style={{
          marginLeft: isMobile ? 0 : 90,
          flex: 1,
          padding: isMobile ? "0 0 68px" : "0 24px 40px",
          minWidth: 0,
        }}>
          {/* Category chips */}
          <div style={{
            display: "flex", gap: 8,
            padding: isMobile ? "10px 12px 8px" : "12px 0 10px",
            overflowX: "auto", alignItems: "center",
            scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
            position: "sticky", top: isMobile ? (searchOpen ? 106 : 56) : 56,
            background: "#fff", zIndex: 40,
            borderBottom: "1px solid #e5e5e5", marginBottom: isMobile ? 0 : 4,
          }}
          onScroll={e => e.stopPropagation()}
          >
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? "#0f0f0f" : "#f2f2f2",
                color: activeCategory === cat ? "#fff" : "#0f0f0f",
                border: "none", borderRadius: 8,
                padding: isSmall ? "5px 11px" : "6px 13px",
                fontSize: isSmall ? 12 : 13,
                fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                minHeight: 32,
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Video grid / list */}
          {(() => {
            const normalVideos = searchedVideos.filter(v => !v.isShort);
            const shortVideos = searchedVideos.filter(v => v.isShort);
            const firstHalf = normalVideos.slice(0, 6);
            const secondHalf = normalVideos.slice(6);

            return isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {/* First 6 normal videos */}
                {firstHalf.map(v => (
                  <div key={v.id} style={{ padding: "12px 12px", borderBottom: "1px solid #f2f2f2" }}>
                    <VideoCard video={v} onPlay={setPlayingVideo} horizontal />
                  </div>
                ))}

                {/* Shorts Section — mobile 3x2 grid */}
                {shortVideos.length > 0 && (
                  <div style={{ background: "#f2f2f2", padding: "14px 12px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg viewBox="0 0 24 24" width={22} height={22} fill="#ff0000"><path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 1 0-3.5-6.56l-9 4.81A3.75 3.75 0 0 0 7.27 13.7l1.2.5L7 14.94a3.75 3.75 0 1 0 3.5 6.56l9-4.81a3.75 3.75 0 0 0-1.73-6.37z"/></svg>
                        <span style={{ color: "#0f0f0f", fontSize: 18, fontWeight: 700 }}>Shorts</span>
                      </div>
                      <svg viewBox="0 0 24 24" width={20} height={20} fill="#606060"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {shortVideos.map(v => (
                        <div key={v.id} onClick={() => setPlayingVideo(v)} style={{ cursor: "pointer" }}>
                          <div style={{ width: "100%", paddingBottom: "178%", borderRadius: 10, overflow: "hidden", background: bgColor(v.id), position: "relative" }}>
                            <img
                              src={`https://i.ytimg.com/vi/${v.embedId}/hqdefault.jpg`}
                              alt={v.title}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                              onError={e => { e.target.style.display = "none"; }}
                            />
                            <div style={{ position: "absolute", bottom: 6, left: 6, right: 6, color: "#fff", fontSize: 10, fontWeight: 600, lineHeight: 1.3, textShadow: "0 1px 3px rgba(0,0,0,0.8)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {v.title}
                            </div>
                          </div>
                          <div style={{ color: "#606060", fontSize: 11, marginTop: 4, fontWeight: 500 }}>{v.views} views</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remaining normal videos */}
                {secondHalf.map(v => (
                  <div key={v.id} style={{ padding: "12px 12px", borderBottom: "1px solid #f2f2f2" }}>
                    <VideoCard video={v} onPlay={setPlayingVideo} horizontal />
                  </div>
                ))}

                {normalVideos.length === 0 && shortVideos.length === 0 && (
                  <div style={{ color: "#606060", padding: "40px 16px" }}>No videos found.</div>
                )}
              </div>
            ) : (
              <div>
                {/* First 6 normal videos — desktop grid */}
                {firstHalf.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px 16px", marginTop: 14 }}>
                    {firstHalf.map(v => <VideoCard key={v.id} video={v} onPlay={setPlayingVideo} />)}
                  </div>
                )}

                {/* Shorts Section — desktop */}
                {shortVideos.length > 0 && (
                  <div style={{ background: "#fff", borderRadius: 14, margin: "28px -24px", padding: "18px 24px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <svg viewBox="0 0 24 24" width={26} height={26} fill="#ff0000"><path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 1 0-3.5-6.56l-9 4.81A3.75 3.75 0 0 0 7.27 13.7l1.2.5L7 14.94a3.75 3.75 0 1 0 3.5 6.56l9-4.81a3.75 3.75 0 0 0-1.73-6.37z"/></svg>
                        <span style={{ color: "#0f0f0f", fontSize: 20, fontWeight: 700 }}>Shorts</span>
                      </div>
                      <svg viewBox="0 0 24 24" width={22} height={22} fill="#606060"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </div>
                    <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
                      {shortVideos.map(v => (
                        <div key={v.id} onClick={() => setPlayingVideo(v)} style={{ flexShrink: 0, width: 168, cursor: "pointer" }}>
                          <div style={{ width: 168, height: 300, borderRadius: 12, overflow: "hidden", background: bgColor(v.id), position: "relative" }}>
                            <img
                              src={`https://i.ytimg.com/vi/${v.embedId}/hqdefault.jpg`}
                              alt={v.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={e => { e.target.style.display = "none"; }}
                            />
                            <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, color: "#fff", fontSize: 12, fontWeight: 600, lineHeight: 1.35, textShadow: "0 1px 4px rgba(0,0,0,0.9)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {v.title}
                            </div>
                          </div>
                          <div style={{ color: "#606060", fontSize: 13, marginTop: 7, fontWeight: 500 }}>{v.views} views</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remaining normal videos — desktop grid */}
                {secondHalf.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px 16px", marginTop: 14 }}>
                    {secondHalf.map(v => <VideoCard key={v.id} video={v} onPlay={setPlayingVideo} />)}
                  </div>
                )}

                {normalVideos.length === 0 && shortVideos.length === 0 && (
                  <div style={{ color: "#606060", padding: "40px 0" }}>No videos found.</div>
                )}
              </div>
            );
          })()}
        </main>
      </div>

      {/* ── BOTTOM NAV — mobile only ───────────────────────────────────── */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "#fff", borderTop: "1px solid #e5e5e5",
          zIndex: 100, height: 56,
          display: "flex", justifyContent: "space-around", alignItems: "center",
        }}>
          {navItems.map(({ label, short, Icon }) => (
            <button key={label} onClick={() => setActiveNav(label)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              fontSize: isSmall ? 9 : 10,
              color: activeNav === label ? "#0f0f0f" : "#606060",
              fontWeight: activeNav === label ? 700 : 400,
              padding: "6px 8px",
              flex: 1, minHeight: 44, justifyContent: "center",
            }}>
              <Icon />{short}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}