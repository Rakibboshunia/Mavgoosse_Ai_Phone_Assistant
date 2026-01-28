export const adaptCall = (call) => {
  const start = call.started_at ? new Date(call.started_at) : null;

  const statusMap = {
    AI_RESOLVED: "AI Resolved",
    WARM_TRANSFER: "Warm Transfer",
    DROPPED: "Dropped",
    APPOINTMENT: "Appointment",
  };

  return {

    id: call.id,

    phoneNumber: call.phone_number || "-", 

    date: start ? start.toLocaleDateString() : "-",
    time: start
      ? start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",

    duration: call.duration || "-",

    callType: call.call_type,
    status: statusMap[call.call_type] || call.call_type || "-",

    outcomeRaw: call.outcome,
    outcome: call.outcome
      ? call.outcome.replaceAll("_", " ")
      : "-",

    issueId: call.issue,
    issueType: call.issue_name || "Unknown",

    // Audio
    audioUrl: call.audio_url || null,

    // Transcripts (backend aligned)
    transcripts: Array.isArray(call.transcripts)
      ? call.transcripts.map((t) => ({
          speaker: t.speaker,
          message: t.message,
          timestamp: t.timestamp,
        }))
      : [],

    // Meta (future use)
    startedAt: call.started_at,
    endedAt: call.ended_at,
    createdAt: call.created_at,
  };
};
