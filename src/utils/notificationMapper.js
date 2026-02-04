export const mapNotification = (n) => ({
  id: n.id,
  title: n.title,
  description: n.message,
  unread: !n.is_read,
  category: n.category.toLowerCase(), // CALLS → calls
  time: formatTimeAgo(n.created_at),
});
