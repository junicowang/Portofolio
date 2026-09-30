/* ============================================================
   Competitions & Awards.
   Edit this file only. Structure & design stay the same.
   result: "Participant" / "Finalist" / "2nd Place" / etc.
   cert : local path to the certificate image (assets/certs/*.jpg|png).
          When set, the card becomes clickable to open a preview.
   url  : (optional) external credential link.
   Set the array to [] to hide the whole list.
   ============================================================ */
window.DATA = window.DATA || {};

DATA.competitions = [
  {
    name: "Compfest Data Analytics Dash",
    organizer: "Compfest",
    year: "Aug 2026",
    result: "Participant",
    cert: "",
    url: ""
  },
  {
    name: "ASA DataFest",
    organizer: "BINUS University (Team Bismillah)",
    year: "May 2026",
    result: "Participant",
    cert: "assets/certs/asa-datafest-2026.png",
    url: ""
  },
  {
    name: "Mathematical Challenge Festival ITB 2026 (Data Science Competition)",
    organizer: "Bandung Institute of Technology (ITB)",
    year: "Feb 2026",
    result: "Participant",
    cert: "assets/certs/mcf-itb-2026.png",
    url: ""
  },
  {
    name: "SPARC National Competition (Data Science)",
    organizer: "Ciputra University (Team TrioTunggal)",
    year: "Feb 2026",
    result: "Participant",
    cert: "assets/certs/sparc-2026.jpg",
    url: ""
  }
];
