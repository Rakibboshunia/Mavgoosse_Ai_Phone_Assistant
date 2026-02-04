export const formatTimeAgo = (dateString) => {
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
  return `${Math.floor(diff / 86400)} day ago`;
};
